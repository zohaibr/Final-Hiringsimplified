class AddFilefieldsCandidates < ActiveRecord::Migration
  def self.up
    add_column :candidates, :parent_id,  :integer
    add_column :candidates, :content_type, :string
    add_column :candidates, :filename, :string
    add_column :candidates, :thumbnail, :string
    add_column :candidates, :size, :integer
    add_column :candidates, :width, :integer
    add_column :candidates, :height, :integer
  
  end

  def self.down
    remove_column :candidates, :parent_id,  :integer
    remove_column :candidates, :content_type, :string
    remove_column :candidates, :filename, :string
    remove_column :candidates, :thumbnail, :string
    remove_column :candidates, :size, :integer
    remove_column :candidates, :width, :integer
    remove_column :candidates, :height, :integer
  end
end
