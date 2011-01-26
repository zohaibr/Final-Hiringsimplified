class Interview < ActiveRecord::Base
  belongs_to :user
  belongs_to :job_profile
  has_many :questionares
  has_many :invitations, :dependent => :delete_all
end
