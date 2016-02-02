class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = Restaurant.all
    redirect_to "/pages/restaurants"
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    if session[:seek_date]
      @seek_date = session[:seek_date]
    else
      session[:seek_date] = Time.zone.now().to_i
      @seek_date = session[:seek_date]
    end

    @recap_pending = nil
    @recap_pending = true if @restaurant.recaps.where(rdate: Time.at(session[:seek_date]).midnight-1.day..Time.at(session[:seek_date]).midnight).all.size == 0
    @todays_recap = @restaurant.recaps.where(rdate: Time.at(session[:seek_date]).midnight-1.day..Time.at(session[:seek_date]).midnight).all.last if @restaurant.recaps.where(rdate: Time.at(session[:seek_date]).midnight-1.day..Time.at(session[:seek_date]).midnight).all.size > 0

    #@inventory_pending = nil
    #@inventory_pending = true if @restaurant.inventories.where(updated_at: Time.at(session[:seek_date]).midnight-1.day..Time.at(session[:seek_date]).midnight).all.size == 0
  end

  # GET /restaurants/new
  def new
    @restaurant = Restaurant.new
  end

  # GET /restaurants/1/edit
  def edit
  end

  # POST /restaurants
  # POST /restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)

    respond_to do |format|
      if @restaurant.save
        format.html { redirect_to @restaurant, notice: 'Restaurant was successfully created.' }
        format.json { render :show, status: :created, location: @restaurant }
      else
        format.html { render :new }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /restaurants/1
  # PATCH/PUT /restaurants/1.json
  def update
    respond_to do |format|
      if @restaurant.update(restaurant_params)
        format.html { redirect_to @restaurant, notice: 'Restaurant was successfully updated.' }
        format.json { render :show, status: :ok, location: @restaurant }
      else
        format.html { render :edit }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaurants/1
  # DELETE /restaurants/1.json
  def destroy
    @restaurant.destroy
    respond_to do |format|
      format.html { redirect_to restaurants_url, notice: 'Restaurant was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # pushes date back by one
  def seek_bwd
    session[:seek_date] = (Time.at(session[:seek_date]) - 1.day ).to_i
    redirect_to :back
  end

  # pushes date forward by one
  def seek_bwd
    session[:seek_date] = (Time.at(session[:seek_date]) + 1.day ).to_i
    redirect_to :back
  end

  def seek
    session[:seek_date] = Time.strptime( params[:seek_date],"%Y-%m-%d").to_i
    render json: { status: "ok" }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def restaurant_params
      params[:restaurant]
    end
end
