ActionController::Routing::Routes.draw do |map|
  map.connect "interviews/all_interviews_list", :controller => 'interviews', :action => 'all_interviews_list'
  
  map.feedback 'feedbacks', :controller => 'feedbacks', :action => 'create'

  map.new_feedback 'feedbacks/new', :controller => 'feedbacks', :action => 'new'

  map.connect "/direct_login", :controller => "sessions", :action => "direct_login"

  map.connect "users/upload", :controller => "users", :action => "upload"

  map.connect "users/add", :controller => "users", :action => "add"
  
  map.resources :comments

  map.connect 'answers/interview_area', :controller => "answers", :action => "interview_area"
  
  map.resources :answers

  map.resources :category_questions

  map.resources :categories

  map.connect 'questionares/ajax_update/:id', :controller => "questionares", :action => "ajax_update"

  map.connect 'invitations/invitations_form/:id', :controller => "invitations", :action => "invitations_form"

  map.connect 'answers/webcam', :controller => "answers", :action => "webcam"

  map.connect 'answers/man', :controller => "answers", :action => "man"

  map.connect 'questionares/add_question', :controller => "questionares", :action => "add_question"

  map.connect 'categories/data_bank/:id', :controller => "categories", :action => "data_bank"
  
  map.connect 'interviews/my_interviews', :controller => "interviews", :action => "my_interviews"

  map.connect 'interviews/get_pre_interviews:id', :controller => "interviews", :action => "get_pre_interviews"

  map.connect 'interviews/pre_interview', :controller => "interviews", :action => "pre_interview"

  map.connect 'interviews/invite', :controller => "interviews", :action => "invite"
  
  map.connect 'interviews/done_rate', :controller => "interviews", :action => "done_rate"
  
  map.connect 'sessions/rate_interview', :controller => "sessions", :action => "rate_interview"
  
  map.connect 'sessions/check_code', :controller => "sessions", :action => "check_code"





  map.connect 'interviews/share', :controller => "interviews", :action => "share"

  map.connect 'interviews/record_test', :controller => "interviews", :action => "record_test"

  map.connect 'users/profile', :controller => "users", :action => "profile"

  map.connect 'users/show_packages', :controller => "users", :action => "show_packages"

  map.connect 'categories/by_csv', :controller => "categories", :action => "by_csv"

  map.connect 'users/change_subscription/:id', :controller => "users", :action => "change_subscription"
  
  map.connect 'users/cancel_subscription/:id', :controller => "users", :action => "cancel_subscription"

  map.connect 'users/reactivate_subscription/:id', :controller => "users", :action => "reactivate_subscription"
  
  map.connect 'users/trigger_subscription', :controller => "users", :action => "trigger_subscription"

  map.connect 'interviews/save_file', :controller => "interviews", :action => "save_file"

  map.connect 'interviews/recruite/:id', :controller => "interviews", :action => "recruite"

  map.connect 'interviews/get_answers_list/:id', :controller => "interviews", :action => "get_answers_list"
  
  map.resources :prev_work_histories

  map.resources :education_histories

  map.resources :candidates

  map.connect 'interviews/interviews_list', :controller => "interviews", :action => "interviews_list"
  
  map.resources :invitations

  map.resources :questionares

  map.resources :interviews

  map.resources :locations

  map.resources :job_profiles
  
  map.resources :passwords

  map.resources :users, :has_one => [:password]

  map.logout '/logout', :controller => 'sessions', :action => 'destroy'

  map.login '/login', :controller => 'sessions', :action => 'new'

  map.register '/register', :controller => 'users', :action => 'create'

  map.signup '/signup', :controller => 'users', :action => 'new'

  map.signup 'users/add_subscription', :controller => 'users', :action => 'add_subscription'

  map.signup 'users/welcome', :controller => 'users', :action => 'welcome'

  map.resources :users

  map.resource :session

  map.root :controller => 'sessions', :action => 'new'
  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing or commenting them out if you're using named routes and resources.
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
