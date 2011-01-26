class AddFieldPublished < ActiveRecord::Migration
  def self.up
#    remove_column :interviews, :published
#    add_column :interviews, :published, :boolean,:default=>0
  end

  def self.down
#    add_column :interviews, :published, :boolean,:default=>0
#    remove_column :interviews, :published
  end
end
