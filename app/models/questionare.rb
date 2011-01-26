class Questionare < ActiveRecord::Base
  has_attachment :content_type => :image,
    :storage => :s3,
    :max_size => 3000.kilobytes
 # validates_as_attachment
  attr_accessible :time_min, :time_sec, :interview_id, :question, :user_id, :sketchpad,:notepad,:size,:filename,:content_type
  belongs_to :user
  belongs_to :interview
  has_many   :answers
end
