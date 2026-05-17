require "prawn"
require "prawn/table"

class ResultsPdf
  include Prawn::View

  def initialize(user, results)
    @user = user
    @results = results.includes(:course)

    header
    content
  end

  def header
    image Rails.root.join("app/assets/images/doge-meme-icon-free-vector.jpg"),
          width: 60,
          position: :left

    move_up 40

    text "Academy", size: 22, style: :bold, align: :center
    text "Student Result Report", size: 18, style: :italic, align: :center
    text "Email: #{@user.email}", size: 12, align: :center

    if @user.respond_to?(:current_semester)
      text "Current Semester: #{@user.current_semester}",
           size: 11,
           align: :center
    end

    text "Generated: #{Time.current.strftime('%d %B %Y')}",
         size: 10,
         align: :center

    stroke_horizontal_rule
    move_down 20
  end

  def content

    grouped_results =
      @results.group_by { |r| r.course.semester }

    grouped_results.sort.each do |semester, semester_results|

      # Semester Title
      text "Semester #{semester}",
           size: 18,
           style: :bold,
           color: "1D4ED8"

      move_down 10

      # Semester Table
      table_data = [[
                      "Course",
                      "Course Code",
                      "Marks",
                      "GPA"
                    ]]

      semester_results.each do |r|

        table_data << [
          r.course.title,
          r.course.code,
          r.marks,
          r.gpa
        ]

      end

      table(table_data,
            header: true,
            width: bounds.width,
            cell_style: {
              padding: 10,
              border_color: "E5E7EB"
            }) do

        row(0).background_color = "2563EB"
        row(0).text_color = "FFFFFF"
        row(0).font_style = :bold

        columns(2..3).align = :center
      end

      move_down 14

      # Semester GPA Average
      semester_gpa =
        semester_results.sum { |r| r.gpa.to_f } /
        semester_results.count

      text "Semester GPA: #{semester_gpa.round(2)}",
           size: 12,
           style: :bold

      move_down 28

    end

    stroke_horizontal_rule
    move_down 18

    # Final CGPA
    text "Final CGPA: #{@user.cgpa}",
         size: 16,
         style: :bold,
         color: "111827"
  end
end