class AlterRatingField < ActiveRecord::Migration
  def self.up
    change_column :ratings, :skill_attribute, :string
  end

  def self.down
    change_column :ratings, :skill_attribute, :integer
  end
end
