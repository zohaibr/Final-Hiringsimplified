require 'gdocs4ruby'
include GDocs4Ruby
module InterviewsHelper
  def get_interview id
    @interview = Interview.find(id)
  end

  def get_ints jid
    @interviews = Interview.find(:all, :conditions => ["job_profile_id = ?", jid])
  end

  def get_duration interview_id
    mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", interview_id])
    secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", interview_id])

    mins_secs = secs/60.to_f

    @raw = mins_secs.to_s.split('.')
    final_mins = (@raw[0].to_i+mins).to_s
    final_secs = (secs%60).to_s

    if final_mins.length == 1
      final_mins = "0"+final_mins
    end
    if final_secs.length == 1
      final_secs = "0"+final_secs
    end
    @duration = "#{(final_mins).to_s}:#{final_secs}"
    
   
  end

  def hours_convert interview_id
    mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", interview_id])
    secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", interview_id])

    m1 = secs/60.to_f
    m1 = m1/60.to_f

    m2 = mins/60.to_f

    @int_duration = m2+m1


  end
  def get_gdoc
    @account = Service.new()
    @account.debug = true
    @account.authenticate("info@hiringsimplified.com", "difficult")
    @documents = @account.files
  end

  def get_candidates_detail email
    @user = User.find_last_by_email email
  end

end
