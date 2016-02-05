# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160205064243) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "inventory_checks", force: :cascade do |t|
    t.integer  "quantity"
    t.datetime "idate"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "restaurant_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rcomments", force: :cascade do |t|
    t.text     "rcomment"
    t.integer  "user_id"
    t.integer  "recap_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "rcomments", ["recap_id"], name: "index_rcomments_on_recap_id", using: :btree
  add_index "rcomments", ["user_id"], name: "index_rcomments_on_user_id", using: :btree

  create_table "recaps", force: :cascade do |t|
    t.text     "recap"
    t.integer  "user_id"
    t.integer  "restaurant_id"
    t.datetime "rdate"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "recaps", ["restaurant_id"], name: "index_recaps_on_restaurant_id", using: :btree
  add_index "recaps", ["user_id"], name: "index_recaps_on_user_id", using: :btree

  create_table "restaurant_products", force: :cascade do |t|
    t.integer  "restaurant_id"
    t.integer  "product_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "restaurant_products", ["product_id"], name: "index_restaurant_products_on_product_id", using: :btree
  add_index "restaurant_products", ["restaurant_id"], name: "index_restaurant_products_on_restaurant_id", using: :btree

  create_table "restaurants", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "specials", force: :cascade do |t|
    t.text     "special"
    t.string   "title"
    t.binary   "picture"
    t.integer  "restaurant_id"
    t.datetime "sdate"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "specials", ["restaurant_id"], name: "index_specials_on_restaurant_id", using: :btree

  create_table "thinktanks", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.text     "thinktank"
    t.binary   "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "thinktanks", ["user_id"], name: "index_thinktanks_on_user_id", using: :btree

  create_table "ttcomments", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "ttcomment"
    t.integer  "thinktank_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "ttcomments", ["thinktank_id"], name: "index_ttcomments_on_thinktank_id", using: :btree
  add_index "ttcomments", ["user_id"], name: "index_ttcomments_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.binary   "picture"
    t.string   "secret_code"
    t.string   "mimetype"
    t.boolean  "admin"
    t.datetime "deleted_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "rcomments", "recaps"
  add_foreign_key "rcomments", "users"
  add_foreign_key "recaps", "restaurants"
  add_foreign_key "recaps", "users"
  add_foreign_key "restaurant_products", "products"
  add_foreign_key "restaurant_products", "restaurants"
  add_foreign_key "specials", "restaurants"
  add_foreign_key "thinktanks", "users"
  add_foreign_key "ttcomments", "thinktanks"
  add_foreign_key "ttcomments", "users"
end
