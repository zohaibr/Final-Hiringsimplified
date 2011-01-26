# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_hiring_si_session',
  :secret      => '427c97ce57574d5024cd062cf6804573b600edf6bb2fc4d184d0639aa003b13cac8687325c85ff376512cdaa2ea1c31afda15837c51746edd100b929424ead92'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
