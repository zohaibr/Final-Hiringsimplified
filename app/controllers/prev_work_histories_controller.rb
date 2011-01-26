class PrevWorkHistoriesController < ApplicationController
  # GET /prev_work_histories
  # GET /prev_work_histories.xml
  def index
    @prev_work_histories = PrevWorkHistory.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @prev_work_histories }
    end
  end

  # GET /prev_work_histories/1
  # GET /prev_work_histories/1.xml
  def show
    @prev_work_history = PrevWorkHistory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @prev_work_history }
    end
  end

  # GET /prev_work_histories/new
  # GET /prev_work_histories/new.xml
  def new
    @prev_work_history = PrevWorkHistory.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @prev_work_history }
    end
  end

  # GET /prev_work_histories/1/edit
  def edit
    @prev_work_history = PrevWorkHistory.find(params[:id])
  end

  # POST /prev_work_histories
  # POST /prev_work_histories.xml
  def create
    @prev_work_history = PrevWorkHistory.new(params[:prev_work_history])

    respond_to do |format|
      if @prev_work_history.save
        format.html { redirect_to(@prev_work_history, :notice => 'PrevWorkHistory was successfully created.') }
        format.xml  { render :xml => @prev_work_history, :status => :created, :location => @prev_work_history }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @prev_work_history.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /prev_work_histories/1
  # PUT /prev_work_histories/1.xml
  def update
    @prev_work_history = PrevWorkHistory.find(params[:id])

    respond_to do |format|
      if @prev_work_history.update_attributes(params[:prev_work_history])
        format.html { redirect_to(@prev_work_history, :notice => 'PrevWorkHistory was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @prev_work_history.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /prev_work_histories/1
  # DELETE /prev_work_histories/1.xml
  def destroy
    @prev_work_history = PrevWorkHistory.find(params[:id])
    @prev_work_history.destroy

    respond_to do |format|
      format.html { redirect_to(prev_work_histories_url) }
      format.xml  { head :ok }
    end
  end
end
