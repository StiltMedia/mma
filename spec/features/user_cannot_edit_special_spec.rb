require 'rails_helper'

# As a user
# when I login
# and visit a restarant page
# Then I cannot edit any of the specials

RSpec.feature "User visits a restarant page" do
  scenario "they should not be able to edit the specials" do
    user = create(:user, :default)
    restaurant = create(:restaurant)


    sign_in_with user
    select_restaurant restaurant
    click_on 'seek_fwd'
    click_on 'seek_bwd'
    click_on 'Oysters'


    expect(page).to have_css '#no-edit-special'
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
    click_on special.title
  end
end
