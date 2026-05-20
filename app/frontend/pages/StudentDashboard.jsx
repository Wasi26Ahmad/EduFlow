import React, { useEffect, useMemo, useState } from "react";

const cards = [
    {
        key: "profile",
        title: "My Profile",
        description:
            "View and manage your personal information and student profile.",
        icon: "P",
        gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
        glow: "rgba(37,99,235,0.22)",
    },
    {
        key: "courses",
        title: "Explore Courses",
        description:
            "Browse available courses, enroll and make payments",
        icon: "📚",
        gradient: "linear-gradient(135deg, #10b981, #22c55e)",
        glow: "rgba(16,185,129,0.22)",
    },
    {
        key: "results",
        title: "Academic Results",
        description:
            "Track GPA, grades, and academic performance analytics.",
        icon: "📊",
        gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
        glow: "rgba(245,158,11,0.22)",
    },
    {
        key: "enrollments",
        title: "My Enrollments",
        description:
            "Review enrollment status and course approval progress.",
        icon: "🧾",
        gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        glow: "rgba(99,102,241,0.22)",
    },
];

function AnimatedCounter({ value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        const duration = 1200;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;

            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return count;
}

export default function StudentDashboard({
                                             userEmail,
                                             approvedCount,
                                             totalCount,
                                             cgpa,
                                             progress,
                                             paths,
                                         }) {
    const [mounted, setMounted] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = useMemo(
        () => [
            {
                label: "Approved Results",
                value: approvedCount,
                light: true,
            },
            {
                label: "Current CGPA",
                value: cgpa,
                primary: true,
            },
            {
                label: "Approval Progress",
                value: `${progress}%`,
                progress: true,
            },
        ],
        [approvedCount, cgpa, progress]
    );

    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top, #e2e8f0 0%, #f8fafc 35%);
          font-family: Inter, system-ui, sans-serif;
          color: #111827;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            opacity: .6;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: .6;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }

        .dashboard-wrapper {
          max-width: 1180px;
          margin: 42px auto;
          padding: 0 18px 80px;
        }

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 34px;
  padding: 38px;
  background:
    radial-gradient(
      circle at top right,
      rgba(59,130,246,0.16),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      rgba(255,255,255,0.96) 0%,
      rgba(248,250,252,0.96) 45%,
      rgba(241,245,249,0.98) 100%
    );
  border: 1px solid rgba(226,232,240,0.9);
  box-shadow:
    0 24px 60px rgba(15,23,42,0.08),
    inset 0 1px 0 rgba(255,255,255,0.7);
  color: #0f172a;
  margin-bottom: 30px;
  animation: fadeUp .7s ease;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      120deg,
      transparent 30%,
      rgba(255,255,255,0.55),
      transparent 70%
    );
  transform: translateX(-100%);
  animation: shimmer 5s linear infinite;
}

.hero-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  background: rgba(59,130,246,0.12);
  top: -120px;
  right: -80px;
  filter: blur(30px);
  animation: pulseGlow 5s ease infinite;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(226,232,240,0.9);
  backdrop-filter: blur(14px);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .4px;
  color: #2563eb;
  box-shadow: 0 6px 18px rgba(37,99,235,0.08);
}

