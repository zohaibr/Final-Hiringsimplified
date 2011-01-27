class AddAgreeUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :agree, :boolean
  end

  def self.down
    remove_column :users, :agree
  end
end
