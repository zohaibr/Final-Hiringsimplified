authorization do
  role :admin do
    has_permission_on [:answers, :candidates,
      :categories, :category_questions,
      :comments, :dashboards,
      :education_histories,
      :feedbacks, :interviews,
      :invitations, :job_profiles,
      :locations, :passwords,
      :prev_work_histories, :questionares,
      :ratings, :users],
      :to => [:manage]
  end

  role :guest do
    has_permission_on [:dashboards,:interviews], :to => [:index, :show, :interviews_list]
  end

  role :candidate do
    has_permission_on :interviews, :to => [:edit, :update,:index, :show, :interviews_list,:record_test,:save_file] do
      if_attribute :user => is { user }
    end
    
    has_permission_on :job_profiles, :to => [:get_job_details] do
      if_attribute :user => is { user }
    end

    has_permission_on :answers, :to => [:interview_area] do
      if_attribute :user => is { user }
    end
  end

  role :recruiter do
    has_permission_on [:answers, :candidates,
      :categories, :category_questions,
      :comments, :dashboards,
      :education_histories,
      :feedbacks, :interviews,
      :invitations, :job_profiles,
      :locations, :passwords,
      :prev_work_histories, :questionares,
      :ratings, :users, :settings],
      :to => [:manage,:get_candidates,:recruite,:get_compare_list,:publish_interview,:get_interviews,:get_questionare,
      :add_question, :get_current_questionare, :rate, :get_comments, :get_comment_by_user, :get_user_comments, :update_comment, :invitations_form, :data_bank,
      :get_questions, :update_status,:send_invitations,:view_package,:by_csv,:add_csv,:csv_import,:ajax_update,:change_subscription]do
      if_attribute :user => is { user || user.parent_id }
      #if_attribute :user => is { user.parent_id }
    end
#    has_permission_on  :settings, :to => [:manage] do
#      if_attribute :user => is { user }
#    end
  end

end

privileges do
  # default privilege hierarchies to facilitate RESTful Rails apps
  privilege :manage, :includes => [:create, :read, :update, :delete, :pre_interview]
  privilege :read, :includes => [:index, :show]
  privilege :create, :includes => :new
  privilege :update, :includes => :edit
  privilege :delete, :includes => :destroy
end
