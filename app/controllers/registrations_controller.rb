class RegistrationsController < Devise::RegistrationsController

  def create
    super    
  end

  def sign_up_params
    params.require(:user).permit(:secret_code, :first_name, :last_name, :email, :password, :password_confirmation)
  end


end 
