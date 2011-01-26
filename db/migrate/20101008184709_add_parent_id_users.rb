class AddParentIdUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :parent_id, :integer
  end

  def self.down
    remove_column :users, :parent_id
  end
end
