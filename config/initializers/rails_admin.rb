RailsAdmin.config do |config|
  config.asset_source = :sprockets

  config.authenticate_with do
    warden.authenticate! scope: :user
  end

  config.current_user_method(&:current_user)

  config.authorize_with do
    unless current_user&.admin? || current_user&.super_admin?
      redirect_to main_app.root_path, alert: "Not authorized"
    end
  end
end