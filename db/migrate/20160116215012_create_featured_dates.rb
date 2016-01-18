class CreateFeaturedDates < ActiveRecord::Migration
  def change
    create_table :featured_dates do |t|
      t.timestamp :date
      t.references :special, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
