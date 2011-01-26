class CreateJobProfiles < ActiveRecord::Migration
  def self.up
    create_table :job_profiles do |t|
      t.string :title
      t.text :description
      t.integer :job_opening_id

      t.timestamps
    end
  end

  def self.down
    drop_table :job_profiles
  end
end
