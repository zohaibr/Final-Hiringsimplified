module JobProfilesHelper
  def check_answer interview_id
    @answer = Answer.find(:last, :conditions => ["candidate_id = #{current_user.id} AND interview_id = #{interview_id}"])
    @answers = Answer.find(:all, :conditions => ["candidate_id = #{current_user.id} AND interview_id = #{interview_id}"])
    @questions = Questionare.find(:all, :conditions => ["interview_id = #{interview_id}"])
  end

  def check_interview_status interview_id, candidate_id
    @answer = Answer.find(:last, :conditions => ["candidate_id = #{candidate_id} AND interview_id = #{interview_id}"])
    @answers = Answer.find(:all, :conditions => ["candidate_id = #{candidate_id} AND interview_id = #{interview_id}"])
    @questions = Questionare.find(:all, :conditions => ["interview_id = #{interview_id}"])
  end

  def get_last_description
    @jd = JobProfile.find_last_by_user_id current_user.id
  end
end
