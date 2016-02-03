class RestaurantProductsController < ApplicationController
  before_action :set_restaurant_product, only: [:show, :edit, :update, :destroy]

  # GET /restaurant_products
  # GET /restaurant_products.json
  def index
    @restaurant_products = RestaurantProduct.all
  end

  # GET /restaurant_products/1
  # GET /restaurant_products/1.json
  def show
  end

  # GET /restaurant_products/new
  def new
    @restaurant_product = RestaurantProduct.new
  end

  # GET /restaurant_products/1/edit
  def edit
  end

  # POST /restaurant_products
  # POST /restaurant_products.json
  def create
    @restaurant_product = RestaurantProduct.new(restaurant_product_params)

    respond_to do |format|
      if @restaurant_product.save
        format.html { redirect_to @restaurant_product, notice: 'Restaurant product was successfully created.' }
        format.json { render :show, status: :created, location: @restaurant_product }
      else
        format.html { render :new }
        format.json { render json: @restaurant_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /restaurant_products/1
  # PATCH/PUT /restaurant_products/1.json
  def update
    respond_to do |format|
      if @restaurant_product.update(restaurant_product_params)
        format.html { redirect_to @restaurant_product, notice: 'Restaurant product was successfully updated.' }
        format.json { render :show, status: :ok, location: @restaurant_product }
      else
        format.html { render :edit }
        format.json { render json: @restaurant_product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaurant_products/1
  # DELETE /restaurant_products/1.json
  def destroy
    @restaurant_product.destroy
    respond_to do |format|
      format.html { redirect_to restaurant_products_url, notice: 'Restaurant product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant_product
      @restaurant_product = RestaurantProduct.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def restaurant_product_params
      params.require(:restaurant_product).permit(:restaurant_id, :product_id)
    end
end
