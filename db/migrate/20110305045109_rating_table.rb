class RatingTable < ActiveRecord::Migration
  def self.up
     create_table :rate_interviews do |t|
      t.string :code
      t.integer :interview_id
      t.integer :user_id
      t.boolean :done
    end
  end

  def self.down
    drop_table :rate_interviews
  end
end
