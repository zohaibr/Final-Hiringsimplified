class RenameFieldOrganization < ActiveRecord::Migration
  def self.up
    rename_column :prev_work_histories, :organisation, :organization
  end

  def self.down
    rename_column :prev_work_histories, :organization, :organisation
  end
end
