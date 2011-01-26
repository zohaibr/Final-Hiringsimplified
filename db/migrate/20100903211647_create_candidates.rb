class CreateCandidates < ActiveRecord::Migration
  def self.up
    create_table :candidates do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :contact_num
      t.text :address
      t.string :city
      t.string :state
      t.string :country

      t.timestamps
    end
  end

  def self.down
    drop_table :candidates
  end
end
