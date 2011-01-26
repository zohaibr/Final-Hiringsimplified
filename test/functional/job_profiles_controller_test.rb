require 'test_helper'

class JobProfilesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:job_profiles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create job_profile" do
    assert_difference('JobProfile.count') do
      post :create, :job_profile => { }
    end

    assert_redirected_to job_profile_path(assigns(:job_profile))
  end

  test "should show job_profile" do
    get :show, :id => job_profiles(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => job_profiles(:one).to_param
    assert_response :success
  end

  test "should update job_profile" do
    put :update, :id => job_profiles(:one).to_param, :job_profile => { }
    assert_redirected_to job_profile_path(assigns(:job_profile))
  end

  test "should destroy job_profile" do
    assert_difference('JobProfile.count', -1) do
      delete :destroy, :id => job_profiles(:one).to_param
    end

    assert_redirected_to job_profiles_path
  end
end
