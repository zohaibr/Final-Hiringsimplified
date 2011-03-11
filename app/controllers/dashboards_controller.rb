class DashboardsController < ApplicationController
  filter_access_to :all
  layout "main"
  def index
    #@user = User.find(current_user.id)
    if current_user.user_type == "admin"
      @job_profiles = JobProfile.find(:all,:order =>"created_at DESC")
    elsif current_user.user_type == "recruiter"
      @job_profiles = JobProfile.find(:all,:conditions => ["user_id = ? OR user_id = ?", current_user.id, current_user.parent_id],:order =>"created_at DESC")

      unless @job_profiles.blank?
        @interviews = Interview.find(:all,:conditions => ["id= ?",@job_profiles.first.id ],:order =>"created_at DESC")
      end
    end

    @new_users = User.find(:all,:conditions => ["parent_id = ?",current_user.id],:order =>"created_at DESC" ,:limit=>"10")

    @interviews_feeds = Interview.find(:all,:conditions => ["user_id = ?",current_user.id],:order =>"created_at DESC" ,:limit=>"10")

    @invitations = Invitation.find(:all,:conditions => ["user_id = ?",current_user.id],:order =>"created_at DESC" ,:limit=>"10")

   # @job_feeds = JobProfile.find(:all,:conditions => ["user_id = ?",current_user.id],:order =>"created_at DESC" ,:limit=>"10")

    @events = Array.new

    @new_users.each do |m|
      @events.push(m)
    end

    @interviews_feeds.each do |m|
      @events.push(m)
    end

    @invitations.each do |m|
      @events.push(m)
    end

#    @job_feeds.each do |m|
#      @events.push(m)
#    end

    @events = @events.sort_by { |evt|evt.created_at  }.reverse!


    unless @interviews.blank?

      @candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{@interviews.first.id}",:group => "c_id")
      #@candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{@interviews.first.id} and candidates.user_id = users.id and invitations.status = true", :group => "c_id")
      #@candidates = Invitation.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status
      #                         FROM candidates,invitations LEFT JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{@interviews.first.id} and candidates.user_id = users.id group by c_id")
    end
    
  end

  def man
    #  @t = request.raw_post

    name = "tmp_image.png"
    data = request.raw_post
    @file_content = File.open("#{RAILS_ROOT}/Public/images/#{name}", "wb") { |f|
      f.write(data) 
    }

  end

  def get_candidates
    @interview_id = params[:id]
    #@candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{params[:id]} and candidates.user_id = users.id and invitations.status = true", :group => "invitations.candidate_email,invitations.interview_id,c_id,candidates.first_name,candidates.last_name ,invitations.status")
    @candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{params[:id]}",:group => "c_id" ,:order=> "c_id")
    #@candidates = Invitation.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status", :from => "candidates,invitations", :joins => "LEFT JOIN users ON invitations.candidate_email = users.email", :conditions => "invitations.interview_id = #{params[:id]} and candidates.user_id = users.id and invitations.status = true")
    #@candidates = Invitation.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id as c_id,candidates.first_name,candidates.last_name ,invitations.status
    #FROM candidates,invitations LEFT JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{@interview_id} and candidates.user_id = users.id group by c_id")
    @invites = Invitation.find(:all,:conditions => ["interview_id = ? and status != true ",@interview_id],:order =>"created_at DESC" ,:limit=>"5")
    render :partial => "dashboards/candidates_list" , :locals => { :candidates => @candidates, :interview_id =>@interview_id,:invites=>@invites }
  end

 

end
