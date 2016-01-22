class ThinktanksController < ApplicationController
  before_action :set_thinktank, only: [:show, :edit, :update, :destroy]

  # GET /thinktanks
  # GET /thinktanks.json
  def index
    @thinktanks = Thinktank.all
  end

  # GET /thinktanks/1
  # GET /thinktanks/1.json
  def show
    @thinktank = Thinktank.find(params[:id])
    @is_owner = true if @thinktank.user_id == current_user.id
  end

  # GET /thinktanks/new
  def new
    @thinktank = Thinktank.new
  end

  # GET /thinktanks/1/edit
  def edit
  end

  # POST /thinktanks
  # POST /thinktanks.json
  def create
    @thinktank = Thinktank.new(thinktank_params)

    respond_to do |format|
      if @thinktank.save
        format.html { redirect_to @thinktank, notice: 'Thinktank was successfully created.' }
        format.json { render :show, status: :created, location: @thinktank }
      else
        format.html { render :new }
        format.json { render json: @thinktank.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /thinktanks/1
  # PATCH/PUT /thinktanks/1.json
  def update
    if params[:thinktank][:picture].present?
      @thinktank.picture = params[:thinktank][:picture].read
      @thinktank.save
      redirect_to :back and return
    end

    respond_to do |format|
      if @thinktank.update(thinktank_params)
        format.html { redirect_to @thinktank, notice: 'Thinktank was successfully updated.' }
        format.json { render :show, status: :ok, location: @thinktank }
      else
        format.html { render :edit }
        format.json { render json: @thinktank.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /thinktanks/1
  # DELETE /thinktanks/1.json
  def destroy
    @thinktank.destroy
    respond_to do |format|
      format.html { redirect_to thinktanks_url, notice: 'Deleted.' }
      format.json { head :no_content }
    end
  end

  def show_picture
    @thinktank = Thinktank.find(params[:id])
    @thinktank.picture = (open('app/assets/images/thinktank-1.jpg', 'rb') { |f| f.read }) if ! @thinktank.picture
    send_data @thinktank.picture, :type => 'image/jpg',:disposition => 'inline'
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_thinktank
      @thinktank = Thinktank.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def thinktank_params
      params.require(:thinktank).permit(:title, :user_id, :thinktank, :picture)
    end
end
