class AddNoAutoAgain < ActiveRecord::Migration
  def self.up
    drop_table :packages
     create_table :packages do |t|
      t.float  "hours"
      t.string "package_type"
      t.float  "price"
    end
  end

  def self.down
    drop_table :packages
  end
end
