class Notifier < ActionMailer::Base
  
  def invitation(recipient,company)
    recipients recipient
    subject    "Invitation for Video Interview for #{recipient} from #{company}"
    from       "support@hiringsimplified.com"
    @body[:email] = recipient
    @body[:company] = company
  end

  def share(recipient)
    recipients recipient.email
    subject    "[Invitation for hiringsimplified] Welcome #{recipient.first_name} #{recipient.last_name}"
    from       "support@hiringsimplified.com"
    @body[:name] = recipient.first_name
    @body[:user_name] = recipient.email
    @body[:password] = recipient.plain_password
    content_type "text/html"
  end

  def new_password(user, new_password)
    setup_email(user)
    @subject    += 'Your new password'
    @body[:new_password]  = new_password
  end

  def confirmation_email(recipient)
    recipients recipient.email
    subject    "Welcome #{recipient.first_name} #{recipient.last_name} to HiringSimplified"
    from       "support@hiringsimplified.com"
    @body[:first_name] = recipient.first_name
    @body[:last_name] = recipient.last_name
    @body[:user_name] = recipient.email
    @body[:password] = recipient.plain_password
    content_type "text/html"
  end


   def interview_completed(interview_id,candidate_id)
    interview = Interview.find interview_id
    user = User.find interview.user_id
    candidate = Candidate.find_by_user_id candidate_id

    @recipients  = "#{user.email}"
    @from        = "Support" "<noreply@hiringsimplified.com>"
    @subject     = "#{interview.name} Interview completed."
    @sent_on     = Time.now
    @body[:candidate_name] = "#{candidate.first_name} #{candidate.last_name}"
    @body[:interview_id] = "#{interview_id}"
    @body[:user] = "#{user.first_name} #{user.last_name}"
    @body[:candidate_id] = "#{candidate_id}"

  end

   def trigger_subscription (email,message)
    @recipients  = "#{email}"
    @from        = "Support" "<noreply@hiringsimplified.com>"
    @subject     = "Billing Event."
    @sent_on     = Time.now
    @body[:msg] = "#{message}"
   end

  protected

  def setup_email(user)
    @recipients  = "#{user.email}"
    @from        = "Support" "<support@hiringsimplified.com>"
    @subject     = ""
    @sent_on     = Time.now
    @body[:user] = user
  end


  def rate_interview(from_user,to_user,rate_code)

    @recipients  = "#{to_user.email}"
    @from        = "Support" "<support@hiringsimplified.com>"
    @subject     = "Invitation to rate the interview"

    @sent_on     = Time.now
    @body[:from_user] = "#{from_user.first_name} #{from_user.last_name}"
    @body[:to_user] = "#{to_user.first_name} #{to_user.last_name}"
    @body[:code] = rate_code


  end

 

end
