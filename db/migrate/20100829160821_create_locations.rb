class CreateLocations < ActiveRecord::Migration
  def self.up
    create_table :locations do |t|
      t.string :city
      t.string :state
      t.string :country
      t.integer :job_profile_id

      t.timestamps
    end
  end

  def self.down
    drop_table :locations
  end
end
