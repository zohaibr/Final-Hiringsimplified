class AddFileFieldsInQuestionares < ActiveRecord::Migration
  def self.up
    add_column :questionares, :parent_id,  :integer, :null => true
    add_column :questionares, :content_type, :string, :null => false
    add_column :questionares, :filename, :string, :null => false
    add_column :questionares, :thumbnail, :string, :null => true
    add_column :questionares, :size, :integer, :null => false
    add_column :questionares, :width, :integer, :null => true
    add_column :questionares, :height, :integer, :null => true
  end

  def self.down
    remove_column :questionares, :parent_id
    remove_column :questionares, :content_type
    remove_column :questionares, :filename
    remove_column :questionares, :thumbnail
    remove_column :questionares, :size
    remove_column :questionares, :width
    remove_column :questionares, :height
  end
end
