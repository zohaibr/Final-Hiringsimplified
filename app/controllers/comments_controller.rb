class CommentsController < ApplicationController
  filter_access_to :all
  # GET /comments
  # GET /comments.xml
  def get_comments
    @comments = Comment.find_all_by_interview_id params[:int_id]
    render :partial => "comments"
  end

  def get_comment_by_user
    @comments = Comment.find_all_by_interview_id_and_user_id params[:int_id], params[:user_id]
    render :partial => "user_comments"
  end

  def get_user_comments

    @comment = Comment.find(:first, :conditions => ["candidate_id = ? AND interview_id = ? AND user_id = ?",params[:cid],params[:id],params[:uid]])
    render :text=> @comment.comment
  end
  # GET /comments/1
  # GET /comments/1.xml
  def show
    @comment = Comment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @comment }
    end
  end

  # GET /comments/new
  # GET /comments/new.xml
  def new
    @comment = Comment.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @comment }
    end
  end

  # GET /comments/1/edit
  def edit
    @comment = Comment.find(params[:id])
  end

  # POST /comments
  # POST /comments.xml
  def create
    @comment = Comment.new(params[:comment])
    if @comment.save
      @flag = "true"
      return if request.xhr?
      render :nothing => true
    else
      return if request.xhr?
      @flag = "false"
      render :nothing => true
    end
    #    respond_to do |format|
    #      if @comment.save
    #        format.html { redirect_to(@comment, :notice => 'Comment was successfully created.') }
    #        format.xml  { render :xml => @comment, :status => :created, :location => @comment }
    #      else
    #        format.html { render :action => "new" }
    #        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
    #      end
    #    end
  end

  # PUT /comments/1
  # PUT /comments/1.xml
  def update
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to(@comment, :notice => 'Comment was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.xml
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to(comments_url) }
      format.xml  { head :ok }
    end
  end

  def update_comment
    @already_exist = Comment.find(:first, :conditions => ["candidate_id = ? AND interview_id = ? AND user_id = ?",session[:default_candidate],session[:int_id],current_user.id])
    if @already_exist.blank?
      @comment = Comment.new
      @comment.candidate_id = session[:default_candidate]
      @comment.interview_id = session[:int_id]
      @comment.user_id = current_user.id
      @comment.comment = params[:comment]
      @comment.save
      else
        @already_exist.comment = params[:comment]
        @already_exist.save
    end

    
      render :nothing => true

  end
end
