class CreateCategoryQuestions < ActiveRecord::Migration
  def self.up
    create_table :category_questions do |t|
      t.integer :category_id
      t.text :question
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :category_questions
  end
end
