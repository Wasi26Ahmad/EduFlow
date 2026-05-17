class Admin::CouponsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_coupon_management!

  before_action :set_course
  before_action :set_coupon, only: [:edit, :update, :destroy]

  def index
    @coupons = @course.coupons.order(created_at: :desc)
  end

  def new
    @coupon = @course.coupons.new
  end

  def create
    @coupon = @course.coupons.new(coupon_params)
    @coupon.created_by = current_user

    if @coupon.save
      redirect_to admin_course_coupons_path(@course),
                  notice: "Coupon created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @coupon.update(coupon_params)
      redirect_to admin_course_coupons_path(@course),
                  notice: "Coupon updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @coupon.destroy

    redirect_to admin_course_coupons_path(@course),
                notice: "Coupon deleted successfully."
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_coupon
    @coupon = @course.coupons.find(params[:id])
  end

  def authorize_coupon_management!
    unless current_user.admin? || current_user.super_admin?
      redirect_to root_path, alert: "Unauthorized"
    end
  end

  def coupon_params
    params.require(:coupon).permit(
      :code,
      :discount_type,
      :discount_value,
      :max_discount,
      :minimum_purchase,
      :usage_limit,
      :starts_at,
      :expires_at,
      :active
    )
  end
end