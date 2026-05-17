# frozen_string_literal: true

class Admin::CourseCatalogueController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    @courses = Course
                 .includes(:teacher, :enrollments, :payments)
                 .order(created_at: :desc)
  end

  private

  def require_admin
    unless current_user.admin? || current_user.super_admin?
      redirect_to root_path,
                  alert: "Not authorized"
    end
  end
end