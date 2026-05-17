class Admin::UsersController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_user!
  before_action :require_admin

  def index
    @pagy, @users = pagy(
      User.order(created_at: :desc),
      items: 12
    )
  end

  def approve
    user = User.find(params[:id])

    if user == current_user
      redirect_to admin_users_path, alert: "You cannot approve yourself"
      return
    end

    if user.update(approved: true)
      redirect_to admin_users_path, notice: "User approved"
    else
      redirect_to admin_users_path, alert: "Approval failed"
    end
  end

  private

  def require_admin
    unless current_user.admin? || current_user.super_admin?
      redirect_to root_path, alert: "Not authorized"
    end
  end
end