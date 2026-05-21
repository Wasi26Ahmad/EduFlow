class GenerateResultsPdfJob
  include Sidekiq::Job

  def perform(export_id)
    export = ResultExport.find(export_id)

    user = export.user

    results =
      Result
        .includes(:course)
        .where(user_id: user.id, approved: true)
        .order(created_at: :desc)

    pdf_filename =
      "transcript_#{user.id}_#{Time.current.to_i}.pdf"

    pdf_path =
      Rails.root.join(
        "public",
        "exports",
        pdf_filename
      )

    FileUtils.mkdir_p(
      Rails.root.join("public", "exports")
    )

    Prawn::Document.generate(pdf_path) do |pdf|
      pdf.text(
        "Official Transcript",
        size: 24,
        style: :bold
      )

      pdf.move_down 20

      pdf.text "Student: #{user.email}"

      pdf.move_down 30

      table_data = [
        ["Course", "Code", "Marks", "GPA"]
      ]

      results.each do |result|
        course = result.course

        table_data << [
          course.title,
          course.code,
          result.marks.to_s,
          result.gpa.to_s
        ]
      end

      pdf.table(
        table_data,
        header: true,
        width: pdf.bounds.width
      )
    end

    export.update!(
      status: :completed,
      file_path: "/exports/#{pdf_filename}"
    )
  rescue => e
    export.update!(
      status: :failed
    ) if export.present?

    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
  end
end