class Rack::Attack
  throttle("logins/ip", limit: 3, period: 20.seconds) do |req|
    if req.path == "/users/sign_in" && req.post?
      req.ip
    end
  end

  throttle('payments/ip', limit: 10, period: 1.minute) do |req|
    if req.path.start_with?('/payments') && req.post?
      req.ip
    end
  end

  blocklist('block suspicious requests') do |req|
    Rack::Attack::Fail2Ban.filter("pentesters-#{req.ip}",
                                  maxretry: 3,
                                  findtime: 2.minutes,
                                  bantime: 20.minutes) do
      req.path.include?('wp-admin') ||
        req.path.include?('.env') ||
        req.path.include?('phpmyadmin')
    end
  end
end