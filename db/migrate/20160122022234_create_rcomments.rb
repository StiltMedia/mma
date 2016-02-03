class CreateRcomments < ActiveRecord::Migration
  def change
    create_table :rcomments do |t|
      t.text :rcomment
      t.references :user, index: true, foreign_key: true
      t.references :recap, index: true, foreign_key: true

      t.timestamps null: false
    end
  end

  def data
    Recap.all.each do |recap|
      rand(1..3).times do
        recap.rcomments << Rcomment.new(rcomment: Faker::Hipster.paragraphs(rand(1..6)).join("\n"),
          user_id: User.all.sample(1)[0].id)
      end
    end
  end
end
