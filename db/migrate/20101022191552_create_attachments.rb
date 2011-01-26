class CreateAttachments < ActiveRecord::Migration
  def self.up
    create_table :attachments do |t|
      t.column :question_id, :integer, :null => false
      t.column :parent_id,  :integer, :null => true
      t.column :content_type, :string, :null => false
      t.column :filename, :string, :null => false
      t.column :thumbnail, :string, :null => true
      t.column :size, :integer, :null => false
      t.column :width, :integer, :null => true
      t.column :height, :integer, :null => true
      t.timestamps
    end
  end

  def self.down
    drop_table :attachments
  end
end
