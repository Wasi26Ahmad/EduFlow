class Test < ApplicationRecord
  belongs_to :course

  belongs_to :teacher,
             class_name: "User"

  has_many :questions,
           dependent: :destroy

  has_many :test_attempts,
           dependent: :destroy

  validates :title, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :duration_minutes, presence: true

  after_commit :reload_redis_cache

  after_destroy :reload_all_active_test_caches

  private

  def reload_redis_cache
    TestAnswerCacheService.load_answers(self)
  end

  def reload_all_active_test_caches
    TestAnswerCacheService.clear(id)
    Test
      .where("end_time > ?", Time.current)
      .find_each do |test|

      TestAnswerCacheService.load_answers(test)

    end
  end
end
