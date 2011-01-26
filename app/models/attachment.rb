class Attachment < ActiveRecord::Base
  has_attachment :content_type => :image,
    :storage => :s3,
    :max_size => 3000.kilobytes,
    :thumbnails => { :thumb => '50x50>' },
    :processor => 'ImageScience'

  validates_as_attachment


end
