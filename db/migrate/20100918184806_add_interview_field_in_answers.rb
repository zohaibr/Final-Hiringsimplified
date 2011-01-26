class AddInterviewFieldInAnswers < ActiveRecord::Migration
  def self.up
    add_column :answers, :interview_id, :integer
  end

  def self.down
    remove_column :answers, :interview_id
  end
end
