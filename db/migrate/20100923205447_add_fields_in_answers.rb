class AddFieldsInAnswers < ActiveRecord::Migration
  def self.up
    add_column :answers, :notepad, :string
    add_column :answers, :textpad, :string
    add_column :answers, :video_url, :string
  end

  def self.down
    remove_column :answers, :notepad
    remove_column :answers, :textpad
    remove_column :answers, :video_url
  end
end
