class InventoryChecksController < ApplicationController
  before_action :set_inventory_check, only: [:show, :edit, :update, :destroy]

  # GET /inventory_checks
  # GET /inventory_checks.json
  def index
    @inventory_checks = InventoryCheck.all
  end

  # GET /inventory_checks/1
  # GET /inventory_checks/1.json
  def show
  end

  # GET /inventory_checks/new
  def new
    @inventory_check = InventoryCheck.new
  end

  # GET /inventory_checks/1/edit
  def edit
  end

  # POST /inventory_checks
  # POST /inventory_checks.json
  def create
    @inventory_check = InventoryCheck.new(inventory_check_params)

    respond_to do |format|
      if @inventory_check.save
        format.html { redirect_to @inventory_check, notice: 'Inventory check was successfully created.' }
        format.json { render :show, status: :created, location: @inventory_check }
      else
        format.html { render :new }
        format.json { render json: @inventory_check.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /inventory_checks/1
  # PATCH/PUT /inventory_checks/1.json
  def update
    respond_to do |format|
      if @inventory_check.update(inventory_check_params)
        format.html { redirect_to @inventory_check, notice: 'Inventory check was successfully updated.' }
        format.json { render :show, status: :ok, location: @inventory_check }
      else
        format.html { render :edit }
        format.json { render json: @inventory_check.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /inventory_checks/1
  # DELETE /inventory_checks/1.json
  def destroy
    @inventory_check.destroy
    respond_to do |format|
      format.html { redirect_to inventory_checks_url, notice: 'Inventory check was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inventory_check
      @inventory_check = InventoryCheck.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def inventory_check_params
      params.require(:inventory_check).permit(:quantity, :idate, :restaurant_id, :product_id)
    end
end
