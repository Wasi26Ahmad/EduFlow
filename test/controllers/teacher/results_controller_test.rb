require "test_helper"

class Teacher::ResultsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get teacher_results_new_url
    assert_response :success
  end

  test "should get create" do
    get teacher_results_create_url
    assert_response :success
  end
end
