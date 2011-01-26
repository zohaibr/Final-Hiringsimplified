class UsersController < ApplicationController
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
        group(@user.parent_id,@user.id,params[:group][:active])
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
    user_id = params[:customer_reference]
    product_id = params[:product_id]

    package = Package.find(product_id)
    usr_pckg = UserPackage.find_by_user_id user_id
    usr_pckg.package_id = product_id
    usr_pckg.time_left = usr_pckg.time_left + package.hours
    usr_pckg.save

    redirect_back_or_default('/dashboards')
  end

  def new_recruiter

  end


  def view_packages
    @usr_pckg = UserPackage.find_by_user_id current_user.id
    if @usr_pckg.package_id!=0
      @pckg = Package.find(@usr_pckg.package_id)
    end
    render :layout=>false

  end

  def view_time
    pckg = UserPackage.find(:first, :conditions => ["user_id = ? OR user_id = ?", current_user.id, current_user.parent_id])
    @time_left = pckg.time_left
    render :layout=>false
  end
end

