class ResultExportsController < ApplicationController
  before_action :authenticate_user!

  def index
    @exports =
      current_user
        .result_exports
        .order(created_at: :desc)

    render json: @exports
  end

  def show
    export =
      current_user
        .result_exports
        .find(params[:id])

    render json: {
      id: export.id,
      status: export.status,
      file_url: export.file_path
    }
  end

  def download
    export =
      current_user
        .result_exports
        .find(params[:id])

    if export.completed? && export.file_path.present?
      redirect_to export.file_path
    else
      render json: {
        error: "File not ready"
      }, status: :unprocessable_entity
    end
  end
end