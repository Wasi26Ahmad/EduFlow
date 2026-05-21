class ResultsController < ApplicationController
  before_action :authenticate_user!

  def index
    approved_results =
      current_user.results
                  .where(approved: true)
                  .includes(:course)
                  .order(created_at: :desc)

    @results_by_semester =
      approved_results
        .order(:semester)
        .group_by(&:semester)

    @pagy, @results =
      pagy(approved_results, limit: 10)
  end

  def generate_pdf
    export = current_user.result_exports.create!(
      status: :pending
    )

    GenerateResultsPdfJob.perform_async(export.id)

    render json: {
      id: export.id,
      status: export.status
    }
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")

    render json: {
      error: e.message
    }, status: :unprocessable_entity
  end
end