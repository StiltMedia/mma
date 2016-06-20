class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :secret_code, on: :create, format: { with: /\Asupersonic123||lightspeed123\z/, message: "not recognized" }
end
