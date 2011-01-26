class Candidate < ActiveRecord::Base
  has_many :education_histories, :dependent => :destroy
  has_many :prev_work_histories, :dependent => :destroy
  has_many :answers, :dependent => :destroy
  after_update :save_education_histories
  after_update :save_prev_work_histories

  has_attachment :storage => :s3,
    :max_size => 3000.kilobytes,
    :thumbnails => { :small => '10x10>',
                     :thumb => '100x100>' }

  attr_accessible :city, :address, :country, :new_prev_work_history_attributes, :new_education_history_attributes, :user_id, :contact_num, :last_name, :state, :middle_name, :first_name
  
  def new_education_history_attributes=(education_history_attributes)
    education_history_attributes.each do |attributes|
      education_histories.build(attributes)
    end
  end

  def existing_education_history_attributes=(education_history_attributes)
    education_histories.reject(&:new_record?).each do |education_history|
      attributes = education_history_attributes[education_history.id.to_s]
      if attributes
        education_history.attributes = attributes
      else
        education_histories.delete(education_history)
      end
    end
  end

  def save_education_histories
    education_histories.each do |education_history|
      education_history.save(false)
    end
  end

  def new_prev_work_history_attributes=(prev_work_history_attributes)
    prev_work_history_attributes.each do |attributes|
      prev_work_histories.build(attributes)
    end
  end

  def existing_prev_work_history_attributes=(prev_work_history_attributes)
    prev_work_histories.reject(&:new_record?).each do |prev_work_history|
      attributes = prev_work_history_attributes[prev_work_history.id.to_s]
      if attributes
        prev_work_history.attributes = attributes
      else
        prev_work_histories.delete(prev_work_history)
      end
    end
  end

  def save_prev_work_histories
    prev_work_histories.each do |prev_work_history|
      prev_work_history.save(false)
    end
  end

end
