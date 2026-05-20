class PaymentsController < ApplicationController
  before_action :authenticate_user!

  skip_before_action :verify_authenticity_token,
                     only: [:success, :fail, :cancel]

  skip_before_action :authenticate_user!,
                     only: [:success, :fail, :cancel]

  protect_from_forgery with: :exception,
                       except: [:success, :fail, :cancel]

  def create
    course = Course.find(params[:course_id])

    idempotency_key =
      params[:idempotency_key].presence ||
      SecureRandom.uuid

    existing_payment =
      Payment.find_by(
        user: current_user,
        course: course,
        idempotency_key: idempotency_key
      )

    if existing_payment.present?
      payment = existing_payment
    else
      original_amount = course.price.to_f

      coupon = nil
      discount_amount = 0
      final_amount = original_amount

      if params[:coupon_code].present?

        coupon =
          course.coupons.find_by(
            code: params[:coupon_code].to_s.upcase.strip,
            active: true
          )

        if coupon.present?

          valid_time =
            coupon.starts_at.present? &&
            coupon.expires_at.present? &&
            coupon.starts_at <= Time.current &&
            coupon.expires_at >= Time.current

          usage_available =
            coupon.usage_limit.nil? ||
            coupon.used_count.to_i < coupon.usage_limit

          minimum_purchase_ok =
            coupon.minimum_purchase.nil? ||
            original_amount >= coupon.minimum_purchase.to_f

          if valid_time &&
             usage_available &&
             minimum_purchase_ok

            if coupon.percentage?

              discount_amount =
                (original_amount * coupon.discount_value.to_f) / 100

              if coupon.max_discount.present?
                discount_amount =
                  [
                    discount_amount,
                    coupon.max_discount.to_f
                  ].min
              end

            else
              discount_amount =
                coupon.discount_value.to_f
            end

            final_amount =
              original_amount - discount_amount

            final_amount = 0 if final_amount.negative?
          end
        end
      end

      payment = Payment.create!(
        user: current_user,
        course: course,
        idempotency_key: idempotency_key,
        amount: final_amount,
        discount_amount: discount_amount,
        coupon_code: coupon&.code,
        status: "pending",
        transaction_id: "TXN-#{SecureRandom.hex(10)}"
      )

      if coupon.present? && discount_amount.positive?
        coupon.increment!(:used_count)
      end
    end

    store_id = ENV["SSLCOMMERZ_STORE_ID"]
    store_password = ENV["SSLCOMMERZ_STORE_PASSWORD"]

    sandbox =
      ENV["SSLCOMMERZ_SANDBOX"] == "true"

    url =
      if sandbox
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
      else
        "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
      end

    payload = {
      store_id: store_id,
      store_passwd: store_password,

      total_amount: payment.amount,
      currency: "BDT",
      tran_id: payment.transaction_id,

      success_url: success_payments_url,
      fail_url: fail_payments_url,
      cancel_url: cancel_payments_url,

      cus_name:
        current_user.name || current_user.email,

      cus_email: current_user.email,

      cus_add1:
        current_user.address || "Bangladesh",

      cus_phone:
        current_user.phone || "01700000000",

      shipping_method: "NO",

      product_name: course.title,
      product_category: "Course",
      product_profile: "general"
    }

    response = HTTParty.post(url, body: payload)

    Rails.logger.info "SSLCOMMERZ RESPONSE:"
    Rails.logger.info response.body

    begin
      data = JSON.parse(response.body)

    rescue JSON::ParserError

      return redirect_to courses_path,
                         alert: "Payment gateway error"
    end

    if data["GatewayPageURL"].present?

      redirect_to data["GatewayPageURL"],
                  allow_other_host: true

    else

      redirect_to courses_path,
                  alert: "Payment gateway failed"
    end
  end

  def success
    Rails.logger.info(
      "SUCCESS CALLBACK PARAMS: #{params.to_unsafe_h.inspect}"
    )

    tran_id =
      params[:tran_id] ||
      params[:tranId]

    payment =
      Payment.find_by(transaction_id: tran_id)

    if payment.present?

      payment.update!(
        status: "paid",
        paid_at: Time.current
      )

      Enrollment.find_or_create_by!(
        user: payment.user,
        course: payment.course
      ) do |e|

        e.status = :approved
      end
    end

    redirect_to courses_path,
                notice: "Payment successful"
  end

  def fail
    redirect_to courses_path,
                alert: "Payment failed"
  end

  def cancel
    redirect_to courses_path,
                alert: "Payment cancelled"
  end
end