class FieldNextDate < ActiveRecord::Migration
  def self.up
    add_column :user_packages, :next_assessment_at, :string
  end

  def self.down
    add_column :user_packages, :next_assessment_at, :string
  end
end
