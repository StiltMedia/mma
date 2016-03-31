require 'rails_helper'

# As a user
# when I login
# and visit a restarant page
# Then I should be able to edit any of the predifined specials

RSpec.feature "User visits a restarant page" do
  scenario "they should be able to edit the specials" do
    user = create(:user)
    restaurant = create(:restaurant)
    special = create(:special)


    sign_in_with user
    select_restaurant restaurant
    select_special special

    # click on special
    # change information about special
    # save special
    # view updated changes

  end


  def sign_in_with user
    visit root_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'LOG IN'
  end

  def select_restaurant restaurant
    click_link 'RESTAURANTS'
    click_link restaurant.name
  end

  def select_special special
    save_and_open_page
    click_on special.title
    save_and_open_page
  end
end
