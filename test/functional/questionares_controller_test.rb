require 'test_helper'

class QuestionaresControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:questionares)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create questionare" do
    assert_difference('Questionare.count') do
      post :create, :questionare => { }
    end

    assert_redirected_to questionare_path(assigns(:questionare))
  end

  test "should show questionare" do
    get :show, :id => questionares(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => questionares(:one).to_param
    assert_response :success
  end

  test "should update questionare" do
    put :update, :id => questionares(:one).to_param, :questionare => { }
    assert_redirected_to questionare_path(assigns(:questionare))
  end

  test "should destroy questionare" do
    assert_difference('Questionare.count', -1) do
      delete :destroy, :id => questionares(:one).to_param
    end

    assert_redirected_to questionares_path
  end
end
