class CandidatesController < ApplicationController
   layout "main"
  # GET /candidates
  # GET /candidates.xml
  def index
    @candidates = Candidate.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @candidates }
    end
  end

  # GET /candidates/1
  # GET /candidates/1.xml
  def show
    @candidate = Candidate.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @candidate }
    end
  end

  # GET /candidates/new
  # GET /candidates/new.xml
  def new
    @candidate = Candidate.new
    @candidate.education_histories.build
    @candidate.prev_work_histories.build
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @candidate }
    end
  end

  # GET /candidates/1/edit
  def edit
    @candidate = Candidate.find(session[:user_id])
  end

  # POST /candidates
  # POST /candidates.xml
  def create
    @candidate = Candidate.new(params[:candidate])
    
    respond_to do |format|
      if @candidate.save
        format.html { redirect_to :controller => "interviews", :action => "interviews_list", :c_id => session[:c_id]}
        format.xml  { render :xml => @candidate, :status => :created, :location => @candidate }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @candidate.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /candidates/1
  # PUT /candidates/1.xml
  def update
    params[:candidate][:existing_education_histories_attributes] ||= {}
    @candidate = Candidate.find(params[:id])

   
      if @candidate.update_attributes(params[:candidate])
        redirect_back_or_default('/users/profile')
      
      end
    
  end

  # DELETE /candidates/1
  # DELETE /candidates/1.xml
  def destroy
    @candidate = Candidate.find(params[:id])
    @candidate.destroy

    respond_to do |format|
      format.html { redirect_to(candidates_url) }
      format.xml  { head :ok }
    end
  end
  def send_upload uid
   # @account = Service.new()
 #   @account.debug = true
  #  @account.authenticate("info@hiringsimplified.com", "difficult")
 #   if params[:doc_id]
 #     doc = BaseObject.find(@account, {:id => params[:doc_id]})
  #    doc.content = params[:upload_file].read
  #    doc.content_type = File.extname(params[:upload_file].original_filename).gsub
 #     if doc.save
  #    flash[:notice] = 'File successfully uploaded'
  #    else
  #     flash[:warning] = 'Could not upload file!'
  #    end
   #     redirect_to :action => :view, :Doc_id => doc.id and return
   #   else
       # file = BaseObject.new(@account)
       # file.title = params[:upload_file].original_filename.gsub(/\.\w.*/,"")
       # file.content = params[:upload_file].read
       # file.content_type = File.extname(params[:upload_file].original_filename).gsub(".", "")
      #if file.save
      #  @user = User.find(uid)
      #  @user.gdoc_id = file.id
    #    @user.save
   #     flash[:notice] = 'File successfully uploaded'
   #     else
   #     flash[:warning] = 'Could not upload file!'
    #    end
        #render :text => "File successfully uploaded"
        #redirect_to :action => :index and return
    #  end
  end
end
