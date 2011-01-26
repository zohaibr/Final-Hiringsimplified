class Feedback
  attr_accessor :subject, :email, :comment, :page,:name
  
  def initialize(params = {})
    self.subject = params[:subject]
    self.email = params[:email]
    self.comment = params[:comment]
    self.name = params[:name]
  end
  
  def valid?
    self.comment && !self.comment.strip.blank?
  end

end
