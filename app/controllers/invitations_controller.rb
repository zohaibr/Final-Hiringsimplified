class InvitationsController < ApplicationController
  filter_access_to :all
  layout "main"
  # GET /invitations
  # GET /invitations.xml
  def index
    @invitations = Invitation.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @invitations }
    end
  end

  # GET /invitations/1
  # GET /invitations/1.xml
  def show
    @invitation = Invitation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @invitation }
    end
  end

  # GET /invitations/new
  # GET /invitations/new.xml
  def new
    @invitation = Invitation.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @invitation }
    end
  end

  # GET /invitations/1/edit
  def edit
    @invitation = Invitation.find(params[:id])
  end

  # POST /invitations
  # POST /invitations.xml
  def create
    @invitation = Invitation.new(params[:invitation])

    respond_to do |format|
      if @invitation.save
        format.html { redirect_to(@invitation, :notice => 'Invitation was successfully created.') }
        format.xml  { render :xml => @invitation, :status => :created, :location => @invitation }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @invitation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /invitations/1
  # PUT /invitations/1.xml
  def update
    @invitation = Invitation.find(params[:id])

    respond_to do |format|
      if @invitation.update_attributes(params[:invitation])
        format.html { redirect_to(@invitation, :notice => 'Invitation was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @invitation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /invitations/1
  # DELETE /invitations/1.xml
  def destroy
    @invitation = Invitation.find(params[:id])
    @invitation.destroy

    respond_to do |format|
      format.html { redirect_to(invitations_url) }
      format.xml  { head :ok }
    end
  end

  # Invitations Form for Interviews
  def invitations_form
    interview =  Interview.find(params[:interview_id])
    @published = interview.published
    pckg = UserPackage.find(:first, :conditions => ["user_id = ? OR user_id = ?", current_user.id, current_user.parent_id])

     
    @all_invitations = Invitation.find(:all,:conditions => ["user_id = ? AND status = 0",current_user.id])
    dur = 0.0

    @all_invitations.each do |invitation|

      
      if (Time.new.day - invitation.created_at.day) <= 10

         mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", invitation.interview_id])
         secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", invitation.interview_id])

         m1 = secs/60.to_f
         m1 = m1/60.to_f

         m2 = mins/60.to_f

        dur = dur + (m1 + m2)

      end

    end

    @time_left = dur
    @total_time = pckg.time_left
    @interview_id = params[:interview_id]
    render :partial => "invitations_form"

    
  end

  def send_invitations
    @company = current_user.company_name unless current_user.company_name.blank?

        mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", params[:invitation][:interview_id]])
        secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", params[:invitation][:interview_id]])

        m1 = secs/60.to_f
        m1 = m1/60.to_f

        m2 = mins/60.to_f

        @int_duration = m2+m1

    candi_count = 0

    params[:invitation][:candidate_email].each do |email_id|
      unless email_id.blank?
          candi_count = candi_count +1
      end

    end

    pckg = UserPackage.find(:first, :conditions => ["user_id = ? OR user_id = ?", current_user.id, current_user.parent_id])

    @all_invitations = Invitation.find(:all,:conditions => ["user_id = ? AND status = 0",current_user.id])
    dur = 0.0

    @all_invitations.each do |invitation|


      if (Time.new.day - invitation.created_at.day) <= 10

         mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", invitation.interview_id])
         secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", invitation.interview_id])

         m1 = secs/60.to_f
         m1 = m1/60.to_f

         m2 = mins/60.to_f

        dur = dur + (m1 + m2)

      end

    end

    if (pckg.time_left - dur) - (@int_duration * candi_count)

      params[:invitation][:candidate_email].each do |email_id|
      unless email_id.blank?
        if pckg.time_left < @int_duration
            msg = "unable to send emails to all users because you do not have more time"
            break
        end
        int_exist = Invitation.find_by_candidate_email_and_interview_id email_id.to_s,params[:invitation][:interview_id]

          unless int_exist.blank?
          else
            @invitation = Invitation.new(params[:invitation])
            @invitation.status = false
            @invitation.candidate_email = email_id.to_s
            @invitation.save
            @email = Notifier.deliver_invitation(email_id,@company)

          end
        
       end

    end
    else
      msg = "unable to send emails to all users because you do not have more time"
    end


    @all_invitations = Invitation.find(:all,:conditions => ["user_id = ? AND status = 0",current_user.id])
    dur = 0.0

    @all_invitations.each do |invitation|


      if (Time.new.day - invitation.created_at.day) <= 10

         mins = Questionare.sum(:time_min, :conditions => ["interview_id = ?", invitation.interview_id])
         secs = Questionare.sum(:time_sec, :conditions => ["interview_id = ?", invitation.interview_id])

         m1 = secs/60.to_f
         m1 = m1/60.to_f

         m2 = mins/60.to_f

        dur = dur + (m1 + m2)

      end

    end

    render :partial => "int_results"  ,:locals => {:time_left => dur,:total_time=>pckg.time_left,:msg=>msg,:interview_id =>params[:invitation][:interview_id]}
   # render :nothing => true
  end

  def get_invitations
    @invitations = Invitation.find_all_by_interview_id(params[:id])
    unless @invitations.blank?
      render :partial => "get_invitations"
    else
      render :text => "No Record Found"
    end
    
  end
end
