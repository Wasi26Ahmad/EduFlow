require "test_helper"

class ResultExportTest < ActiveSupport::TestCase
  def setup
    @user =
      User.new(
        email: "result_export_#{SecureRandom.hex(4)}@example.com",
        password: "password123",
        role: :student
      )

    @result_export =
      ResultExport.new(
        user: @user,
        status: :pending
      )
  end

  test "valid result export" do
    assert @result_export.valid?
  end


  test "belongs to user" do
    association =
      ResultExport.reflect_on_association(:user)

    assert_equal :belongs_to,
                 association.macro
  end

  test "has one attached pdf" do
    assert ResultExport.new.respond_to?(:pdf)
  end

  test "status enum values are correct" do
    expected_statuses = {
      "pending" => "pending",
      "processing" => "processing",
      "completed" => "completed",
      "failed" => "failed"
    }

    assert_equal expected_statuses,
                 ResultExport.statuses
  end

  test "can set status to pending" do
    @result_export.status = :pending

    assert @result_export.pending?
  end

  test "can set status to processing" do
    @result_export.status = :processing

    assert @result_export.processing?
  end

  test "can set status to completed" do
    @result_export.status = :completed

    assert @result_export.completed?
  end

  test "can set status to failed" do
    @result_export.status = :failed

    assert @result_export.failed?
  end
end