class AddFieldsInQuestionares < ActiveRecord::Migration
  def self.up
    add_column :questionares, :notepad, :boolean
    add_column :questionares, :sketchpad, :boolean
    rename_column :answers, :textpad, :sketchpad
  end

  def self.down
    remove_column :questionares, :notepad
    remove_column :questionares, :sketchpad
    rename_column :answers, :sketchpad, :textpad
  end
end
