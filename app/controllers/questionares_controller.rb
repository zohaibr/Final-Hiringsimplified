class QuestionaresController < ApplicationController
  filter_access_to :all
  layout "main"
  include(InterviewsHelper)
  # GET /questionares
  # GET /questionares.xml
  def index
    @questionares = Questionare.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @questionares }
    end
  end

  # GET /questionares/1
  # GET /questionares/1.xml
  def show
    @questionare = Questionare.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @questionare }
    end
  end

  # GET /questionares/new
  # GET /questionares/new.xml
  def new
    @questionare = Questionare.new
    #render :partial => "questionares/new" ,:locals => { :question => @questionare,:qid =>params[:id]}
  end

  # GET /questionares/1/edit
  def edit
    @questionare = Questionare.find(params[:id])
  end

  # POST /questionares
  # POST /questionares.xml
  def create
    @questionare = Questionare.new(params[:questionare])
    @questionare.user_id = current_user.id
    if @questionare.save
      return if request.xhr?
      render :nothing => true
    else
      render :nothing => true
    end
  end
  def add_question
    @questionare = Questionare.new(params[:questionare])

    
    
    @questionare.interview_id = session[:current_interview]
    @questionare.user_id = current_user.id
    
        
          if @questionare.save
            if @questionare.time_min.blank? && @questionare.time_sec.blank?
              @questionare.time_min = 1
              @questionare.time_sec = 0
            end

            if @questionare.time_min.blank? && @questionare.time_sec.blank?
              @questionare.time_min = 1
              @questionare.time_sec = 0
            end

            if @questionare.time_min.blank?
              @questionare.time_min = 0
            end

            if @questionare.time_sec.blank?
              @questionare.time_sec = 0
            end
           # pckg = UserPackage.find_by_user_id current_user.id
           # @time_left = 0.0
            #@flag = 'false'
            #if pckg.time_left >0
                #@time_left = @time_left*60 + @questionare.time_min
                #@time_left = @questionare.time_min
                #@time_left = @questionare.time_min + @questionare.time_sec.to_f/60
               # pckg.time_left = pckg.time_left - @time_left.to_f/60
                #@time_left = pckg.time_left
               # pckg.save
                @questionare.save
              #  @flag ='true';
           # end
             @flag ='true';
            render :partial => "questionares/hello"
            #render :text => "Question saved"
          end
            #render :update do |page|
           #   page.replace_html 'q_st', "Question saved"
           # end
      #end
#      if @questionare.save
#        render :update do |page|
#          page.replace_html 'q_st', "Question saved"
#        end
#      else
#        render :text => @questionare.interview_id
#      end
    

  end
  #    respond_to do |format|
  #      if @questionare.save
  #        format.html { redirect_to(@questionare, :notice => 'Questionare was successfully created.') }
  #        format.xml  { render :xml => @questionare, :status => :created, :location => @questionare }
  #      else
  #        format.html { render :action => "new" }
  #        format.xml  { render :xml => @questionare.errors, :status => :unprocessable_entity }
  #      end
  #    end
 

  # PUT /questionares/1
  # PUT /questionares/1.xml
  def ajax_update
    @questionare = Questionare.find(params[:id])

  
    if @questionare.update_attributes(params[:questionare])
    @duration = get_duration session[:current_interview]
      return if request.xhr?
      render :nothing => true
    else
      return if request.xhr?
      render :nothing => true
    end
    
  end

  # DELETE /questionares/1
  # DELETE /questionares/1.xml
  def delete
    @questionare = Questionare.find(params[:id])
    @int_id = @questionare.interview_id
    @questionare.delete
    @duration = get_duration @int_id

    return if request.xhr?
    render :partial => "questionares/update_scr"
  end

  def get_questionare
    @questionare_list = Questionare.find(:all, :conditions => ["interview_id = ?",params[:id]])
    @int = Interview.find(params[:id])
    session[:current_interview] = params[:id]
    #    return if request.xhr?
    #    if @questionare_list.blank?
    #      render :nothing => true
    #    else
    duration = get_duration session[:current_interview]
    render :partial => "questionares/questionare_list" ,:locals => { :questionare_list => @questionare_list,:id =>params[:id],:title => params[:title],:duration=>duration,:published =>@int.published}
    #    end
    
  end

  def get_current_questionare
    @questionare_list = Questionare.find(:all, :conditions => ["interview_id = ?",session[:current_interview]])

    duration = get_duration session[:current_interview]
    render :partial => "questionares/questionare_list" ,:locals => { :questionare_list => @questionare_list,:id =>session[:current_interview],:duration=>duration,:title =>session[:current_title],:published =>false }
  end

  def get_candidates
    @invitations = Invitation.find_all_by_interview_id(params[:int_id])
    render :patial => "get_candidates"
  end
  ## This function might be helpful in fetching records from answers table against question
  def get_candidates_by_qid
    @candidate_answers = Questionare.find(params[:qid])
    render :patial => "candidates"
  end

  
end
