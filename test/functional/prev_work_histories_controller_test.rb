require 'test_helper'

class PrevWorkHistoriesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:prev_work_histories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create prev_work_history" do
    assert_difference('PrevWorkHistory.count') do
      post :create, :prev_work_history => { }
    end

    assert_redirected_to prev_work_history_path(assigns(:prev_work_history))
  end

  test "should show prev_work_history" do
    get :show, :id => prev_work_histories(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => prev_work_histories(:one).to_param
    assert_response :success
  end

  test "should update prev_work_history" do
    put :update, :id => prev_work_histories(:one).to_param, :prev_work_history => { }
    assert_redirected_to prev_work_history_path(assigns(:prev_work_history))
  end

  test "should destroy prev_work_history" do
    assert_difference('PrevWorkHistory.count', -1) do
      delete :destroy, :id => prev_work_histories(:one).to_param
    end

    assert_redirected_to prev_work_histories_path
  end
end
