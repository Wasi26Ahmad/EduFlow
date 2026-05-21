ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    parallelize(workers: :number_of_processors)

    self.use_transactional_tests = true
  end
end

class ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
end