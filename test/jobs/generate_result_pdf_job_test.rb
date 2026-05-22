require "test_helper"

class GenerateResultsPdfJobTest < ActiveJob::TestCase
  def setup
    @teacher =
      User.create!(
        email: "teacher_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :teacher
      )

    @student =
      User.create!(
        email: "student_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    @course =
      Course.create!(
        teacher: @teacher,
        title: "Algorithms",
        code: "CSE101",
        price: 1000,
        semester: 3
      )

    @result =
      Result.create!(
        user: @student,
        course: @course,
        marks: 85,
        approved: true
      )

    @export =
      ResultExport.create!(
        user: @student,
        status: :pending
      )
  end

  test "perform marks export as completed" do
    GenerateResultsPdfJob.new.perform(
      @export.id
    )

    @export.reload

    assert_equal "completed",
                 @export.status

    assert_not_nil @export.file_path
  end

  test "perform creates pdf file" do
    GenerateResultsPdfJob.new.perform(
      @export.id
    )

    @export.reload

    pdf_full_path =
      Rails.root.join(
        "public",
        @export.file_path.delete_prefix("/")
      )

    assert File.exist?(pdf_full_path)
  end

  test "perform handles invalid export id gracefully" do
    invalid_id = -999999

    assert_nothing_raised do
      GenerateResultsPdfJob.new.perform(
        invalid_id
      )
    end
  end
end