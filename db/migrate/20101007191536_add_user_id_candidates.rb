class AddUserIdCandidates < ActiveRecord::Migration
  def self.up
    add_column :candidates, :user_id, :integer
  end

  def self.down
    remove_column :candidates, :user_id
  end
end
