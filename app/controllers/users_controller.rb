class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    require 'rmagick'
    if params[:user].keys == ["picture"]
      @user.mimetype = params[:user][:picture].content_type
      @user.picture = params[:user][:picture].read
      @user.save
      @user = User.find(@user.id)
      picture = Magick::Image.from_blob(@user.picture)[0]
      picture.auto_orient!
      picture.resize_to_fit!(300, 300)
      @user.picture = picture.to_blob
      @user.save
      redirect_to :back and return
    end
    (params[:user].delete("password") if params[:user][:password].blank?) rescue nil
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to pages_edit_profile_path, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { redirect_to pages_edit_profile_path, notice: 'Unprocessable entity' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  #def update
  #  if params[:user][:picture].present?
  #    @user.picture = params[:user][:picture].read
  #    @user.save
  #    redirect_to pages_edit_profile_path and return
  #  end
  #  users_params = user_params.except(:password) if params[:user][:password].blank?
  #  if params[:user][:password].blank?
  #    retval = @user.update(user_params.except(:password))
  #  else
  #    retval = @user.update(user_params)
  #  end
  #  respond_to do |format|
  #    if retval
  #      sign_in(@user, :bypass => true)
  #      format.html { redirect_to pages_edit_profile_path, notice: 'User was successfully updated.' }
  #      format.json { render :show, status: :ok, location: @user }
  #    else
  #      format.html { redirect_to pages_edit_profile_path, notice: 'Unprocessable entity' }
  #      format.json { render json: @user.errors, status: :unprocessable_entity }
  #    end
  #  end
  #end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def show_picture
    @user = User.find(params[:id])
    @user.picture = (open('app/assets/images/chef-1.jpg', 'rb') { |f| f.read }) if ! @user.picture
    mimetype = @user.mimetype
    mimetype = "image/jpg" if @user.mimetype.blank?
    send_data @user.picture, :type => mimetype ,:disposition => 'inline'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :picture)
    end
end
