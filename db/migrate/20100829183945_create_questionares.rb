class CreateQuestionares < ActiveRecord::Migration
  def self.up
    create_table :questionares do |t|
      t.text :question
      t.integer :time_min
      t.integer :time_sec
      t.integer :interview_id
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :questionares
  end
end
