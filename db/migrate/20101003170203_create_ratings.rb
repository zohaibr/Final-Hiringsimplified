class CreateRatings < ActiveRecord::Migration
  def self.up
    create_table :ratings do |t|
      t.integer :candidate_id
      t.integer :user_id
      t.integer :interview_id
      t.integer :stars
      t.integer :skill_attribute
      t.timestamps
    end
  end

  def self.down
    drop_table :ratings
  end
end
