class ResultExport < ApplicationRecord
  belongs_to :user

  has_one_attached :pdf

  enum status: {
    pending: "pending",
    processing: "processing",
    completed: "completed",
    failed: "failed"
  }
end