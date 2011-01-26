class AlterDescriptionfield < ActiveRecord::Migration
  def self.up
    change_column :job_profiles, :company_description, :text
  end

  def self.down
    change_column :job_profiles, :company_description, :string
  end
end
