class CategoriesController < ApplicationController
  filter_access_to :all
  layout "main"
  require 'csv'

  # GET /categories
  # GET /categories.xml
  def index
    @categories = Category.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @categories }
    end
  end

  # GET /categories/1
  # GET /categories/1.xml
  def show
    @category = Category.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @category }
    end
  end

  def data_bank
   # @interview_id = params[:id]
    session[:current_interview] = params[:id]
    session[:current_title] = params[:title]
    @title = params[:title]
    @default_categories = Category.find(:all, :conditions => ["category_type = 'default'"],:order=>"name asc")
    @custom_categories = Category.find(:all, :conditions => ["category_type = 'custom'"],:order=>"name asc")
    unless @default_categories.blank?
      @questions = CategoryQuestion.find(:all, :conditions => ["category_id = ?", @default_categories.first.id])
    end
    pckg = UserPackage.find(:first, :conditions => ["user_id = ? OR user_id = ?", current_user.id, current_user.parent_id])
    #pckg = UserPackage.find_by_user_id current_user.id
    @time_left = pckg.time_left
   # render :partial => "data_bank"
    render :action => 'data_bank', :layout =>false
  end

  # GET /categories/new
  # GET /categories/new.xml
  def new
    @category = Category.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @category }
    end
  end

  # GET /categories/1/edit
  def edit
    @category = Category.find(params[:id])
  end

  # POST /categories
  # POST /categories.xml
  def create
    @category = Category.new(params[:category])

    
      if @category.save
        return if request.xhr?
          render :nothing => true
        else
          return if request.xhr?
          render :nothing => true
      end
    
  end

  # PUT /categories/1
  # PUT /categories/1.xml
  def update
    @category = Category.find(params[:id])

    respond_to do |format|
      if @category.update_attributes(params[:category])
        format.html { redirect_to(@category, :notice => 'Category was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @category.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.xml
  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    
     redirect_to :controller => "categories", :action => "index"


  end

  def by_csv
    
  end
  def add_csv

     @parsed_file=CSV::Reader.parse(params[:dump][:file])
     df_name = ''
     n=0
      c=Category.new
     @parsed_file.each  do |row|
     temp_name = row[0]

     if n == 0
      
       c.category_type = "default"
       c.name = temp_name
       df_name =  temp_name
       c.save
     end
     if temp_name != df_name
       c=Category.new
       c.category_type = "default"
       c.name = temp_name
       c.save
     end

      question = CategoryQuestion.new
      question.category_id = c.id
      question.user_id = current_user.id
      question.question = row[1]
      question.save
      df_name =  temp_name
      n = n+1
     
     
  end
   redirect_to :controller => "categories", :action => "index"
  end
  
end
