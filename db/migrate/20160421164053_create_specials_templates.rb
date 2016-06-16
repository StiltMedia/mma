class CreateSpecialsTemplates < ActiveRecord::Migration
  def change
    create_table :specials_templates do |t|
      t.integer  :restaurant_id, index: true
      t.datetime :sdate
      t.boolean  :template_created

      t.timestamps null: false
    end
  end
end
