class AddJobProfileId < ActiveRecord::Migration
  def self.up
    add_column :interviews, :job_profile_id, :integer
  end

  def self.down
    remove_column :interviews, :job_profile_id
  end
end
