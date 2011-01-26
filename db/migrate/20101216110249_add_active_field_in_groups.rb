class AddActiveFieldInGroups < ActiveRecord::Migration
  def self.up
    add_column :groups, :active, :boolean
  end

  def self.down
    remove_column :groups, :active
  end
end
