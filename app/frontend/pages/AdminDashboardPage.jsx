import React, { useEffect, useMemo, useState } from "react";

const modules = [
    {
        title: "Manage Users",
        description: "Approve accounts, roles, and permissions.",
        icon: "👥",
        gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        glow: "rgba(37,99,235,0.18)",
        bg: "rgba(37,99,235,0.10)",
        routeKey: "users",
    },
    {
        title: "Enrollments",
        description: "Review and approve student enrollments.",
        icon: "📚",
        gradient: "linear-gradient(135deg, #10b981, #059669)",
        glow: "rgba(16,185,129,0.18)",
        bg: "rgba(16,185,129,0.10)",
        routeKey: "enrollments",
    },
    {
        title: "Results",
        description: "Validate and publish academic results.",
        icon: "📊",
        gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
        glow: "rgba(245,158,11,0.18)",
        bg: "rgba(245,158,11,0.10)",
        routeKey: "results",
    },
    {
        title: "Course Analytics",
        description: "Revenue, enrollments, payments & performance.",
        icon: "💰",
        gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
        glow: "rgba(124,58,237,0.18)",
        bg: "rgba(124,58,237,0.10)",
        routeKey: "analytics",
    },
    {
        title: "Browse Courses",
        description: "Explore available courses, subjects, and academic offerings.",
        icon: "C",
        gradient: "linear-gradient(135deg, #cb57eb, #9630d1)",
        glow: "rgba(96, 165, 250, 0.28)",
        dark: false,
        bg: "rgb(234 212 246 / 0.98)",
        textColor: "#1e3a8a",
        descriptionColor: "#475569",
        routeKey: "courses",
    },
];

