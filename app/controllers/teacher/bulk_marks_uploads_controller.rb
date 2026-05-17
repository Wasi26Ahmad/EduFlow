# frozen_string_literal: true

class Teacher::BulkMarksUploadsController < ApplicationController
  before_action :authenticate_user!
  def index
    @uploads = BulkMarksUpload.where(teacher: current_user)
                              .includes(:course)
                              .order(created_at: :desc)
  end
  def new
    @courses = Course.where(teacher_id: current_user.id)
    @upload = BulkMarksUpload.new
  end
  def create
    @upload = BulkMarksUpload.new(upload_params)
    @upload.teacher = current_user
    @upload.status = "pending"
    if @upload.save
      redirect_to teacher_bulk_marks_uploads_path,
                  notice: "Excel uploaded successfully and awaiting approval"
    else
      @courses = Course.where(teacher_id: current_user.id)
      render :new,
             status: :unprocessable_entity
    end
  end
  private
  def upload_params
    params.require(:bulk_marks_upload)
          .permit(:course_id, :excel_file)
  end
end