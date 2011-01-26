class AddValueInterview < ActiveRecord::Migration
  def self.up
   # remove_column :interviews, :published
    add_column :interviews, :published, :boolean,:default=> false
  end

  def self.down
    #add_column :interviews, :published, :boolean,:default=> false
    remove_column :interviews, :published
  end
end
