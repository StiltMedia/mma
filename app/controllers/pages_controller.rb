class PagesController < ApplicationController

  def landing
    redirect_to pages_login_path
  end

  def login
  end

  def home
  end
end
