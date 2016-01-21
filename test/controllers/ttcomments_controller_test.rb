require 'test_helper'

class TtcommentsControllerTest < ActionController::TestCase
  setup do
    @ttcomment = ttcomments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ttcomments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ttcomment" do
    assert_difference('Ttcomment.count') do
      post :create, ttcomment: { thinktank_id: @ttcomment.thinktank_id, ttcomment: @ttcomment.ttcomment, user_id: @ttcomment.user_id }
    end

    assert_redirected_to ttcomment_path(assigns(:ttcomment))
  end

  test "should show ttcomment" do
    get :show, id: @ttcomment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @ttcomment
    assert_response :success
  end

  test "should update ttcomment" do
    patch :update, id: @ttcomment, ttcomment: { thinktank_id: @ttcomment.thinktank_id, ttcomment: @ttcomment.ttcomment, user_id: @ttcomment.user_id }
    assert_redirected_to ttcomment_path(assigns(:ttcomment))
  end

  test "should destroy ttcomment" do
    assert_difference('Ttcomment.count', -1) do
      delete :destroy, id: @ttcomment
    end

    assert_redirected_to ttcomments_path
  end
end
