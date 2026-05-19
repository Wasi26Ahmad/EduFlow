class TestAnswerCacheService

  def self.redis_key(test_id)
    "test:#{test_id}:answers"
  end

  def self.load_answers(test)

    ttl =
      (test.end_time - Time.current).to_i

    return false if ttl <= 0

    answers_hash = {}

    test.questions.includes(:question_options).find_each do |question|

      if question.question_type == "mcq"

        correct_option =
          question.question_options.detect(&:correct)

        next unless correct_option

        answers_hash[question.id] =
          correct_option.id

      else

        answers_hash[question.id] =
          question.correct_answer
                  .to_s
                  .strip
                  .downcase
                  .squish
      end

    end

    return false if answers_hash.empty?

    $redis.mapped_hmset(
      redis_key(test.id),
      answers_hash
    )

    # auto delete after test ends
    $redis.expire(
      redis_key(test.id),
      ttl
    )

    true
  end

  def self.correct_answer(
    test_id,
    question_id
  )

    $redis.hget(
      redis_key(test_id),
      question_id
    )
  end

  def self.clear(test_id)

    $redis.del(
      redis_key(test_id)
    )
  end
end