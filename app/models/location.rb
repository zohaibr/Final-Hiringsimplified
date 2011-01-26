class Location < ActiveRecord::Base
  belongs_to :user
  belongs_to :job_profile
end
