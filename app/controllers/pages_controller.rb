class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:account_home, :edit_profile, :restaurants, :search]
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
    @user = User.find(current_user.id)
  end

  def search
    @search_results = []
    @recaps = Recap.where("recap LIKE ?","%#{params[:q]}%")
    @specials = Special.where("special LIKE ? OR title LIKE ?","%#{params[:q]}%","%#{params[:q]}%")
    @thinktanks = Thinktank.where("thinktank LIKE ? OR title LIKE ?","%#{params[:q]}%","%#{params[:q]}%")
    @recaps.each do |recap|
      @search_results << recap
    end
    @specials.each do |special|
      @search_results << special
    end
    @thinktanks.each do |thinktank|
      @search_results << thinktank
    end
  end

  def calendar
    @sel_date = Time.zone.now().to_i
    if params[:sel_date].present?
      @sel_date = Time.at(params[:sel_date].to_i)
    end
  end
end
