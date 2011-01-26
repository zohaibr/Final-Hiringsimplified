class SettingsController < ApplicationController
  filter_access_to :all
  layout "main"
  def index
    @recruiters = Group.find_all_by_parent_id current_user.id
    render :layout=>false
  end

  def update_status
    @recruiter = Group.find(params[:id])
    if @recruiter.update_attribute(:active,params[:status])
      @user = User.find(params[:uid])
      if @recruiter.active
        @user.update_attribute(:parent_id, current_user.id)
      else
        @user.update_attribute(:parent_id, 0)
      end
      return if request.xhr?
      render :nothing => true
    else
      return if request.xhr?
      render :nothing => true
    end
  end

  def delete
    @user = User.find(params[:id])
    @group = Group.find(params[:mid])
    @role = Role.find_by_user_id(params[:id])
    @user.destroy && @group.destroy && @role.destroy
    return if request.xhr?
    render :nothing => true
  end
end
