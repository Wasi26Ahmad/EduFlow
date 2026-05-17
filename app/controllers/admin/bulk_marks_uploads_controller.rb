require "roo"
class Admin::BulkMarksUploadsController < ApplicationController
  before_action :authenticate_user!
  def index
    @uploads = BulkMarksUpload.pending
                              .includes(:teacher, :course)
                              .order(created_at: :desc)
  end
  def show
    @upload = BulkMarksUpload.find(params[:id])
  end
  def approve
    upload = BulkMarksUpload.find(params[:id])
    file = upload.excel_file.download
    temp_file = Tempfile.new(["marks", ".xlsx"])
    temp_file.binmode
    temp_file.write(file)
    temp_file.rewind
    spreadsheet = Roo::Spreadsheet.open(temp_file.path)
    sheet = spreadsheet.sheet(0)
    # Expected format:
    # Student Email | Marks
    (2..sheet.last_row).each do |i|
      email = sheet.cell(i, 1).to_s.strip
      marks = sheet.cell(i, 2).to_f
      user = User.find_by(email: email)
      next unless user
      enrollment = Enrollment.find_by(
        user: user,
        course: upload.course,
        status: "approved"
      )
      next unless enrollment
      result = Result.find_or_initialize_by(
        user: user,
        course: upload.course
      )
      result.marks = marks
      result.gpa = calculate_gpa(marks)
      result.approved = false
      result.save!
    end
    upload.update!(status: "approved")
    redirect_to admin_bulk_marks_uploads_path,
                notice: "Bulk marks uploaded successfully"
  ensure
    temp_file.close
    temp_file.unlink
  end
  def reject
    upload = BulkMarksUpload.find(params[:id])
    upload.update!(status: "rejected")
    redirect_to admin_bulk_marks_uploads_path,
                alert: "Upload rejected"
  end
  private
  def calculate_gpa(marks)
    case marks
    when 80..100
      4.0
    when 75...80
      3.75
    when 70...75
      3.5
    when 65...70
      3.25
    when 60...65
      3.0
    when 55...60
      2.75
    when 50...55
      2.5
    when 45...50
      2.25
    when 40...45
      2.0
    else
      0.0
    end
  end
end# frozen_string_literal: true

