class RegistrationsController < Devise::RegistrationsController

  def create
    if params[:user][:secret_code] == 'lightspeed123'
      params[:user][:chef] = true
    end

    super
  end

  def sign_up_params
    params.require(:user).permit(:secret_code, :chef, :first_name, :last_name, :email, :password, :password_confirmation)
  end
end
