require 'test_helper'

class RcommentsControllerTest < ActionController::TestCase
  setup do
    @rcomment = rcomments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:rcomments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create rcomment" do
    assert_difference('Rcomment.count') do
      post :create, rcomment: { rcomment: @rcomment.rcomment, recap_id: @rcomment.recap_id, user_id: @rcomment.user_id }
    end

    assert_redirected_to rcomment_path(assigns(:rcomment))
  end

  test "should show rcomment" do
    get :show, id: @rcomment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @rcomment
    assert_response :success
  end

  test "should update rcomment" do
    patch :update, id: @rcomment, rcomment: { rcomment: @rcomment.rcomment, recap_id: @rcomment.recap_id, user_id: @rcomment.user_id }
    assert_redirected_to rcomment_path(assigns(:rcomment))
  end

  test "should destroy rcomment" do
    assert_difference('Rcomment.count', -1) do
      delete :destroy, id: @rcomment
    end

    assert_redirected_to rcomments_path
  end
end
