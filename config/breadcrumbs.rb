# config/breadcrumbs.rb

# =========================================================
# ROOT
# =========================================================

crumb :root do
  link "Dashboard", dashboard_path
end

# =========================================================
# PROFILE
# =========================================================

crumb :profile do
  link "Profile", profile_path
  parent :root
end

crumb :edit_profile do
  link "Edit Profile", edit_profile_path
  parent :profile
end

# =========================================================
# COURSES
# =========================================================

crumb :courses do
  link "Courses", courses_path
  parent :root
end

crumb :my_courses do
  link "My Courses", my_courses_courses_path
  parent :courses
end

crumb :course do |course|
  link course.title, course_path(course)
  parent :courses
end

crumb :new_course do
  link "New Course", new_course_path
  parent :courses
end

crumb :edit_course do |course|
  link "Edit Course", edit_course_path(course)
  parent :course, course
end

# =========================================================
# ENROLLMENTS
# =========================================================

crumb :enrollments do
  link "Enrollments", enrollments_path
  parent :root
end

# =========================================================
# RESULTS
# =========================================================

crumb :results do
  link "Results", results_path
  parent :root
end

crumb :result do |result|
  link "Result ##{result.id}", result_path(result)
  parent :results
end

crumb :new_result do
  link "New Result", new_result_path
  parent :results
end

crumb :edit_result do |result|
  link "Edit Result", edit_result_path(result)
  parent :result, result
end

crumb :download_results do
  link "Download PDF", download_pdf_results_path
  parent :results
end

# =========================================================
# TESTS (STUDENT)
# =========================================================

crumb :tests do
  link "Tests", tests_path
  parent :root
end

crumb :test do |test|
  link test.title, test_path(test)
  parent :tests
end

# =========================================================
# COURSE TESTS
# =========================================================

crumb :course_tests do |course|
  link "Tests", course_tests_path(course)
  parent :course, course
end

crumb :course_test do |course, test|
  link test.title, course_test_path(course, test)
  parent :course_tests, course
end

crumb :new_course_test do |course|
  link "New Test", new_course_test_path(course)
  parent :course_tests, course
end

crumb :edit_course_test do |course, test|
  link "Edit Test", edit_course_test_path(course, test)
  parent :course_test, course, test
end

# =========================================================
# TEST ATTEMPTS
# =========================================================

crumb :test_attempt do |attempt|
  link "Attempt ##{attempt.id}", test_attempt_path(attempt)
  parent :tests
end

# =========================================================
# CT MARKS
# =========================================================

crumb :ct_marks do
  link "CT Marks", ct_marks_path
  parent :root
end

# =========================================================
# PAYMENTS
# =========================================================

crumb :payments do
  link "Payments", payments_path
  parent :root
end

# =========================================================
# TEACHER
# =========================================================

crumb :teacher_root do
  link "Teacher Panel", teacher_tests_path
  parent :root
end

crumb :teacher_tests do
  link "Tests", teacher_tests_path
  parent :teacher_root
end

crumb :teacher_courses do
  link "Courses", teacher_courses_path
  parent :teacher_root
end

crumb :teacher_course do |course|
  link course.title, teacher_course_path(course)
  parent :teacher_courses
end

crumb :teacher_course_tests do |course|
  link "Tests", teacher_course_tests_path(course)
  parent :teacher_course, course
end

crumb :teacher_course_test do |course, test|
  link test.title, teacher_course_test_path(course, test)
  parent :teacher_course_tests, course
end

crumb :teacher_questions do |course, test|
  link "Questions",
       teacher_course_test_questions_path(course, test)

  parent :teacher_course_test, course, test
end

crumb :teacher_attempts do |course, test|
  link "Attempts",
       teacher_course_test_attempts_path(course, test)

  parent :teacher_course_test, course, test
end

crumb :teacher_attempt do |course, test, attempt|
  link "Attempt ##{attempt.id}",
       teacher_course_test_attempt_path(
         course,
         test,
         attempt
       )

  parent :teacher_attempts, course, test
end

crumb :teacher_bulk_marks_uploads do
  link "Bulk Marks Uploads",
       teacher_bulk_marks_uploads_path

  parent :teacher_root
end

crumb :teacher_new_bulk_marks_upload do
  link "New Upload",
       new_teacher_bulk_marks_upload_path

  parent :teacher_bulk_marks_uploads
end

# =========================================================
# ADMIN
# =========================================================

crumb :admin_root do
  link "Admin Panel", admin_users_path
  parent :root
end

# ---------------- USERS ----------------

crumb :admin_users do
  link "Users", admin_users_path
  parent :admin_root
end

crumb :admin_user do |user|
  link user.name, admin_user_path(user)
  parent :admin_users
end

crumb :admin_new_user do
  link "New User", new_admin_user_path
  parent :admin_users
end

crumb :admin_edit_user do |user|
  link "Edit User", edit_admin_user_path(user)
  parent :admin_user, user
end

# ---------------- ENROLLMENTS ----------------

crumb :admin_enrollments do
  link "Enrollments", admin_enrollments_path
  parent :admin_root
end

# ---------------- RESULTS ----------------

crumb :admin_results do
  link "Results", admin_results_path
  parent :admin_root
end

crumb :admin_result do |result|
  link "Result ##{result.id}",
       admin_result_path(result)

  parent :admin_results
end

# ---------------- BULK MARKS ----------------

crumb :admin_bulk_marks_uploads do
  link "Bulk Marks Uploads",
       admin_bulk_marks_uploads_path

  parent :admin_root
end

crumb :admin_bulk_marks_upload do |upload|
  link "Upload ##{upload.id}",
       admin_bulk_marks_upload_path(upload)

  parent :admin_bulk_marks_uploads
end

# ---------------- COURSE CATALOGUE ----------------

crumb :admin_course_catalogue do
  link "Course Catalogue",
       admin_course_catalogue_path

  parent :admin_root
end

# ---------------- ADMIN COURSES ----------------

crumb :admin_courses do
  link "Courses", admin_courses_path
  parent :admin_root
end

crumb :admin_course do |course|
  link course.title,
       admin_course_path(course)

  parent :admin_courses
end

crumb :admin_course_coupons do |course|
  link "Coupons",
       admin_course_coupons_path(course)

  parent :admin_course, course
end

# =========================================================
# RAILS ADMIN
# =========================================================

crumb :rails_admin do
  link "Rails Admin", rails_admin_path
  parent :admin_root
end