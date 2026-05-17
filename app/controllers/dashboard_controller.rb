class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @active_users_count = Rails.cache.fetch("active_users_count", expires_in: 1.minute) do
      User.where(approved: true).count
    end

    @total_courses  = Rails.cache.fetch("total_courses",  expires_in: 5.minutes) { Course.count }
    @total_students = Rails.cache.fetch("total_students", expires_in: 5.minutes) { User.where(approved: true).count }
    @total_results  = Rails.cache.fetch("total_results",  expires_in: 5.minutes) { Result.count }

    if current_user.super_admin?
      @pagy, @users = pagy(
        User.order(created_at: :desc)
            .select(:id, :email, :role, :created_at)
      )
    end

    render current_user.role
  end
end