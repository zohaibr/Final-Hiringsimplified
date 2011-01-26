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

  protected

  def setup_email(user)
    @recipients  = "#{user.email}"
    @from        = "Support" "<support@hiringsimplified.com>"
    @subject     = ""
    @sent_on     = Time.now
    @body[:user] = user
  end

end
