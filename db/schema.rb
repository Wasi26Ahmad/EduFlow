# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2026_05_15_051246) do
  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "answers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "test_attempt_id", null: false
    t.bigint "question_id", null: false
    t.bigint "selected_option_id"
    t.text "text_answer"
    t.float "obtained_marks", default: 0.0
    t.boolean "correct", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["selected_option_id"], name: "fk_rails_9540c29a7d"
    t.index ["test_attempt_id"], name: "index_answers_on_test_attempt_id"
  end

  create_table "bulk_marks_uploads", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "teacher_id", null: false
    t.bigint "course_id", null: false
    t.string "status", default: "pending"
    t.text "rejection_reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_bulk_marks_uploads_on_course_id"
    t.index ["status", "created_at"], name: "idx_bulk_uploads_status_created"
    t.index ["teacher_id"], name: "index_bulk_marks_uploads_on_teacher_id"
  end

  create_table "coupons", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "code", null: false
    t.integer "discount_type", default: 0
    t.decimal "discount_value", precision: 10, scale: 2
    t.decimal "max_discount", precision: 10, scale: 2
    t.decimal "minimum_purchase", precision: 10, scale: 2
    t.integer "usage_limit"
    t.integer "used_count", default: 0
    t.datetime "starts_at"
    t.datetime "expires_at"
    t.boolean "active", default: true
    t.bigint "created_by_id", null: false
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_coupons_on_code", unique: true
    t.index ["course_id"], name: "index_coupons_on_course_id"
    t.index ["created_by_id"], name: "index_coupons_on_created_by_id"
  end

  create_table "courses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "course_code"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "teacher_id", null: false
    t.string "code"
    t.decimal "price", precision: 10, scale: 2, default: "0.0"
    t.integer "semester", default: 1, null: false
    t.index ["created_at"], name: "index_courses_on_created_at"
    t.index ["semester"], name: "index_courses_on_semester"
    t.index ["teacher_id"], name: "index_courses_on_teacher_id"
  end

  create_table "enrollments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "course_id", null: false
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "semester"
    t.index ["course_id", "status"], name: "index_enrollments_on_course_id_and_status"
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["semester"], name: "index_enrollments_on_semester"
    t.index ["status"], name: "index_enrollments_on_status"
    t.index ["user_id", "status"], name: "index_enrollments_on_user_id_and_status"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "payments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "course_id", null: false
    t.decimal "amount", precision: 10, scale: 2
    t.string "status", default: "pending"
    t.string "transaction_id"
    t.string "gateway", default: "sslcommerz"
    t.datetime "paid_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "idempotency_key"
    t.decimal "discount_amount", precision: 10
    t.string "coupon_code"
    t.index ["course_id"], name: "index_payments_on_course_id"
    t.index ["idempotency_key"], name: "index_payments_on_idempotency_key", unique: true
    t.index ["paid_at"], name: "index_payments_on_paid_at"
    t.index ["status"], name: "index_payments_on_status"
    t.index ["user_id", "status"], name: "index_payments_on_user_id_and_status"
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "question_options", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.string "content", null: false
    t.boolean "correct", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_question_options_on_question_id"
  end

  create_table "questions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "test_id", null: false
    t.integer "question_type", null: false
    t.text "content", null: false
    t.float "marks", default: 1.0
    t.text "correct_answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "auto_check", default: true
    t.index ["test_id"], name: "index_questions_on_test_id"
  end

  create_table "results", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.float "gpa"
    t.integer "semester"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.boolean "approved", default: false
    t.float "marks"
    t.index ["approved"], name: "idx_results_unapproved"
    t.index ["course_id"], name: "index_results_on_course_id"
    t.index ["semester"], name: "index_results_on_semester"
    t.index ["user_id"], name: "index_results_on_user_id"
  end

  create_table "students", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "student_id"
    t.string "address"
    t.string "gender"
    t.integer "current_semester"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_students_on_user_id"
  end

  create_table "test_attempts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "test_id", null: false
    t.datetime "started_at"
    t.datetime "submitted_at"
    t.datetime "expires_at"
    t.float "total_marks_obtained", default: 0.0
    t.float "percentage", default: 0.0
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["test_id"], name: "index_test_attempts_on_test_id"
    t.index ["user_id", "test_id"], name: "index_test_attempts_on_user_id_and_test_id", unique: true
    t.index ["user_id"], name: "index_test_attempts_on_user_id"
  end

  create_table "tests", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.bigint "teacher_id", null: false
    t.string "title", null: false
    t.text "description"
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.integer "duration_minutes", null: false
    t.float "total_marks", default: 0.0
    t.boolean "published", default: false
    t.integer "semester", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_tests_on_course_id"
    t.index ["end_time"], name: "index_tests_on_end_time"
    t.index ["semester"], name: "index_tests_on_semester"
    t.index ["start_time"], name: "index_tests_on_start_time"
    t.index ["teacher_id"], name: "index_tests_on_teacher_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "approved", default: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "student_id"
    t.string "phone"
    t.string "address"
    t.string "gender"
    t.date "date_of_birth"
    t.integer "current_semester"
    t.text "bio"
    t.index ["approved"], name: "index_users_on_approved"
    t.index ["created_at"], name: "index_users_on_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role"], name: "index_users_on_role"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "question_options", column: "selected_option_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "test_attempts"
  add_foreign_key "bulk_marks_uploads", "courses"
  add_foreign_key "bulk_marks_uploads", "users", column: "teacher_id"
  add_foreign_key "coupons", "courses"
  add_foreign_key "coupons", "users", column: "created_by_id"
  add_foreign_key "courses", "users", column: "teacher_id"
  add_foreign_key "enrollments", "courses"
  add_foreign_key "enrollments", "users"
  add_foreign_key "payments", "courses"
  add_foreign_key "payments", "users"
  add_foreign_key "question_options", "questions"
  add_foreign_key "questions", "tests"
  add_foreign_key "results", "courses"
  add_foreign_key "results", "users"
  add_foreign_key "students", "users"
  add_foreign_key "test_attempts", "tests"
  add_foreign_key "test_attempts", "users"
  add_foreign_key "tests", "courses"
  add_foreign_key "tests", "users", column: "teacher_id"
end
