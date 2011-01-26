class AddCompNameField < ActiveRecord::Migration
  def self.up
    add_column :job_profiles, :company, :string
  end

  def self.down
    remove_column :job_profiles, :company
  end
end
