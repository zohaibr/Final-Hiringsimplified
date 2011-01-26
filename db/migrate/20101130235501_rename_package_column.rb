class RenamePackageColumn < ActiveRecord::Migration
  def self.up
    rename_column :packages, :type, :package_type
  end

  def self.down
  end
end
