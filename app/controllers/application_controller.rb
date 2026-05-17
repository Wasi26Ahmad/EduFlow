require "pagy"

class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  include Pagy::Backend


  def after_sign_in_path_for(resource)
    dashboard_path
  end
  before_action :check_approval




private

    def require_admin
    unless current_user&.admin? || current_user&.super_admin?
      redirect_to root_path, alert: "Not authorized"
    end
  end

def check_approval
  return unless user_signed_in?

  if current_user.student? && !current_user.approved?
    sign_out current_user
    redirect_to new_user_session_path, alert: "Your account is not approved yet"
  end
end


end

