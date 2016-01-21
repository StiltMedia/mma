require 'test_helper'

class ThinktanksControllerTest < ActionController::TestCase
  setup do
    @thinktank = thinktanks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:thinktanks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create thinktank" do
    assert_difference('Thinktank.count') do
      post :create, thinktank: { picture: @thinktank.picture, thinktank: @thinktank.thinktank, title: @thinktank.title, user_id: @thinktank.user_id }
    end

    assert_redirected_to thinktank_path(assigns(:thinktank))
  end

  test "should show thinktank" do
    get :show, id: @thinktank
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @thinktank
    assert_response :success
  end

  test "should update thinktank" do
    patch :update, id: @thinktank, thinktank: { picture: @thinktank.picture, thinktank: @thinktank.thinktank, title: @thinktank.title, user_id: @thinktank.user_id }
    assert_redirected_to thinktank_path(assigns(:thinktank))
  end

  test "should destroy thinktank" do
    assert_difference('Thinktank.count', -1) do
      delete :destroy, id: @thinktank
    end

    assert_redirected_to thinktanks_path
  end
end
