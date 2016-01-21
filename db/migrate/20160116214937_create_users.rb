class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.string :first_name
      t.string :last_name
      t.timestamps null: false
    end
  end

  def data
    User.create!(email: "mma.staging.01@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+alex@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+bob@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+chris@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+donald@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+elvis@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+frank@gmail.com", password: "password")
    User.create!(email: "mma.staging.01+george@gmail.com", password: "password")
  end
end
