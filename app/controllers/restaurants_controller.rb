class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  skip_before_filter :verify_authenticity_token, :only => [:seek]

  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = Restaurant.all
    redirect_to "/pages/restaurants"
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    logger.debug "DB8 99 show() session id was #{session.id}"
    if session[:seek_date]
      @seek_date = session[:seek_date]
    else
      session[:seek_date] = Time.zone.now().to_i
      @seek_date = session[:seek_date]
    end
    logger.debug "DB8 session[:seek_date] was #{session[:seek_date]} @seek_date was #{@seek_date}"
    @recap_pending = nil
    @recap_pending = true if @restaurant.recaps.where(rdate: Time.zone.at(@seek_date).midnight-1.day..Time.zone.at(@seek_date).midnight).all.size == 0
    @todays_recap = @restaurant.recaps.where(rdate: Time.zone.at(@seek_date).midnight-1.day..Time.zone.at(@seek_date).midnight).all.last if @restaurant.recaps.where(rdate: Time.zone.at(@seek_date).midnight-1.day..Time.zone.at(@seek_date).midnight).all.size > 0
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
    session[:seek_date] = (Time.zone.at(session[:seek_date]) - 1.day ).to_i
    redirect_to :back
  end

  # pushes date forward by one
  def seek_fwd
    session[:seek_date] = (Time.zone.at(session[:seek_date]) + 1.day ).to_i
    redirect_to :back
  end

  def seek
    logger.debug "DB8 99 seek() session id was #{session.id}"
    logger.debug "DB8 before session seek_date #{session[:seek_date]}"
    session[:seek_date] = Time.strptime( params[:seek_date],"%Y-%m-%d").to_i
    logger.debug "DB8 after #{session[:seek_date]}"
    render json: { status: "ok" }
  end

  # does almost same as above method
  def seek_n_show
    session[:seek_date] = Time.strptime( params[:seek_date],"%Y-%m-%d").to_i
    redirect_to restaurant_path( Restaurant.find(params[:id]) )
  end

  def inventory
    @restaurant = Restaurant.find(params[:id])
    session[:seek_date] = Time.zone.parse(params[:seek_date]) if params[:seek_date].present?
    RestaurantProduct.where(restaurant_id: @restaurant.id).all.each do |rp|
      puts "DB8 rp #{rp.id} has #{InventoryCheck.where("quantity > -1 AND restaurant_product_id = ?",rp.id).all.size} filled ICs"
    end

    # gap filling
    logger.debug "DB8 Gap filling"
    RestaurantProduct.where(restaurant_id: @restaurant.id).all.each do |rp|
      range_start = session[:seek_date].midnight
      range_end = (session[:seek_date]+1.day).midnight
      available = InventoryCheck.where("restaurant_product_id = ? AND quantity > -1",rp.id).where(idate: range_start..range_end ).all.size
      if available == 0
        puts "DB8 filling #{rp.id} #{Time.zone.at(session[:seek_date])}"
        InventoryCheck.create( restaurant_product_id: rp.id, quantity: -1, idate: Time.zone.at(session[:seek_date]) )
      end
    end

    if params[:new_restaurant_product].present?
      product = Product.create( name: params[:new_restaurant_product])
      restaurant_product = RestaurantProduct.create(product_id: product.id, restaurant_id: @restaurant.id)
      InventoryCheck.create( restaurant_product_id: restaurant_product.id, quantity: 0, idate: Time.zone.at(session[:seek_date]) )
      redirect_to restaurant_path(@restaurant)+"/inventory/"+params[:seek_date]
    end
    
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
