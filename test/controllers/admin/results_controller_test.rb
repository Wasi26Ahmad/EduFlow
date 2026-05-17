require "test_helper"

class Admin::ResultsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_results_index_url
    assert_response :success
  end
end
