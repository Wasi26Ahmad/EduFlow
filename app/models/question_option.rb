class QuestionOption < ApplicationRecord
  belongs_to :question

  after_commit :refresh_test_cache

  private

  def refresh_test_cache
    TestAnswerCacheService.load_answers(
      question.test
    )
  end
end