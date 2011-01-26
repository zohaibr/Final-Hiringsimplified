# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.
require 'gdocs4ruby'
class ApplicationController < ActionController::Base
  include GDocs4Ruby
  include AuthenticatedSystem
  before_filter :login_required
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details
  before_filter :set_current_user

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  protected

  def permission_denied
    flash[:error] = "Sorry, you are not allowed to access that page."
    redirect_to root_url
  end

  def set_current_user
    Authorization.current_user = current_user
  end

end
