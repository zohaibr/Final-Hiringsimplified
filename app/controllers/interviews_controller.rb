class InterviewsController < ApplicationController
  skip_before_filter :rate_interview,:recruite
  filter_access_to :all
  layout "main"
  
  
  # GET /interviews
  # GET /interviews.xml
  def index
    @interviews = Interview.all


    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @interviews }
    end
  end

  def get_interviews
    @interviews_list = Interview.find(:all, :conditions => ["job_profile_id = ?",params[:id]],:order =>"created_at DESC")
    render :partial => "job_profiles/interview_list" ,:locals => { :interviews_list => @interviews_list}
  end

  def publish_interview
     @interview = Interview.find(params[:id])
     @interview.update_attribute(:published,true)
     render :nothing => true
  end

  # GET /interviews/1
  # GET /interviews/1.xml
  def show
    @interview = Interview.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @interview }
    end
  end

  # GET /interviews/new
  # GET /interviews/new.xml
  def new
    @interview = Interview.new

    render :layout=>false
  end

  # GET /interviews/1/edit
  def edit
    @interview = Interview.find(params[:id])
    render :layout=>false
  end

  # POST /interviews
  # POST /interviews.xml
  def create
    @interview = Interview.new(params[:interview])
    @interview.user_id = current_user.id
    if @interview.save
      @flag = "true"
      return if request.xhr?
      render :nothing => true
    else
      @flag = "false"
      return if request.xhr?
      render :nothing => true
    end
    #    respond_to do |format|
    #      if @interview.save
    #        format.html { redirect_to(@interview, :notice => 'Interview was successfully created.') }
    #        format.xml  { render :xml => @interview, :status => :created, :location => @interview }
    #      else
    #        format.html { render :action => "new" }
    #        format.xml  { render :xml => @interview.errors, :status => :unprocessable_entity }
    #      end
    #    end
  end

  # PUT /interviews/1
  # PUT /interviews/1.xml
  def update
    @interview = Interview.find(params[:id])
    @interview.user_id = current_user.id
    respond_to do |format|
      if @interview.update_attributes(params[:interview])
        format.html { redirect_to(@interview, :notice => 'Interview was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @interview.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /interviews/1
  # DELETE /interviews/1.xml
  def delete
    @interview = Interview.find(params[:id])
    @interview.destroy
    return if request.xhr?
    render :nothing => true
  end

  # When User first time comes after invitation
  def interviews_list
    
      @candidate_email = current_user.email
    
      @candidate_email = current_user.email
    
      @invitations = Invitation.find(:all, :group => "invitations.interview_id,invitations.id,invitations.candidate_email,invitations.user_id,invitations.created_at,invitations.updated_at,invitations.status", :conditions => ["candidate_email = ?", @candidate_email])
    #session[:c_id] = nil
  end

  #Recruiters Interviews List
  def my_interviews
    @my_interviews = Interview.find(:all, :conditions => "user_id = #{current_user.id}")

  end

  def webcam
    render :partial => "cam" ,:locals => { :id => params[:id]}
  end

  def save_file

    #name = params[:name]
    data = request.raw_post
   # @file_content = File.open("#{RAILS_ROOT}/Public/user_data/#{name}.jpg", "wb") { |f|
#f.write(data) }

    require 'aws/s3'
   # include AWS::S3
    


    AWS::S3::Base.establish_connection!( :access_key_id => 'AKIAJLGQKT6XHTJLWOBA', :secret_access_key => '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')


    AWS::S3::S3Object.store("#{params[:name]}.jpg", data, "hiringsi/user_data", :access=>:public_read)
    #S3Object.store("#{params[:name]}.jpg", data, "hiringsi")

render :nothing => true
  end

  def recruite

    @default_candidate = params[:cid]
    #@candidates = Invitation.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status
    #                           FROM candidates,invitations LEFT JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{params[:id]} and candidates.user_id = users.id and invitations.status =1 group by c_id")
    @candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{params[:id]} and candidates.user_id = users.id and invitations.status = true", :group => "invitations.candidate_email ,invitations.interview_id ,candidates.first_name,candidates.last_name ,invitations.status,c_id")
    @questionare_list = Questionare.find(:all, :conditions => ["interview_id = ?",params[:id]])

    
    
    @interview_id = params[:id]
    session[:int_id] = @interview_id

    @thumb_id = @questionare_list.first.id
    if params[:cid] ==""
      @default_candidate_id = @candidates.first.c_id
      session[:default_candidate] = @candidates.first.c_id
    else
      @default_candidate_id = params[:cid]
      session[:default_candidate] = params[:cid]
    end


   # @ratings = Rating.find_all_by_interview_id_and_user_id_and_candidate_id @interview_id, current_user.id,@default_candidate_id

    #if @ratings.blank?
      #@ratings = Rating.find_all_by_interview_id_and_user_id 0, 0
    #end
    
    @avg_rating = Rating.average :stars, :conditions => ["interview_id = ? AND candidate_id = ?", params[:id],session[:default_candidate]]
    @comment = Comment.find(:first, :conditions => ["interview_id = ? AND candidate_id = ? AND user_id = ?",params[:id],@default_candidate_id,current_user.id])

    if @comment.blank?
      @comment = Comment.new
      @comment.candidate_id = @default_candidate_id
      @comment.interview_id = @interview_id
      @comment.user_id = current_user.id
      @comment.save

    end


    @comments = Comment.find_all_by_interview_id_and_candidate_id params[:id], @default_candidate_id
    @default_question = @questionare_list.first.question

  end

  def get_answers_list
    @questionare_list = Questionare.find(:all, :conditions => ["interview_id = ?",params[:id]])
    render :partial => "interviews/answers_list" , :locals => { :cid => params[:cid], :questionare_list=>@questionare_list}
    session[:int_id] = params[:id]

  end

  def get_compare_list

    @candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{session[:int_id]} and candidates.user_id = users.id and invitations.status = true", :group => "invitations.candidate_email ,invitations.interview_id ,candidates.first_name,candidates.last_name ,invitations.status,c_id")
    #@candidates = Invitation.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status
    #                           FROM candidates,invitations LEFT JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{session[:int_id]} and candidates.user_id = users.id and invitations.status =1 group by c_id")
    @qid = params[:qid]
    
    render :partial => "interviews/compare" , :locals => { :candidates => @candidates, :qid =>@qid }

  end

  def update_avg
    @avg_rating = Rating.average :stars, :conditions => ["interview_id = ? AND candidate_id = ?", session[:int_id],session[:default_candidate]]

    render :text => @avg_rating
  end

  def pre_interview

    #@interviews = Interview.find(:all,:conditions => ["user_id = ? or user_id = ?", current_user.id, current_user.parent_id],:order =>"created_at DESC")

    @job_profiles = JobProfile.find(:all,:conditions => ["user_id = ? OR user_id = ?", current_user.id, current_user.parent_id],:order =>"created_at DESC")
    #@job_profiles = JobProfile.find(:all,:conditions => ["user_id = ?", current_user.id],:order =>"created_at DESC")
    
    unless @job_profiles.blank?
        @interviews = Interview.find(:all,:conditions => ["id= ?",@job_profiles.first.id ],:order =>"created_at DESC")
      end
      
    unless @interviews.blank?
      @invites = Invitation.find(:all,:conditions => ["interview_id = ?",@interviews.first.id],:order =>"created_at DESC")
      #@candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{@interviews.first.id} and candidates.user_id = users.id", :group => "invitations.candidate_email ,invitations.interview_id,candidates.first_name,candidates.last_name ,invitations.status,c_id")
      #@candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{@interviews.first.id}",:group => "c_id")
      #@candidates = Invitation.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status
      #                         FROM candidates,invitations LEFT JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{@interviews.first.id} and candidates.user_id = users.id group by c_id")
      
#      @candidates = Can.find(:all, :conditions => ["job_profile_id = ?", @job_profiles.first.id],:order =>"created_at DESC")
    end
    #int = Interview.find_by_job_profile_id @job_profiles.first.id
    #@invites = Invitation.find(:all,:conditions => ["interview_id = ? and status != true ",int.id],:order =>"created_at DESC" ,:limit=>"5")

  end

  def get_pre_interviews

    @interviews = Interview.find(:all, :conditions => ["job_profile_id = ?", params[:id]],:order =>"created_at DESC")
    render :partial => "interviews/pre_interviews" , :locals => { :interviews => @interviews }

  end

  def record_test
    session[:interview_id] = params[:int_id]
  end

  def invite
    @user = User.new
    render :layout=>false
  end

  def share
    @interview_id = session[:int_id]
    @usr = User.find_by_email params[:user][:email]

    chars = (("a".."z").to_a + ("1".."9").to_a )- %w(i o 0 1 l 0)
    promo_code = Array.new(8, '').collect{chars[rand(chars.size)]}.join

    share_invite = RateInterview.new

    unless @usr.blank?
     
    else
      @user = User.new(params[:user])
      @user.login = params[:user][:email]
      @user.plain_password = params[:user][:password]

      if @user.save
          roles(@user.user_type,@user.id)
          @notification = Notifier.deliver_share(@user)
          @usr = @user
      end

    end
        share_invite.code = promo_code
        share_invite.user_id = @usr.id
        share_invite.interview_id = @interview_id
        share_invite.save
        @notification = Notifier.deliver_rate_interview(current_user,@usr,share_invite.code)

  end

  def done_rate

    rate_interview = RateInterview.find_by_code session[:code]
    rate_interview.done =true
    rate_interview.save
    
      logout_killing_session!
      redirect_to("/sessions/new")
  end

   def roles(user_type,user_id)
    @role = Role.new
    @role.title = user_type
    @role.user_id = user_id
    @role.save
  end

  
end
