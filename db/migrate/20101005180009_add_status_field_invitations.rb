class AddStatusFieldInvitations < ActiveRecord::Migration
  def self.up
    add_column :invitations, :status, :boolean
  end

  def self.down
    remove_column :invitations, :status
  end
end
