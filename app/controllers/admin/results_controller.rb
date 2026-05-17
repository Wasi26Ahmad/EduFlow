class Admin::ResultsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  protect_from_forgery with: :exception

  def index
    @results = Result
                 .where(approved: [false, nil])
                 .includes(:user, :course)
                 .order(created_at: :desc)

    @uploads = BulkMarksUpload
                 .pending
                 .includes(:teacher, :course)
                 .order(created_at: :desc)
  end

  def update
    result = Result.find_by(
      id: params[:id],
      approved: [false, nil]
    )

    if result.nil?
      respond_to do |format|
        format.html do
          redirect_to admin_results_path,
                      alert: "Result not found"
        end

        format.json do
          render json: {
            success: false,
            error: "Result not found"
          }, status: :not_found
        end
      end

      return
    end

    result.update!(approved: true)

    respond_to do |format|
      format.html do
        redirect_to admin_results_path,
                    notice: "Result approved"
      end

      format.json do
        render json: {
          success: true,
          message: "Result approved"
        }
      end
    end
  end

  def reject
    result = Result.find(params[:id])

    result.destroy!

    respond_to do |format|
      format.html do
        redirect_to admin_results_path,
                    notice: "Result rejected"
      end

      format.json do
        render json: {
          success: true,
          message: "Result rejected"
        }
      end
    end
  end

  private

  def require_admin
    unless current_user.admin? || current_user.super_admin?
      redirect_to root_path,
                  alert: "Not authorized"
    end
  end
end