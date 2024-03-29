class RcommentsController < ApplicationController
  before_action :set_rcomment, only: [:show, :edit, :update, :destroy]

  # GET /rcomments
  # GET /rcomments.json
  def index
    @rcomments = Rcomment.all
  end

  # GET /rcomments/1
  # GET /rcomments/1.json
  def show
  end

  # GET /rcomments/new
  def new
    @rcomment = Rcomment.new
  end

  # GET /rcomments/1/edit
  def edit
  end

  # POST /rcomments
  # POST /rcomments.json
  def create
    @rcomment = Rcomment.new(rcomment_params)

    respond_to do |format|
      if @rcomment.save
        format.html { redirect_to :back, notice: 'Comment added.' }
        format.json { render :show, status: :created, location: @rcomment }
      else
        format.html { render :new }
        format.json { render json: @rcomment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /rcomments/1
  # PATCH/PUT /rcomments/1.json
  def update
    respond_to do |format|
      if @rcomment.update(rcomment_params)
        format.html { redirect_to @rcomment, notice: 'Rcomment was successfully updated.' }
        format.json { render :show, status: :ok, location: @rcomment }
      else
        format.html { render :edit }
        format.json { render json: @rcomment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rcomments/1
  # DELETE /rcomments/1.json
  def destroy
    @rcomment.destroy
    respond_to do |format|
      format.html { redirect_to rcomments_url, notice: 'Rcomment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rcomment
      @rcomment = Rcomment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def rcomment_params
      params.require(:rcomment).permit(:rcomment, :user_id, :recap_id)
    end
end
