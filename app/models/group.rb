class Group < ActiveRecord::Base
  belongs_to :user, :foreign_key => :child_id
  
end
