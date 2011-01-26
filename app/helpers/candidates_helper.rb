module CandidatesHelper
  def fields_for_education_history(education_history, &block)
    prefix = education_history.new_record? ? 'new' : 'existing'
    fields_for("candidate[#{prefix}_education_history_attributes][]", education_history, &block)
  end

  def add_education_history_link(name)
    link_to_function name do |page|
      page.insert_html :bottom, :education_histories, :partial => 'candidates/education_history', :object => EducationHistory.new
    end
  end

  def fields_for_prev_work_history(prev_work_history, &block)
    prefix = prev_work_history.new_record? ? 'new' : 'existing'
    fields_for("candidate[#{prefix}_prev_work_history_attributes][]", prev_work_history, &block)
  end

  def add_prev_work_history_link(name)
    link_to_function name do |page|
      page.insert_html :bottom, :prev_work_histories, :partial => 'candidates/prev_work_history', :object => PrevWorkHistory.new
    end
  end

  def get_candidates_details email
    @candidate = User.find_by_email email
  end

end
