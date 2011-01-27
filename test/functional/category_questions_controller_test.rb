require 'test_helper'

class CategoryQuestionsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:category_questions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create category_question" do
    assert_difference('CategoryQuestion.count') do
      post :create, :category_question => { }
    end

    assert_redirected_to category_question_path(assigns(:category_question))
  end

  test "should show category_question" do
    get :show, :id => category_questions(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => category_questions(:one).to_param
    assert_response :success
  end

  test "should update category_question" do
    put :update, :id => category_questions(:one).to_param, :category_question => { }
    assert_redirected_to category_question_path(assigns(:category_question))
  end

  test "should destroy category_question" do
    assert_difference('CategoryQuestion.count', -1) do
      delete :destroy, :id => category_questions(:one).to_param
    end

    assert_redirected_to category_questions_path
  end
end
