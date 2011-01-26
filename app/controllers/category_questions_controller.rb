class CategoryQuestionsController < ApplicationController
  filter_access_to :all
  # GET /category_questions
  # GET /category_questions.xml
  def index
    @category_questions = CategoryQuestion.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @category_questions }
    end
  end

  # GET /category_questions/1
  # GET /category_questions/1.xml
  def show
    @category_question = CategoryQuestion.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @category_question }
    end
  end

  # GET /category_questions/new
  # GET /category_questions/new.xml
  def new
    @category_question = CategoryQuestion.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @category_question }
    end
  end

  # GET /category_questions/1/edit
  def edit
    @category_question = CategoryQuestion.find(params[:id])
  end

  # POST /category_questions
  # POST /category_questions.xml
  def create
    @category_question = CategoryQuestion.new(params[:category_question])


    @cat_id = params[:cat_id]
   
    if @category_question.save
     return if request.xhr?
      render :nothing => true
    else
     
      render :nothing => true
    end
    
#    respond_to do |format|
#      if @category_question.save
#        format.html { redirect_to(@category_question, :notice => 'CategoryQuestion was successfully created.') }
#        format.xml  { render :xml => @category_question, :status => :created, :location => @category_question }
#      else
#        format.html { render :action => "new" }
#        format.xml  { render :xml => @category_question.errors, :status => :unprocessable_entity }
#      end
#    end
  end

  # PUT /category_questions/1
  # PUT /category_questions/1.xml
  def update
    @category_question = CategoryQuestion.find(params[:id])

    respond_to do |format|
      if @category_question.update_attributes(params[:category_question])
        format.html { redirect_to(@category_question, :notice => 'CategoryQuestion was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @category_question.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /category_questions/1
  # DELETE /category_questions/1.xml
  def destroy
    @category_question = CategoryQuestion.find(params[:id])
    @category_question.destroy

    render :nothing => true
  end

  def add_question
    @category_question = CategoryQuestion.new(params[:category_question])
    
    render :partial => "add_question", :locals => { :cat_id => params[:cat_id]}
  end

   def get_questions
    
    @questions = CategoryQuestion.find(:all, :conditions => ["category_id =?",params[:id]])
    render :partial => "show_questions", :locals => { :questions => @questions,:type => params[:custom],:cat_id =>params[:id]}
  end
end
