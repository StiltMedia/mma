require 'rails_helper'

# As a chef or admin
# when I login
# and visit a restarant page
# Then I can edit any of the predifined specials

RSpec.feature "Chef visits a restarant page" do
  scenario "they should be able to edit the specials" do
    user = create(:user, :chef_role)
    restaurant = create(:restaurant)


    sign_in_with user
    select_restaurant restaurant
    click_on 'seek_fwd'
    click_on 'seek_bwd'
    click_on 'Oysters'


    expect(page).to have_css '#edit-special'
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
