class PasswordsController < ApplicationController
  layout "main"
  before_filter :login_from_cookie
  before_filter :login_required, :except => [:new, :create]
  

  # Don't write passwords as plain text to the log files
  filter_parameter_logging :old_password, :password, :password_confirmation

  # GETs should be safe
  verify :method => :post, :only => [:create], :redirect_to => { :controller => :site }
  verify :method => :put, :only => [:update], :redirect_to => { :controller => :site }

  # POST /passwords
  # Forgot password
  
  def create
    flash[:al] =""
    respond_to do |format|

      if user = User.find_by_email_and_login(params[:password][:email], params[:password][:email])
        @new_password = create_code
        user.password = user.password_confirmation = @new_password
        user.save_without_validation
        Notifier.deliver_new_password(user, @new_password)

       
          flash[:al] = "We sent a new password to #{params[:password][:email]}"
          format.html { render :action => "new",:controller=>"passwords" }
        
      else
        flash[:al] =  "We can't find that account.  Try again."
        format.html { render :action => "new" }
      end
    end
  end

  # GET /users/1/password/edit
  # Changing password
  def edit
    @user = current_user
    render :layout=>false
  end

  # PUT /users/1/password
  # Changing password
  def update
    @user = current_user

    old_password = params[:old_password]

    @user.attributes = params[:user]

    respond_to do |format|
      if @user.authenticated?(old_password) && @user.save
        format.html { redirect_to :controller => "dashboards", :action => "index" }
      else
        format.html { render :action => 'edit' }
      end
    end
  end

  protected

  def random_password( len = 8 )
    chars = (("a".."z").to_a + ("1".."9").to_a )- %w(i o 0 1 l 0)
    newpass = Array.new(len, '').collect{chars[rand(chars.size)]}.join
  end

  def create_code
    chars = ("A".."Z").to_a
    code = ""
    if code != "Duplicate"
      1.upto(VERIFICATION_CODE_LENGTH) do |i|
        code << chars[rand(chars.size-1)]
        if i % 4 == 0 && i < VERIFICATION_CODE_LENGTH
          code << "-"
        end
      end
    end
    return code
  end

end
