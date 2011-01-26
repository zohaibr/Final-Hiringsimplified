class JobProfile < ActiveRecord::Base
  belongs_to :user
  has_one  :location
  has_one :interviews
  accepts_nested_attributes_for :location

end
