  class BulkMarksUpload < ApplicationRecord
    belongs_to :teacher,
               class_name: "User"
    belongs_to :course
    has_one_attached :excel_file

    validate :acceptable_excel

    enum status: {
      pending: "pending",
      approved: "approved",
      rejected: "rejected"
    }
    validates :excel_file, presence: true


    private

    def acceptable_excel
      return unless excel_file.attached?

      unless excel_file.content_type.in?([
                                           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                           "application/vnd.ms-excel"
                                         ])
        errors.add(:excel_file, "must be an Excel file")
      end

      if excel_file.byte_size > 5.megabytes
        errors.add(:excel_file, "is too large")
      end
    end
  end