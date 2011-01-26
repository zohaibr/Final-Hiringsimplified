class Answer < ActiveRecord::Base
  belongs_to :questionare
  belongs_to :candidate
end
