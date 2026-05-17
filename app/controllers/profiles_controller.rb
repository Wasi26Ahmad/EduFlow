# app/controllers/profiles_controller.rb

class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user

    if @user.update(profile_params)
      respond_to do |format|
        format.html do
          redirect_to profile_path,
                      notice: "Profile updated successfully"
        end

        format.json do
          render json: {
            success: true,
            user: @user
          }, status: :ok
        end
      end
    else
      respond_to do |format|
        format.html do
          render :edit, status: :unprocessable_entity
        end

        format.json do
          render json: {
            success: false,
            errors: @user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end
    end
  end

  private

  def profile_params
    params.require(:user).permit(
      :name,
      :phone,
      :address,
      :gender,
      :date_of_birth,
      :current_semester,
      :bio
    )
  end
end