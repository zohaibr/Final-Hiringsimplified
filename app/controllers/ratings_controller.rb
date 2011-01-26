class RatingsController < ApplicationController
  filter_access_to :all
  def index
    
  end

  def get_ratings
    
    render :partial => "small_rate", :locals => { :candidate_id=>params[:cid], :interview_id=>params[:id],:user_id=>params[:uid]}
  end
  
  def avg_rating
    @avg_rating = Rating.average :stars, :conditions => ["interview_id = ? AND candidate_id = ?", params[:int_id],session[:default_candidate]]
    render :text => "#{@avg_rating}"
  end

  def rate
    @already_exist = Rating.find(:first, :conditions => ["candidate_id = ? AND interview_id = ? AND user_id = ? AND skill_attribute = ?",session[:default_candidate],session[:int_id],current_user.id,params[:skill]])
    if @already_exist.blank?
      @rate = Rating.new
      @rate.candidate_id = session[:default_candidate]
      @rate.interview_id = session[:int_id]
      @rate.user_id = current_user.id
      @rate.skill_attribute = params[:skill]
      @rate.stars = params[:stars]
      @rate.save
    else
      @already_exist.stars = params[:stars]
      @already_exist.save
    end
    @avg_rating = Rating.average :stars, :conditions => ["interview_id = ? AND candidate_id = ?", session[:int_id],session[:default_candidate]]
    render :text => @avg_rating
  end
end
