# db/migrate/20260512054543_add_performance_indexes.rb
class AddPerformanceIndexes < ActiveRecord::Migration[7.1]
  def change
    # users — missing role and approved indexes
    add_index :users, :role,     if_not_exists: true
    add_index :users, :approved, if_not_exists: true

    # courses — missing created_at and semester
    add_index :courses, :created_at, if_not_exists: true
    add_index :courses, :semester,   if_not_exists: true

    # enrollments — missing status and semester
    add_index :enrollments, :status,   if_not_exists: true
    add_index :enrollments, :semester, if_not_exists: true

    # results — missing user_id (no user_id column — results only has course_id)
    add_index :results, :semester, if_not_exists: true

    # payments — missing status and paid_at
    add_index :payments, :status,  if_not_exists: true
    add_index :payments, :paid_at, if_not_exists: true

    # composite indexes for dashboard queries
    add_index :payments,    [:user_id, :status],   if_not_exists: true
    add_index :enrollments, [:user_id, :status],   if_not_exists: true
    add_index :enrollments, [:course_id, :status], if_not_exists: true
  end
end