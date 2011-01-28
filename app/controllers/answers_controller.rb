class AnswersController < ApplicationController
  
  layout "interview"
  # GET /answers
  # GET /answers.xml
  def index
    @answers = Answer.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @answers }
    end
  end

  # GET /answers/1
  # GET /answers/1.xml
  def show
    @answer = Answer.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @answer }
    end
  end

  # GET /answers/new
  # GET /answers/new.xml
  def new
    @answer = Answer.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @answer }
    end
  end

  # GET /answers/1/edit
  def edit
    @answer = Answer.find(params[:id])
  end

  # POST /answers
  # POST /answers.xml
  def create

    duplicate = Answer.find_by_candidate_id_and_interview_id_and_questionare_id params[:answer][:candidate_id],params[:answer][:interview_id],params[:answer][:questionare_id]

    unless duplicate.blank?
      redirect_to :action => "interview_area", :from => "create", :q_id => params[:answer][:questionare_id], :jp_id => params[:interview][:job_profile_id]
    else

    @answer = Answer.new(params[:answer])

    respond_to do |format|
      if @answer.save
#        question = Questionare.find(@answer.questionare_id)
#        secs = (question.time_sec/60)/60.to_f
#        mins = question.time_min/60.to_f
#        total = secs + mins
#        pckg = UserPackage.find_by_user_id question.user_id
#        pckg.time_left = pckg.time_left - total
#        pckg.save
        #interview_area("create")
        format.html { redirect_to :action => "interview_area", :from => "create", :q_id => params[:answer][:questionare_id], :jp_id => params[:interview][:job_profile_id]}
        #format.xml  { render :xml => @answer, :status => :created, :location => @answer }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @answer.errors, :status => :unprocessable_entity }
      end
    end
    end
  end

  # PUT /answers/1
  # PUT /answers/1.xml
  def update
    @answer = Answer.find(params[:id])

    respond_to do |format|
      if @answer.update_attributes(params[:answer])
        format.html { redirect_to(@answer, :notice => 'Answer was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @answer.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1
  # DELETE /answers/1.xml
  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy

    respond_to do |format|
      format.html { redirect_to(answers_url) }
      format.xml  { head :ok }
    end
  end

  def interview_area

    @answer = Answer.new
    if params[:from] == "create"
      session[:questions_iter] += 1
      ans = Answer.find(:last, :conditions => ["candidate_id = #{current_user.id} AND interview_id = #{session[:interview_id]}"])
      #@question = Questionare.find(:first, :conditions => ["interview_id = #{session[:interview_id]} AND id > #{params[:q_id]}"])
      @question = Questionare.find(:first, :conditions => ["id > #{ans.questionare_id}"])
    elsif params[:from] == "resume"
      session[:interview_id] = params[:int_id]
      @all_question = Questionare.find(:all, :conditions => ["interview_id = #{session[:interview_id]}"])
      @question = Questionare.find(:first, :conditions => ["id > #{params[:q_id]}"])
      session[:all_questions] = @all_question.count
      @iter = 0
      @all_question.each do |question|
        @iter += 1
        if question.id == @question.id
          session[:questions_iter] = @iter
        end
      end  
    else
      session[:interview_id] = params[:int_id]
      @all_question = Questionare.find(:all, :conditions => ["interview_id = #{session[:interview_id]}"])
      session[:all_questions] = @all_question.count
      session[:questions_iter] = 0
      session[:questions_iter] += 1
      @question = Questionare.find_by_interview_id(session[:interview_id])
    end
    unless @question.blank?
      render :partial => "check_question" ,:layout =>"interview"
    else
      @invitations = Invitation.find_by_candidate_email_and_interview_id(current_user.email,session[:interview_id])
      @invitations.update_attribute(:status,true)
       mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", session[:interview_id]])
       secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", session[:interview_id]])

       m1 = secs/60.to_f
       m1 = m1/60.to_f
       m2 = mins/60.to_f
       @int_duration = m2+m1

       usr = User.find(@invitations.user_id)

       pckg = UserPackage.find(:first, :conditions => ["user_id = ? OR user_id = ?", usr.id, usr.parent_id])
       pckg.time_left = pckg.time_left - @int_duration
       pckg.save

      Notifier.deliver_interview_completed(session[:interview_id],current_user.id)
       

       session[:all_questions] = nil
       session[:questions_iter] = nil
       session[:interview_id] = nil


       redirect_to :controller => 'interviews', :action => 'interviews_list'

    end
  end
  ## To retrieve all the answers against this question
  def get_answers_list
    @answers = Answer.find_all_by_questionare_id params[:q_id]
    unless @answers.blank?
      render :partial => "answers_list"
    else
      render :text => "No Record Found"
    end
  end
  
  def man
   # @file = request.raw_post
   
  end
  
end
