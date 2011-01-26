class FeedbackMailer < ActionMailer::Base
  
  def feedback(feedback)
    @recipients  = 'zohaib.rahman@hiringsimplified.com'
    @from        = 'info@hiringsimplified.com'
    @subject     = "[Feedback for YourSite] #{feedback.subject}"
    @sent_on     = Time.now
    @body[:feedback] = feedback    
  end

end
