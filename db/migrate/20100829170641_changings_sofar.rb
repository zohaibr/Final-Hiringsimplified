class ChangingsSofar < ActiveRecord::Migration
  def self.up
    add_column :job_profiles, :user_id, :integer
    add_column :locations, :user_id, :integer
    change_column :users, :country, :string
  end

  def self.down
    remove_column :job_profiles, :user_id
    remove_column :locations, :user_id
    change_column :users, :country, :integer
  end
end
