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

  def download_pdf
    results =
      current_user.results
                  .where(approved: true)
                  .includes(:course)
                  .order(created_at: :desc)

    pdf =
      ResultsPdf.new(
        current_user,
        results
      ).render

    send_data pdf,
              filename: "results.pdf",
              type: "application/pdf",
              disposition: "attachment"
  end
end