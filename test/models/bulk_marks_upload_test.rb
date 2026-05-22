require "test_helper"

class BulkMarksUploadTest < ActiveSupport::TestCase
  def setup
    @teacher =
      User.new(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @course =
      Course.new(
        teacher: @teacher,
        price: 1000,
        semester: 3
      )

    @bulk_upload =
      BulkMarksUpload.new(
        teacher: @teacher,
        course: @course,
        status: :pending
      )
  end

  test "belongs to teacher" do
    association =
      BulkMarksUpload.reflect_on_association(:teacher)

    assert_equal :belongs_to,
                 association.macro

    assert_equal "User",
                 association.class_name
  end

  test "belongs to course" do
    association =
      BulkMarksUpload.reflect_on_association(:course)

    assert_equal :belongs_to,
                 association.macro
  end

  test "has one attached excel file" do
    assert @bulk_upload.respond_to?(:excel_file)
  end


  test "excel_file must be present" do
    assert_not @bulk_upload.valid?
    assert_includes @bulk_upload.errors[:excel_file],
                    "can't be blank"
  end


  test "status enum values are correct" do
    expected_statuses = {
      "pending" => "pending",
      "approved" => "approved",
      "rejected" => "rejected"
    }

    assert_equal expected_statuses,
                 BulkMarksUpload.statuses
  end

  test "can set status to pending" do
    @bulk_upload.status = :pending

    assert @bulk_upload.pending?
  end

  test "can set status to approved" do
    @bulk_upload.status = :approved

    assert @bulk_upload.approved?
  end

  test "can set status to rejected" do
    @bulk_upload.status = :rejected

    assert @bulk_upload.rejected?
  end
end