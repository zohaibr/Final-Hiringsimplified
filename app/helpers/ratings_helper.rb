module RatingsHelper
  def get_rating id, skill, interview_id,user_id
   candidate_rate = Rating.find(:first, :conditions => ["candidate_id = ? AND interview_id = ? AND skill_attribute = ? AND user_id = ?",id,interview_id,skill,user_id])
    @rate = 2
    if !candidate_rate.blank? 
      @rate = candidate_rate.stars
    else
      @rate = 0
    end
  end
end
