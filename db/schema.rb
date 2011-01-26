# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101216110249) do

  create_table "answers", :force => true do |t|
    t.integer  "candidate_id"
    t.integer  "questionare_id"
    t.text     "answer"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "interview_id"
    t.text     "notepad"
    t.string   "sketchpad"
    t.string   "video_url"
    t.string   "vdo_thumbnail"
  end

  create_table "attachments", :force => true do |t|
    t.integer  "parent_id"
    t.string   "content_type",   :null => false
    t.string   "filename",       :null => false
    t.string   "thumbnail"
    t.integer  "size",           :null => false
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "questionare_id"
  end

  create_table "candidates", :force => true do |t|
    t.string   "first_name"
    t.string   "middle_name"
    t.string   "last_name"
    t.string   "contact_num"
    t.text     "address"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "parent_id"
    t.string   "content_type"
    t.string   "filename"
    t.string   "thumbnail"
    t.integer  "size"
    t.integer  "width"
    t.integer  "height"
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.string   "category_type"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "category_questions", :force => true do |t|
    t.integer  "category_id"
    t.text     "question"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", :force => true do |t|
    t.text     "comment"
    t.integer  "candidate_id"
    t.integer  "interview_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "education_histories", :force => true do |t|
    t.integer  "candidate_id"
    t.string   "school"
    t.date     "date_attended"
    t.string   "degree"
    t.string   "major"
    t.string   "second_major"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", :force => true do |t|
    t.integer  "parent_id"
    t.integer  "child_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active"
  end

  create_table "interviews", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "job_profile_id"
    t.boolean  "published",      :default => false
  end

  create_table "invitations", :force => true do |t|
    t.text     "candidate_email"
    t.integer  "user_id"
    t.integer  "interview_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "status"
  end

  create_table "job_profiles", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "job_opening_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "company"
    t.text     "company_description"
  end

  create_table "locations", :force => true do |t|
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.integer  "job_profile_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "packages", :force => true do |t|
    t.float  "hours"
    t.string "package_type"
    t.float  "price"
  end

  create_table "prev_work_histories", :force => true do |t|
    t.integer  "candidate_id"
    t.string   "organization"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "job_title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questionares", :force => true do |t|
    t.text     "question"
    t.integer  "time_min"
    t.integer  "time_sec"
    t.integer  "interview_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "notepad"
    t.boolean  "sketchpad"
    t.integer  "parent_id"
    t.string   "thumbnail"
    t.integer  "width"
    t.integer  "height"
    t.integer  "size"
    t.string   "content_type"
    t.string   "filename"
  end

  create_table "ratings", :force => true do |t|
    t.integer  "candidate_id"
    t.integer  "user_id"
    t.integer  "interview_id"
    t.integer  "stars"
    t.string   "skill_attribute"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", :force => true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_packages", :force => true do |t|
    t.integer "user_id"
    t.integer "package_id"
    t.float   "time_left"
  end

  create_table "users", :force => true do |t|
    t.string   "login",                     :limit => 40
    t.string   "name",                      :limit => 100, :default => ""
    t.string   "email",                     :limit => 100
    t.string   "crypted_password",          :limit => 40
    t.string   "company_name",              :limit => 100
    t.string   "first_name",                :limit => 100
    t.string   "last_name",                 :limit => 100
    t.string   "city",                      :limit => 100
    t.string   "state",                     :limit => 100
    t.string   "country"
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_token",            :limit => 40
    t.datetime "remember_token_expires_at"
    t.string   "user_type"
    t.string   "plain_password"
    t.integer  "parent_id"
    t.string   "gdoc_id"
  end

  add_index "users", ["login"], :name => "index_users_on_login", :unique => true

end
