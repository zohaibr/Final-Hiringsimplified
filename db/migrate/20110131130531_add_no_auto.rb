class AddNoAuto < ActiveRecord::Migration
  def self.up
     create_table(:packages, :id => false) do |t|
      t.integer :id, :options => 'PRIMARY KEY'
      t.float  "hours"
      t.string "package_type"
      t.float  "price"
    end
  end

  def self.down
    drop_table :packages
  end
end
