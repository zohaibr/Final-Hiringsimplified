class AddPublishedField1 < ActiveRecord::Migration
  def self.up
    #remove_column :interviews, :published
    #change_column_default(:interviews, :published, :default => 0)
  end

  def self.down
    #add_column :interviews, :published, :boolean,:default=> false
    #change_column_default(:interviews, :published, :default => 0)
  end
end
