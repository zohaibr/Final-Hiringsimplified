class UsersController < ApplicationController
  require 'chargify_api_ares'
   require 'digest/sha1'
  skip_before_filter :login_required
  layout "main"
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  

  # render new.rhtml
  def new

    if params[:c_id]
      @users = User.find(:first, :conditions => ["email = ?", params[:c_id]])
      unless @users.blank?
        redirect_to :controller => "sessions", :action => "new", :frm => "inv", :login => @users.login
      else
        @user = User.new
      end
    else
      @user = User.new
    end
  end
 
  def create
    #login_keeping_session!
    @user = User.new(params[:user])
    @user.login = params[:user][:email]
    @user.plain_password = params[:user][:password]
    
    success = @user && @user.save

    if success && @user.errors.empty?

      # Protects against session fixation attacks, causes request forgery
      # protection if visitor resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset session
      
      if params[:user][:user_type] == "candidate"
        roles(@user.user_type,@user.id)
        self.current_user = @user # !! now logged in
        session[:c_id] = params[:user][:email]
        redirect_back_or_default("/candidates/new?uid=#{@user.id}")
      elsif params[:coming_from] == "child"
        roles(@user.user_type,@user.id)

        gr = 'Self'
        if params[:admin]
          gr = 'Admin'
        end
        group(@user.parent_id,@user.id,gr)
        @notification = Notifier.deliver_share(@user)
        redirect_back_or_default('/users/profile')
      else
        self.current_user = @user # !! now logged in
        roles(@user.user_type,@user.id)
        @notification = Notifier.deliver_confirmation_email(@user)
        pckg = Package.find_by_package_type("free")
        user_package = UserPackage.new
        user_package.user_id =@user.id
        user_package.package_id =0
        user_package.time_left =1
        user_package.save
        redirect_back_or_default('/dashboards')
      end

      flash[:notice] = "<span style='color:green;'>Thanks for signing up!</span>"
    else
      flash[:error]  = "We couldn't set up that account, sorry.  Please try again, or contact an admin (link is above)."
      if params[:user][:user_type] == "candidate"
        render :action => 'new', :c_id => params[:user][:email]
      else
        render :action => 'new'
      end
    end
  end
  ## Temp Account Area
  def add
    @user = User.new
    @host_port = "#{request.host_with_port}"
    #@cid = params[:cid]
    #@candidates = Invitation.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status
    #                           FROM candidates,invitations LEFT JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{params[:id]} and candidates.user_id = users.id and invitations.status =1 group by c_id")
    @interview_id = params[:id]
    render :layout=>false
  end

  def create_temp_account
    #logout_keeping_session!
    @user = User.new(params[:user])
    @user.login = params[:user][:email]
    @user.plain_password = params[:user][:password]
    success = @user && @user.save
    @interview_id = params[:interview_id]
    @cid = params[:cid]
    @url = params[:link][:url]

    @user = User.find(:first, :conditions => ["user_type = 'guest'"])

    unless @user.blank?
      
      @notification = Notifier.deliver_share(@user,@url)

      
      # Protects against session fixation attacks, causes request forgery
      # protection if visitor resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset session
      #self.current_user = @user # !! now logged in

     
      render :nothing => true

      flash[:share] = "<span style='color:green;'>Account created and email sent!</span>"
    else
      flash[:error]  = "We couldn't set up that account, sorry.  Please try again, or contact an admin (link is above)."
      render :nothing => true
    end
  end

  def static_page
    @name = params[:name]

    if @name =="team"
      render :action => 'team'
    elsif @name =="product"
      render :action => 'product'
    elsif @name =="price"
      render :action => 'price'
    elsif @name =="contact"
      render :action => 'contact'
    elsif @name =="terms"
      render :action => 'terms'
    elsif @name =="privacy"
      render :action => 'privacy'
    else
      redirect_back_or_default('/sessions/new')
    end
    
  end

  def send_upload
    @account = Service.new()
    @account.debug = true
    @account.authenticate("info@hiringsimplified.com", "difficult")
    if params[:doc_id]
      doc = BaseObject.find(@account, {:id => params[:doc_id]})
      doc.content = params[:upload_file].read
      doc.content_type = File.extname(params[:upload_file].original_filename).gsub(".", "")
      if doc.save
        flash[:notice] = 'File successfully uploaded'
      else
        flash[:warning] = 'Could not upload file!'
      end
      redirect_to :action => :view, :doc_id => doc.id and return
    else
      file = BaseObject.new(@account)
      file.title = params[:upload_file].original_filename.gsub(/\.\w.*/, "")
      file.content = params[:upload_file].read
      file.content_type = File.extname(params[:upload_file].original_filename).gsub(".", "")
      if file.save
        flash[:notice] = 'File successfully uploaded'
      else
        flash[:warning] = 'Could not upload file!'
      end
      render :text => "File successfully uploaded"
      #redirect_to :action => :index and return
    end
  end

  def edit
    @user = User.find(session[:user_id])
    if @user.user_type == "candidate"
      @candidate = Candidate.find_by_user_id(session[:user_id])
    end
    render :layout=>false
  end

  def update
    @user = User.find(params[:user][:id])
    @user.update_attributes(params[:user])

    redirect_back_or_default('/users/profile')
  end

  def profile
    @user = User.find(session[:user_id])
    if @user.user_type == "candidate"
      @candidate = Candidate.find_by_user_id(session[:user_id])
    end
  end

  def show_packages
    @selected_package = UserPackage.find(:first, :conditions => ["user_id = ?", session[:user_id]])
    @all_packages = Package.find(:all)
  end

  def roles(user_type,user_id)
    @role = Role.new
    @role.title = user_type
    @role.user_id = user_id
    @role.save
  end

  def group(parent_id,child_id,status)
    if status == "Admin"
      @group = Group.new
      @group.parent_id = parent_id
      @group.child_id = child_id
      @group.active = 1
      @group.save
    elsif status == "Self"
      @group = Group.new
      @group.parent_id = parent_id
      @group.child_id = child_id
      @group.active = 0
      @group.save
      @user = User.find(child_id)
      @user.update_attribute(:parent_id, 0)
    end    
  end

  def add_subscription
    
    Chargify.configure do |c|
      c.subdomain = 'hiringsimplified'
      c.api_key = 'qG0XUKoBhtVsqrQ17tFr'
    end

    @msg = ""

    user_id = params[:customer_reference]
    product_id = params[:product_id]

    @customer = Chargify::Customer.find(params[:customer_id])

    @pckg = Chargify::Subscription.find_by_customer_reference(current_user.id)

    unless @pckg.blank?
        if @customer.reference == user_id
         # package = Package.find(product_id)
          usr_pckg = UserPackage.find_by_user_id user_id
          if usr_pckg.package_id == 0

            usr_pckg.package_id = product_id
            usr_pckg.time_left = usr_pckg.time_left + @pckg.product.accounting_code.to_f
            usr_pckg.next_assessment_at = @pckg.next_assessment_at.strftime("%m/%d/%Y").to_s
            usr_pckg.save
            @msg = "you successfully subscribed to the package."
          else
            @msg = "there was some error while processing your transaction."
          end
        else
          @msg = "there was some error while processing your transaction."
        end
    else
      @msg = "there was some error while processing your transaction."
    end
  #  redirect_back_or_default('/dashboards')
  end

  def new_recruiter

  end


  def view_packages

    Chargify.configure do |c|
      c.subdomain = 'hiringsimplified'
      c.api_key = 'qG0XUKoBhtVsqrQ17tFr'
    end



    #@pckgx = Chargify::Subscription.find(400194)
    #@sub = Chargify::Subscription.find_by_customer_reference(current_user.id)

    @usr_pckg = UserPackage.find_by_user_id current_user.id
    if @usr_pckg.package_id!=0
      @pckg = Chargify::Subscription.find_by_customer_reference(current_user.id)

      unless @pckg.blank?
        @mg = "update_payment--#{@pckg.id}--IEJgyjS-Umgs2GBiVJsb"
        @msg = Digest::SHA1.hexdigest("update_payment--#{@pckg.id}--IEJgyjS-Umgs2GBiVJsb")
        @products = Chargify::Product.find(:all)
      end
      
     #@date = ((@pckg.current_period_ends_at.to_time(:utc) - Time.new(:utc)) / (24*60*60)).to_i
    end
    render :layout=>false

  end

  def view_time
    uid = 0
    unless current_user.parent_id.blank?
      uid = current_user.parent_id
    else
      uid = current_user.id
    end
    pckg = UserPackage.find(:first, :conditions => ["user_id = ?", uid])
    @time_left = pckg.time_left
    render :layout=>false
  end

  def change_subscription
    id = params[:id]
    
    Chargify.configure do |c|
      c.subdomain = 'hiringsimplified'
      c.api_key = 'qG0XUKoBhtVsqrQ17tFr'
    end

    @pckg = Chargify::Subscription.find_by_customer_reference(current_user.id)

    pg = UserPackage.find(:first, :conditions => ["user_id = ? OR user_id = ?",current_user.id,current_user.parent_id ])

    pg.time_left = 0
    pg.save
    @pckg.product_id = id
    @pckg.save
    @pckg.reload
    render :nothing =>true

  end

  def cancel_subscription
     Chargify.configure do |c|
      c.subdomain = 'hiringsimplified'
      c.api_key = 'qG0XUKoBhtVsqrQ17tFr'
    end

    @pckg = Chargify::Subscription.find_by_customer_reference(current_user.id)
    @pckg.cancel
    render :nothing =>true
  end

  def reactivate_subscription
     Chargify.configure do |c|
      c.subdomain = 'hiringsimplified'
      c.api_key = 'qG0XUKoBhtVsqrQ17tFr'
    end
    @pckg = Chargify::Subscription.find_by_customer_reference(current_user.id)
    @pckg.reactivate
    render :nothing =>true
  end

  def trigger_subscription
    subscription_ids = params['_json']
     Chargify.configure do |c|
      c.subdomain = 'hiringsimplified'
      c.api_key = 'qG0XUKoBhtVsqrQ17tFr'
    end
     # id = 401974
    subscription_ids.each do |id|
        # Process updated subscriptions here
        #Rails.logger.debug("SUB ID: #{id}")
        pckg = Chargify::Subscription.find(id)
       # Rails.logger.debug("SUB ID: #{pckg}")
       usr_pckg = UserPackage.find_by_user_id pckg.customer.reference

        user = User.find(pckg.customer.reference)

        if pckg.state != 'active'
          Notifier.deliver_trigger_subscription(user.email,'Your subscription has been canceled')

        end

      if pckg.product.id < usr_pckg.package_id
          product = Chargify::Product.find(usr_pckg.package_id)
