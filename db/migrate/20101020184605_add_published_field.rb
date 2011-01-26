class AddPublishedField < ActiveRecord::Migration
  def self.up
    #add_column :interviews, :published, :boolean
  end

  def self.down
    #remove_column :interviews, :published
  end
end
