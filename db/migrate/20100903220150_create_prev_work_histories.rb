class CreatePrevWorkHistories < ActiveRecord::Migration
  def self.up
    create_table :prev_work_histories do |t|
      t.integer :candidate_id
      t.string :organisation
      t.date :start_date
      t.date :end_date
      t.string :job_title

      t.timestamps
    end
  end

  def self.down
    drop_table :prev_work_histories
  end
end