export default function AdminDashboardPage({
                                               currentUser,
                                               routes,
                                           }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const floatingOrbs = useMemo(
        () => [
            {
                width: 240,
                height: 240,
                top: "-90px",
                left: "-90px",
                background:
                    "radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)",
                animationDuration: "10s",
            },
            {
                width: 180,
                height: 180,
                bottom: "-60px",
                right: "-40px",
                background:
                    "radial-gradient(circle, rgba(147,197,253,0.12), transparent 70%)",
                animationDuration: "10s",
            },
        ],
        []
    );

    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }

        @keyframes floatOrb {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-18px) translateX(14px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        .dashboard-shell {
          position: relative;
          overflow: hidden;

          max-width: 1120px;
          margin: 0 auto;
          padding: 8px 8px 36px;

          font-family:
            Inter,
            system-ui,
            -apple-system,
            sans-serif;
        }

        .dashboard-shell::before {
          content: "";

          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at top left,
              rgba(59,130,246,0.04),
              transparent 24%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(147,197,253,0.05),
              transparent 28%
            );

          pointer-events: none;
          z-index: 0;
        }

        .floating-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(18px);

          animation-name: floatOrb;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;

          z-index: 0;
        }

        .hero-card {
          position: relative;
          overflow: hidden;

          border-radius: 24px;

          padding: 26px 28px;
FFFFFFFF
          margin-bottom: 24px;

          background: rgba(255,255,255,0.72);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border: 1px solid rgba(255,255,255,0.75);

          box-shadow:
            0 10px 30px rgba(15,23,42,0.06);

          animation: fadeUp 0.7s ease;

          z-index: 1;
        }

        .hero-glow {
          position: absolute;

          width: 320px;
          height: 320px;

          right: -120px;
          top: -120px;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              rgba(59,130,246,0.08),
              transparent 70%
            );

          filter: blur(8px);

          pointer-events: none;
        }

        .hero-top {
          position: relative;
          z-index: 2;

          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 18px;
          flex-wrap: wrap;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 6px 12px;

          border-radius: 999px;

          background: rgba(37,99,235,0.08);

          color: #2563eb;

          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;

          margin-bottom: 14px;

          border: 1px solid rgba(59,130,246,0.10);
        }

        .hero-title {
          margin: 0;

          font-size: clamp(28px, 5vw, 42px);

          line-height: 1.05;

          letter-spacing: -1.5px;

          font-weight: 900;

          color: #0f172a;
        }

        .hero-description {
          margin-top: 12px;

          max-width: 560px;

          color: #64748b;

          font-size: 14px;

          line-height: 1.7;
        }

        .metrics-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          margin-top: 18px;
        }

        .metric-pill {
          padding: 9px 13px;

          border-radius: 12px;

          background: rgba(255,255,255,0.7);

          border: 1px solid rgba(255,255,255,0.85);

          font-size: 12px;
          font-weight: 700;

          color: #475569;

          box-shadow:
            0 6px 16px rgba(15,23,42,0.04);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .metric-pill:hover {
          transform: translateY(-2px);
        }

        .user-card {
          min-width: 240px;

          border-radius: 18px;

          padding: 16px 18px;

          background: rgba(255,255,255,0.72);

          border: 1px solid rgba(255,255,255,0.8);

          backdrop-filter: blur(12px);

          box-shadow:
            0 8px 22px rgba(15,23,42,0.05);
        }

        .user-label {
          font-size: 10px;

          text-transform: uppercase;

          letter-spacing: 0.7px;

          font-weight: 800;

          color: #94a3b8;

          margin-bottom: 6px;
        }

        .user-email {
          font-size: 13px;

          font-weight: 700;

          color: #0f172a;

          word-break: break-word;
        }

        .status-pill {
          margin-top: 12px;

          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 7px 11px;

          border-radius: 999px;

          background: rgba(16,185,129,0.08);

          color: #059669;

          font-size: 11px;
          font-weight: 800;

          border: 1px solid rgba(16,185,129,0.12);
        }

        .status-dot {
          width: 7px;
          height: 7px;

          border-radius: 999px;

          background: #10b981;

          animation: pulseGlow 1.6s infinite ease-in-out;
        }

        .section-row {
          margin-bottom: 16px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          flex-wrap: wrap;
          gap: 10px;

          animation: fadeUp 0.9s ease;
        }

        .section-title {
          margin: 0;

          font-size: 20px;

          font-weight: 800;

          color: #0f172a;
        }

        .section-subtitle {
          margin-top: 4px;

          color: #64748b;

          font-size: 13px;
        }

        .grid {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(auto-fit, minmax(240px, 1fr));

          gap: 16px;
        }

        .module-card {
          position: relative;

          overflow: hidden;

          border-radius: 22px;

          padding: 20px;

          background: rgba(255,255,255,0.72);

          backdrop-filter: blur(14px);

          border: 1px solid rgba(255,255,255,0.82);

          box-shadow:
            0 8px 24px rgba(15,23,42,0.05);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;

          cursor: pointer;

          opacity: 0;

          transform: translateY(18px);
        }

        .module-card.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .module-card:hover {
          transform: translateY(-5px);

          box-shadow:
            0 16px 36px rgba(15,23,42,0.10);
        }

        .module-icon {
          width: 52px;
          height: 52px;

          border-radius: 16px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 24px;

          margin-bottom: 14px;

          transition: transform 0.25s ease;
        }

        .module-card:hover .module-icon {
          transform: scale(1.06);
        }

        .module-title {
          font-size: 17px;

          font-weight: 800;

          margin-bottom: 8px;
        }

        .module-description {
          font-size: 13px;

          line-height: 1.6;

          margin-bottom: 18px;
        }

        .module-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 10px 14px;

          border-radius: 12px;

          text-decoration: none;

          font-size: 12px;

          font-weight: 800;

          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .module-button:hover {
          transform: translateX(2px);
          opacity: 0.95;
        }

        .module-button-arrow {
          transition: transform 0.2s ease;
        }

        .module-button:hover .module-button-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .dashboard-shell {
            padding-bottom: 24px;
          }

          .hero-card {
            padding: 22px;
          }

          .hero-top {
            flex-direction: column;
            align-items: stretch;
          }

          .user-card {
            width: 100%;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 34px;
          }
        }
      `}</style>

            <div className="dashboard-shell">

                {floatingOrbs.map((orb, index) => (
                    <div
                        key={index}
                        className="floating-orb"
                        style={{
                            ...orb,
                            animationDuration: orb.animationDuration,
                        }}
                    />
                ))}

                <div className="hero-card">

                    <div className="hero-glow" />

                    <div className="hero-top">

                        <div>
                            <div className="hero-badge">
                                ⚡ PLATFORM CONTROL CENTER
                            </div>

                            <h1 className="hero-title">
                                Admin Dashboard
                            </h1>

                            <p className="hero-description">
                                Manage users, enrollments, results,
                                courses, and analytics from one
                                streamlined platform.
                            </p>

                            <div className="metrics-row">
                                <div className="metric-pill">
                                     Real-time
                                </div>

                                <div className="metric-pill">
                                     Secure
                                </div>

                                <div className="metric-pill">
                                     Analytics
                                </div>
                            </div>
                        </div>

                        <div className="user-card">
                            <div className="user-label">
                                Logged In
                            </div>

                            <div className="user-email">
                                {currentUser?.email}
                            </div>

                            <div className="status-pill">
                                <div className="status-dot" />
                                System Active
                            </div>
                        </div>

                    </div>
                </div>

                <div className="section-row">
                    <div>
                        <h2 className="section-title">
                            Management Modules
                        </h2>

                        <div className="section-subtitle">
                            Quick administrative access
                        </div>
                    </div>
                </div>

                <div className="grid">

                    {modules.map((module, index) => {
                        const isDark = module.dark;

                        return (
                            <div
                                key={module.title}
                                className={`module-card ${loaded ? "loaded" : ""}`}
                                style={{
                                    transitionDelay: `${index * 90}ms`,
                                    background: isDark
                                        ? module.gradient
                                        : "rgba(255,255,255,0.72)",
                                }}
                                onClick={() => {
                                    window.location.href =
                                        routes?.[module.routeKey];
                                }}
                            >
                                <div
                                    className="module-icon"
                                    style={{
                                        background: module.bg,
                                    }}
                                >
                                    {module.icon}
                                </div>

                                <div
                                    className="module-title"
                                    style={{
                                        color: isDark
                                            ? "#ffffff"
                                            : "#0f172a",
                                    }}
                                >
                                    {module.title}
                                </div>

                                <div
                                    className="module-description"
                                    style={{
                                        color: isDark
                                            ? "rgba(255,255,255,0.75)"
                                            : "#64748b",
                                    }}
                                >
                                    {module.description}
                                </div>

                                <a
                                    href={routes?.[module.routeKey]}
                                    className="module-button"
                                    style={{
                                        background: isDark
                                            ? "#ffffff"
                                            : module.gradient,
                                        color: isDark
                                            ? "#0f172a"
                                            : "#ffffff",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Open
                                    <span className="module-button-arrow">
                                        →
                                    </span>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}