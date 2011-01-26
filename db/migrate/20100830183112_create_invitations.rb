class CreateInvitations < ActiveRecord::Migration
  def self.up
    create_table :invitations do |t|
      t.text :candidate_email
      t.integer :user_id
      t.integer :interview_id

      t.timestamps
    end
  end

  def self.down
    drop_table :invitations
  end
end
