class JobProfilesController < ApplicationController
  filter_access_to :all
  layout "main"
  # GET /job_profiles
  # GET /job_profiles.xml
  def index
    if current_user.user_type == "admin"
      @job_profiles = JobProfile.find(:all)
    elsif current_user.user_type == "recruiter"
      @job_profiles = JobProfile.find(:all,:conditions => ["user_id = ? or user_id = ?", current_user.id, current_user.parent_id],:order =>"created_at DESC")
    end
    
#    unless @job_profiles.blank?
#      @interviews_list = Interview.find(:all, :conditions => ["job_profile_id = ?", @job_profiles.first.id],:order =>"created_at DESC")
#    end
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @job_profiles }
    end
  end

  # GET /job_profiles/1
  # GET /job_profiles/1.xml
  def show
    @job_profile = JobProfile.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @job_profile }
    end
  end

  # GET /job_profiles/new
  # GET /job_profiles/new.xml
  def new
    @job_profile = JobProfile.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @job_profile }
    end
  end

  # GET /job_profiles/1/edit
  def edit
    @job_profile = JobProfile.find(params[:jid])
    render :layout=>false
  end

  # POST /job_profiles
  # POST /job_profiles.xml
  def create
    @job_profile = JobProfile.new(params[:job_profile])
    @job_profile.user_id = current_user.id
    
    if @job_profile.save
      @location = Location.new(params[:location])
      @location.job_profile_id = @job_profile.id
      @location.user_id = current_user.id
      @location.save
      @interview = Interview.new
      @interview.user_id = current_user.id
      @interview.job_profile_id = @job_profile.id
      @interview.name =@job_profile.title
      @interview.save
      @flag = "true"
      return if request.xhr?
      render :nothing => true
    else
      @flag = "false"
      return if request.xhr?
      render :nothing => true
    end
    
  end

  # PUT /job_profiles/1
  # PUT /job_profiles/1.xml
  def update
    @job_profile = JobProfile.find(params[:id])
    @job_profile.user_id = current_user.id
    interviews = Interview.find(:first,:conditions=>["interviews.job_profile_id = ?",params[:id]])
    interviews.name = params[:job_profile][:title]
    interviews.save
    #@location.user_id = current_user.id
    respond_to do |format|
      if @job_profile.update_attributes(params[:job_profile])
        @job_profile.location.update_attributes(params[:location])
        format.html { redirect_to(@job_profile, :notice => 'JobProfile was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @job_profile.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /job_profiles/1
  # DELETE /job_profiles/1.xml
  def delete
    @job_profile = JobProfile.find(params[:id])
    #@interviews_list = Interview.find(:all, :conditions => ["job_profile_id = ?",params[:id]])
    #@job_profile.interview.destroy
    interview = Interview.find_by_job_profile_id @job_profile.id
    interview.destroy
    @job_profile.destroy
    #return if request.xhr?
   # render nothing => true

    #    respond_to do |format|
    #      format.html { redirect_to(job_profiles_url) }
    #      format.xml  { head :ok }
    #    end
  end

  def get_job_details
    session[:interview_id] = params[:int_id]
    @job_profiles = JobProfile.find(params[:id])
    @interview = Invitation.find_by_interview_id_and_candidate_email params[:int_id],current_user.email

    @date = Time.new.day - @interview.created_at.day
    
    unless @job_profiles.blank?
      render :partial => "job_details"
    else
      render :text => "No records found"
    end
  end

  def refresh_job
    @job_profile = JobProfile.find(params[:jid])
    render :partial => "refresh_job", :locals => { :job_profile => @job_profile }
  end
end
