# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def get_recruiter_info uid
    @recruiter = User.find(uid)
  end

  def get_job_details jp_id
    @job_profile = JobProfile.find(jp_id)
  end
  ## TO get Candidate credentials
  def get_candidates_for_recruiter int_id
    # Add more column names in query if you want
     @all = Answer.find(:all, :select => "invitations.candidate_email ,invitations.interview_id ,users.id", :from => "invitations", :joins => "INNER JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{int_id} and invitations.status = true", :conditions => "invitations.interview_id = #{session[:int_id]} and candidates.user_id = users.id and invitations.status = 1")
     #@all = Answer.find_by_sql("SELECT invitations.candidate_email ,invitations.interview_id ,users.id
     #                          FROM invitations INNER JOIN users ON invitations.candidate_email = users.email WHERE invitations.interview_id = #{int_id} and invitations.status =1")
    render :partial => "some_partial_name"
  end
  ## This function will be used in recruiters page to fetch all the questions against this interview_id
  def get_questions int_id
    @all_questions = Questionare.find_by_interview_id int_id
  end

  def get_answer_cid_qid cid,qid
    @answers = Answer.find(:first, :conditions => ["candidate_id = ? AND questionare_id = ?", cid,qid])
    
  end

  def random_password( len = 8 )
    chars = (("a".."z").to_a + ("1".."9").to_a )- %w(i o 0 1 l 0)
    @newpass = Array.new(len, '').collect{chars[rand(chars.size)]}.join
  end
end
