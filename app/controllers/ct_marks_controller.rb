class CtMarksController < ApplicationController
  before_action :authenticate_user!

  def index

    @attempts =
      current_user.test_attempts
                  .includes(
                    test: :course
                  )
                  .order(created_at: :desc)

  end
end