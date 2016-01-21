class TtcommentsController < ApplicationController
  before_action :set_ttcomment, only: [:show, :edit, :update, :destroy]

  # GET /ttcomments
  # GET /ttcomments.json
  def index
    @ttcomments = Ttcomment.all
  end

  # GET /ttcomments/1
  # GET /ttcomments/1.json
  def show
  end

  # GET /ttcomments/new
  def new
    @ttcomment = Ttcomment.new
  end

  # GET /ttcomments/1/edit
  def edit
  end

  # POST /ttcomments
  # POST /ttcomments.json
  def create
    @ttcomment = Ttcomment.new(ttcomment_params)

    respond_to do |format|
      if @ttcomment.save
        format.html { redirect_to :back, notice: 'Comment added' }
        format.json { render :show, status: :created, location: @ttcomment }
      else
        format.html { render :new }
        format.json { render json: @ttcomment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ttcomments/1
  # PATCH/PUT /ttcomments/1.json
  def update
    respond_to do |format|
      if @ttcomment.update(ttcomment_params)
        format.html { redirect_to @ttcomment, notice: 'Ttcomment was successfully updated.' }
        format.json { render :show, status: :ok, location: @ttcomment }
      else
        format.html { render :edit }
        format.json { render json: @ttcomment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ttcomments/1
  # DELETE /ttcomments/1.json
  def destroy
    @ttcomment.destroy
    respond_to do |format|
      format.html { redirect_to ttcomments_url, notice: 'Ttcomment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ttcomment
      @ttcomment = Ttcomment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ttcomment_params
      params.require(:ttcomment).permit(:user_id, :ttcomment, :thinktank_id)
    end
end
