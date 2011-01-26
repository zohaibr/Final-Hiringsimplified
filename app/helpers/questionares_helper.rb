module QuestionaresHelper
  def from_user email
    @user = User.find(:first, :conditions => ["email = ?", email])
  end

  def convert_ms hours
    mins = sprintf("%.1f",(hours.to_f*60))
    raw = mins.to_s.split('.')
    secs = (raw[1].to_f*0.1)*60
    secs = secs.to_i
    return "#{raw[0].to_s} minute(s) and #{secs.to_s} second(s)"
  #@timer = mins.to_s
  end
end
