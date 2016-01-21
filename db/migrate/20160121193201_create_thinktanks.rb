class CreateThinktanks < ActiveRecord::Migration
  def change
    create_table :thinktanks do |t|
      t.string :title
      t.references :user, index: true, foreign_key: true
      t.text :thinktank
      t.binary :picture

      t.timestamps null: false
    end
  end

  def data
    byebug
      20.times do
      random_user_id = User.all.sample(1)[0].id
      Thinktank.create!(title: Faker::Commerce.product_name, thinktank: Faker::Hipster.paragraphs(rand(2..5)),
        user_id: random_user_id, picture: (open('app/assets/images/chef-1.jpg', 'rb') { |f| f.read })  )
    end
  end
end
