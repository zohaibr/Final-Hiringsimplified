class AddFieldsQuestionare < ActiveRecord::Migration
  def self.up
    remove_column :questionares, :content_type
    remove_column :questionares, :filename
    add_column :questionares, :content_type, :string
    add_column :questionares, :filename, :string
  end

  def self.down
    add_column :questionares, :content_type, :string
    add_column :questionares, :filename, :string
    remove_column :questionares, :content_type
    remove_column :questionares, :filename
  end
end
