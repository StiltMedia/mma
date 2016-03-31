class SpecialsController < ApplicationController
  before_action :set_special, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @specials = Special.all
  end

  def show
  end

  def new
    @special = Special.new(restaurant_id: params[:rid])
    # @restaurant = Restaurant.find(params[:rid])
  end

  def edit
    @restaurant = Restaurant.find(params[:rid])
  end

  def create
    @special = Special.new(special_params)
    @special.picture = params[:special][:picture].read if params[:special][:picture]
    respond_to do |format|
      if @special.save
        format.html { redirect_to @special, notice: 'Special was successfully created.' }
        format.json { render :show, status: :created, location: @special }
      else
        format.html { render :new }
        format.json { render json: @special.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @special.update(special_params)
        format.html { redirect_to @special, notice: 'Special was successfully updated.' }
        format.json { render :show, status: :ok, location: @special }
      else
        format.html { render :edit }
        format.json { render json: @special.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @special.destroy
    respond_to do |format|
      format.html { redirect_to specials_url, notice: 'Special was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def show_picture
    @special = Special.find(params[:id])
    @special.picture = (open("app/assets/images/specials/s_image_#{rand(1..3)}.png", 'rb') { |f| f.read }) if ! @special.picture
    send_data @special.picture, :type => 'image/jpg',:disposition => 'inline'
  end


  private

  def set_special
    @special = Special.find(params[:id])
  end

  def special_params
    params.require(:special).permit(:special, :title, :picture, :restaurant_id, :sdate)
  end
end
