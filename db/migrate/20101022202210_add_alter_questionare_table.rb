class AddAlterQuestionareTable < ActiveRecord::Migration
  def self.up
    add_column :attachments, :questionare_id, :integer
    remove_column :attachments, :question_id
  end

  def self.down
    remove_column :attachments, :questionare_id
    add_column :attachments, :question_id, :integer
  end
end
