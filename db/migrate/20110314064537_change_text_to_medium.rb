class ChangeTextToMedium < ActiveRecord::Migration
  def self.up
    change_column :answers, :notepad, :mediumtext
  end

  def self.down
    change_column :answers, :notepad, :text
  end
end
