class AddCompanyDescriptionField < ActiveRecord::Migration
  def self.up
    add_column :job_profiles, :company_description, :string
  end

  def self.down
    remove_column :job_profiles, :company_description
  end
end
