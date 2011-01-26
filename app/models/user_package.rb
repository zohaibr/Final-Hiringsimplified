class UserPackage < ActiveRecord::Base
  belongs_to :user
  belongs_to :package
end
