class AddGdocidField < ActiveRecord::Migration
  def self.up
    add_column :users, :gdoc_id, :string
  end

  def self.down
    remove_column :users, :gdoc_id
  end
end
