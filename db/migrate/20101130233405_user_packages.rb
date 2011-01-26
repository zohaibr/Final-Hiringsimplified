class UserPackages < ActiveRecord::Migration
  def self.up
    create_table :user_packages do |t|
      t.integer:user_id
      t.integer:package_id
      t.float:time_left
    end
  end

  def self.down
    drop_table :user_packages
  end
end