#          @new_time =   ((product.accounting_code.to_f - usr_pckg.time_left) - pckg.product.accounting_code.to_f).abs
#
#          @new_pckg =pckg.product.accounting_code.to_f
#          @cons = usr_pckg.time_left
          usr_pckg.time_left = pckg.product.accounting_code.to_f

#          usr_pckg.time_left = @new_time
          usr_pckg.package_id = pckg.product.id
          usr_pckg.save
        Notifier.deliver_trigger_subscription(user.email,'Your subscription has downgraded')
        elsif pckg.product.id > usr_pckg.package_id
          usr_pckg.time_left = pckg.product.accounting_code.to_f
          usr_pckg.package_id = pckg.product.id
          usr_pckg.save
          Notifier.deliver_trigger_subscription(user.email,'Your subscription has been upgraded')
        else
          if pckg.state == 'active' and pckg.product.id == usr_pckg.package_id
            if usr_pckg.next_assessment_at != @pckg.product.next_assessment_at.strftime("%m/%d/%Y")
              usr_pckg.time_left = pckg.product.accounting_code.to_f
              usr_pckg.next_assessment_at = @pckg.product.next_assessment_at.strftime("%m/%d/%Y")
              usr_pckg.save
            end
          end
        end

        @x = pckg
        

      end
  end
end