.hero-title {
  margin: 18px 0 10px;
  font-size: clamp(34px, 5vw, 48px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -2px;
  color: #0f172a;
}

.hero-description {
  margin: 0;
  max-width: 640px;
  color: #475569;
  line-height: 1.8;
  font-size: 15px;
}

.hero-description span {
  color: #111827;
  font-weight: 700;
}

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
          margin-bottom: 34px;
        }

        .dashboard-card {
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 28px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 12px 35px rgba(15,23,42,0.06);
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease;
          animation: fadeUp .7s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 45px rgba(15,23,42,0.10);
          border-color: rgba(99,102,241,0.15);
        }

        .dashboard-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.3),
              transparent 50%
            );
          pointer-events: none;
        }

        .card-icon {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 18px;
          color: white;
          transition: transform .25s ease;
        }

        .dashboard-card:hover .card-icon {
          transform: rotate(-5deg) scale(1.08);
        }

        .card-title {
          font-size: 18px;
          font-weight: 800;
          color: #111827;
        }

        .card-description {
          margin-top: 8px;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.7;
        }

        .overview {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px);
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 20px 60px rgba(15,23,42,0.06);
          animation: fadeUp .9s ease;
        }

        .overview-header {
          padding: 30px;
          border-bottom: 1px solid #eef2f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .overview-title {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .overview-subtitle {
          margin-top: 8px;
          color: #6b7280;
          font-size: 14px;
        }

        .progress-pill {
          padding: 11px 18px;
          border-radius: 999px;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 13px;
          font-weight: 700;
          box-shadow: inset 0 0 0 1px rgba(37,99,235,.08);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 22px;
          padding: 28px;
        }

        .stat-card {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          padding: 26px;
          transition: transform .25s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-light {
          background:
            linear-gradient(
              to bottom right,
              #ffffff,
              #f8fafc
            );
          border: 1px solid #eef2f7;
        }

        .stat-primary {
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #4f46e5
            );
          color: white;
          box-shadow: 0 18px 35px rgba(37,99,235,0.20);
        }

        .stat-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .4px;
          opacity: .78;
        }

        .stat-value {
          margin-top: 14px;
          font-size: 44px;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .progress-track {
          margin-top: 18px;
          height: 10px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              #10b981,
              #22c55e
            );
          box-shadow: 0 0 14px rgba(34,197,94,0.45);
          transition: width 1s ease;
        }

        .floating-orb {
          position: fixed;
          width: 280px;
          height: 280px;
          border-radius: 999px;
          background: rgba(99,102,241,0.08);
          filter: blur(60px);
          bottom: -120px;
          left: -80px;
          z-index: -1;
          animation: pulseGlow 6s ease infinite;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 28px;
            border-radius: 28px;
          }

          .overview-header {
            padding: 24px;
          }

          .stats-grid {
            padding: 22px;
          }
        }
      `}</style>

            <div className="floating-orb" />

            <div className="dashboard-wrapper">
                <section className="hero">
                    <div className="hero-glow" />

                    <div style={{ position: "relative", zIndex: 2 }}>
                        <div className="badge">
                            🎓 Student Portal
                        </div>

                        <h1 className="hero-title">
                            Student Dashboard
                        </h1>

                        <p className="hero-description">
                            Welcome back,{" "}
                            <span>{userEmail}</span> — manage
                            courses, track academic performance,
                            and monitor your enrollment activity
                            from one place.
                        </p>
                    </div>
                </section>

                <section className="cards-grid">
                    {cards.map((card, index) => (
                        <a
                            key={card.key}
                            href={paths[card.key]}
                            className="dashboard-card"
                            onMouseEnter={() => setHovered(card.key)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                animationDelay: `${index * 0.08}s`,
                            }}
                        >
                            <div
                                className="card-icon"
                                style={{
                                    background: card.gradient,
                                    boxShadow: `0 12px 26px ${card.glow}`,
                                }}
                            >
                                {card.icon}
                            </div>

                            <div className="card-title">
                                {card.title}
                            </div>

                            <div className="card-description">
                                {card.description}
                            </div>

                            {hovered === card.key && (
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(135deg, rgba(99,102,241,.04), transparent)",
                                        pointerEvents: "none",
                                    }}
                                />
                            )}
                        </a>
                    ))}
                </section>

                <section className="overview">
                    <div className="overview-header">
                        <div>
                            <div className="overview-title">
                                Academic Overview
                            </div>

                            <div className="overview-subtitle">
                                Live academic statistics and
                                approval analytics
                            </div>
                        </div>

                        <div className="progress-pill">
                            {progress}% Progress
                        </div>
                    </div>

                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className={`stat-card ${
                                    stat.primary
                                        ? "stat-primary"
                                        : "stat-light"
                                }`}
                                style={{
                                    animation: mounted
                                        ? `fadeUp .7s ease ${index * 0.1}s both`
                                        : "none",
                                }}
                            >
                                <div className="stat-label">
                                    {stat.label}
                                </div>

                                <div className="stat-value">
                                    {typeof stat.value === "number" ? (
                                        <AnimatedCounter
                                            value={stat.value}
                                        />
                                    ) : (
                                        stat.value
                                    )}
                                </div>

                                {stat.progress && (
                                    <div className="progress-track">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: mounted
                                                    ? `${progress}%`
                                                    : 0,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}