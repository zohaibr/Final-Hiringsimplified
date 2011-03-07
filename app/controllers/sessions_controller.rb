# This controller handles the login/logout function of the site.  
class SessionsController < ApplicationController
 
 # require 'chargify_api_ares'
  layout "main"
    
  skip_before_filter :login_required,:candidate_demo,:rate_interview,:check_code
  
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem


   def rate_interview
  end


   def roles(user_type,user_id)
    @role = Role.new
    @role.title = user_type
    @role.user_id = user_id
    @role.save
  end



def check_code

  code = params[:code]

  rate_interview = RateInterview.find_by_code code

  unless rate_interview.blank?
    if rate_interview.done !=true
      @user = User.find rate_interview.user_id
      user = User.authenticate(@user.login, @user.plain_password)
      self.current_user = user
      new_cookie_flag = (params[:remember_me] == "1")
      handle_remember_cookie! new_cookie_flag
      session[:for_here] = 'to rate'
      session[:code] = code
      redirect_to("/interviews/recruite/#{rate_interview.interview_id}?cid=")
    else

      redirect_back_or_default("/sessions/rate_interview/?atempt=fail")
    end
  else
    redirect_to("/sessions/rate_interview/?atempt=fail")
  end

end

  # render new.erb.html
  def new
    

    

 #   @customer = Chargify::Customer.find(:all)

#    Package.destroy_all()
#    pckg = Package.new(:id=>0,:hours=>1,:package_type=>'free',:price=>0)
#    pckg.save
#
#    pckg = Package.new(:id=>19289,:hours=>2.5,:package_type=>'tier 1',:price=>19.99)
#    pckg.save
#
#    pckg = Package.new(:id=>19290,:hours=>5,:package_type=>'tier 2',:price=>34.99)
#    pckg.save
#
#    pckg = Package.new(:id=>19291,:hours=>10,:package_type=>'tier 3',:price=>59.99)
#    pckg.save
#
#    pckg = Package.new(:id=>19292,:hours=>20,:package_type=>'tier 4',:price=>99.99)
#    pckg.save
#
#    pckg = Package.new(:id=>19293,:hours=>50,:package_type=>'tier 5',:price=>249.99)
#    pckg.save


    usr = User.find_by_email 'zohaib.rahman@hiringsimplified.com'
    usr.destroy

    



    

    if params[:frm] == "inv"
      redirect_back_or_default('/direct_login')
    else
      render :action => "new"
    end
    @name = "home"
  end

  def create
    logout_keeping_session!
    user = User.authenticate(params[:login], params[:password])
    if user
      session[:for_here] = ''
      # Protects against session fixation attacks, causes request forgery
      # protection if user resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset_session
      self.current_user = user
      new_cookie_flag = (params[:remember_me] == "1")
      handle_remember_cookie! new_cookie_flag
      if user.user_type == "candidate"
        @user_id = Candidate.find_by_user_id user.id
        if @user_id.blank?
          redirect_back_or_default("/candidates/new?uid=#{user.id}")
        else
          redirect_back_or_default("/interviews/interviews_list?c_id=#{params[:login]}")
        end
      else
        redirect_back_or_default('/dashboards')
      end
      flash[:notice] = "Logged in successfully"
    else
      redirect_back_or_default("/direct_login/?atempt=fail")
      note_failed_signin
      @login       = params[:login]
      @remember_me = params[:remember_me]
      #render :action => 'new'
    end
  end

  def destroy
    logout_killing_session!
    flash[:notice] = "You have been logged out."
    redirect_back_or_default('/')
  end

  def direct_login
    render :action => "direct_login"
  end

  protected
  # Track failed login attempts
  def note_failed_signin
    flash[:error] = "Couldn't log you in as '#{params[:login]}'"
    logger.warn "Failed login for '#{params[:login]}' from #{request.remote_ip} at #{Time.now.utc}"
  end

  def candidate_demo
    
      render :nothing => true
  end

 

end
