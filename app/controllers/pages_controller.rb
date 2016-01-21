class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:account_home, :edit_profile]
  def landing
    if user_signed_in?
      redirect_to pages_account_home_path
    else
      redirect_to pages_login_path
    end
  end

  def login
  end

  def account_home
  end

  def edit_profile
  end
end
