require 'test_helper'

class EducationHistoriesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:education_histories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create education_history" do
    assert_difference('EducationHistory.count') do
      post :create, :education_history => { }
    end

    assert_redirected_to education_history_path(assigns(:education_history))
  end

  test "should show education_history" do
    get :show, :id => education_histories(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => education_histories(:one).to_param
    assert_response :success
  end

  test "should update education_history" do
    put :update, :id => education_histories(:one).to_param, :education_history => { }
    assert_redirected_to education_history_path(assigns(:education_history))
  end

  test "should destroy education_history" do
    assert_difference('EducationHistory.count', -1) do
      delete :destroy, :id => education_histories(:one).to_param
    end

    assert_redirected_to education_histories_path
  end
end
