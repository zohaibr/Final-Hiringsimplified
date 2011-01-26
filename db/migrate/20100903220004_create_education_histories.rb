class CreateEducationHistories < ActiveRecord::Migration
  def self.up
    create_table :education_histories do |t|
      t.integer :candidate_id
      t.string :school
      t.date :date_attended
      t.string :degree
      t.string :major
      t.string :second_major

      t.timestamps
    end
  end

  def self.down
    drop_table :education_histories
  end
end
