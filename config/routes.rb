Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin-console", as: "rails_admin"

  get "home/index"
  get "dashboard", to: "dashboard#index"

  devise_for :users

  root "dashboard#index"

  resource :profile,
           only: [:show, :edit, :update]


  resources :courses do
    collection do
      get :my_courses
    end

    resources :tests do
      member do
        post :start
      end
    end

    resources :ct_marks,
              only: [:index]
  end

  resources :enrollments,
            only: [:create, :index, :update]


  resources :payments,
            only: [:create] do
    collection do
      post :success
      post :fail
      post :cancel
    end
  end


  resources :results do
    collection do
      get :download_pdf
    end
  end

  resources :test_attempts,
            only: [:show, :update] do
    member do
      patch :evaluate
    end
  end


  namespace :teacher do

    resources :results,
              only: [:new, :create]

    resources :bulk_marks_uploads,
              only: [:new, :create, :index]

    resources :tests,
              only: [:index]

    resources :courses do
      resources :tests do

        member do
          patch :finalize
        end

        resources :questions

        resources :attempts,
                  only: [:index, :show, :update],
                  controller: "test_attempts"

      end
    end
  end

  namespace :admin do

    resources :users do
      member do
        patch :approve
        patch :update_role
      end
    end

    resources :enrollments,
              only: [:index, :update] do
      member do
        patch :approve
      end
    end

    resources :results,
              only: [:index, :update] do
      member do
        patch :approve
        patch :reject
      end
    end

    resources :bulk_marks_uploads,
              only: [:index, :show] do
      member do
        patch :approve
        patch :reject
      end
    end

    get "course_catalogue",
        to: "course_catalogue#index"

    resources :courses do
      resources :coupons
    end

  end


  get "up" => "rails/health#show",
      as: :rails_health_check
end