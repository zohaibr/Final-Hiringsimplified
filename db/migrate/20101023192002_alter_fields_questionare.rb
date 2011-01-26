class AlterFieldsQuestionare < ActiveRecord::Migration
  def self.up
    change_column_default(:questionares, :filename, :null => true)
    change_column_default(:questionares, :content_type, :null => true)
    remove_column :questionares, :size
    add_column :questionares, :size, :integer
  end

  def self.down
    change_column_default(:questionares, :filename, :null => false)
    change_column_default(:questionares, :content_type, :null => false)
    remove_column :questionares, :size
    add_column :questionares, :size, :integer
    
  end
end
