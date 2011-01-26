class Packages < ActiveRecord::Migration
  def self.up
    create_table :packages do |t|
      t.float:hours
      t.string:type
      t.float:price
    end
  end

  def self.down
    drop_table :packages
  end
end
