class CreateTtcomments < ActiveRecord::Migration
  def change
    create_table :ttcomments do |t|
      t.references :user, index: true, foreign_key: true
      t.text :ttcomment
      t.references :thinktank, index: true, foreign_key: true

      t.timestamps null: false
    end
  end

  def data
    # NOSEEDS rand(1..20).times do
    # NOSEEDS   Ttcomment.create!(ttcomment: Faker::Hipster.sentences(rand(1..10)).join(" "),
    # NOSEEDS     user_id: User.all.sample(1)[0].id,
    # NOSEEDS     thinktank_id: Thinktank.all.sample(1)[0].id
    # NOSEEDS   )
    # NOSEEDS end
  end
end
