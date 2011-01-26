class AddFieldsInUsersTable < ActiveRecord::Migration
  def self.up
    add_column :users, :user_type, :string
    add_column :users, :plain_password, :string
  end

  def self.down
    remove_column :users, :user_type
    remove_column :users, :plain_password
  end
end
