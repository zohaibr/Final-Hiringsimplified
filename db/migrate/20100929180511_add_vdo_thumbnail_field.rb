class AddVdoThumbnailField < ActiveRecord::Migration
  def self.up
    add_column :answers, :vdo_thumbnail, :string
  end

  def self.down
    remove_column :answers, :vdo_thumbnail
  end
end
