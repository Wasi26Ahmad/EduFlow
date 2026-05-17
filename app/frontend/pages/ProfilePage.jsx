import React, { useEffect, useMemo, useState } from "react";

const profileItems = (user) => [
    {
        label: "Name",
        value: user.name,
        icon: "👤",
        accent: "#2563eb",
    },
    {
        label: "Email",
        value: user.email,
        icon: "✉️",
        accent: "#7c3aed",
    },
    {
        label: "Phone",
        value: user.phone,
        icon: "📱",
        accent: "#ea580c",
    },
    {
        label: "Address",
        value: user.address,
        icon: "📍",
        accent: "#db2777",
    },
    {
        label: "Semester",
        value: user.current_semester,
        icon: "🎓",
        accent: "#0891b2",
    },
];

export default function ProfilePage({ user }) {
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setLoaded(true);
        });

        return () => cancelAnimationFrame(timer);
    }, []);

    const cards = useMemo(() => profileItems(user), [user]);

    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(37,99,235,0.06), transparent 24%),
            radial-gradient(circle at bottom right, rgba(99,102,241,0.06), transparent 24%),
            #f8fafc;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0f172a;
          min-height: 100vh;
        }

        .profile-shell {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          padding: 30px 18px 50px;
        }

        .hero {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          padding: 24px;
          margin-bottom: 18px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.92));
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(14px);
          box-shadow:
            0 6px 20px rgba(15,23,42,0.05),
            0 1px 0 rgba(255,255,255,0.6) inset;
          transform: translateY(${loaded ? "0" : "14px"});
          opacity: ${loaded ? 1 : 0};
          transition: all 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero::before {
          content: "";
          position: absolute;
          top: -100px;
          right: -100px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(37,99,235,0.14), transparent 70%);
          animation: pulseGlow 6s ease-in-out infinite;
        }

        .hero::after {
          content: "";
          position: absolute;
          bottom: -110px;
          left: -70px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%);
          animation: floatBlob 8s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes floatBlob {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .hero-top {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          margin: 0;
          font-size: clamp(1.6rem, 3vw, 2.3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #0f172a;
        }

        .hero-subtitle {
          margin-top: 8px;
          color: #64748b;
          font-size: 0.92rem;
          max-width: 460px;
          line-height: 1.6;
        }

        .profile-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(37,99,235,0.08);
          color: #2563eb;
          font-weight: 700;
          font-size: 0.82rem;
          border: 1px solid rgba(37,99,235,0.12);
          backdrop-filter: blur(12px);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 18px;
        }

        .main-card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.75);
          padding: 22px;
          box-shadow:
            0 8px 24px rgba(15,23,42,0.05),
            0 1px 0 rgba(255,255,255,0.7) inset;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? "0" : "18px"});
          transition:
            opacity 650ms ease,
            transform 650ms ease;
        }

        .section-title {
          margin: 0 0 18px;
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
        }

        .info-card {
          position: relative;
          overflow: hidden;
          padding: 14px;
          border-radius: 18px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.95),
              rgba(248,250,252,0.92)
            );
          border: 1px solid rgba(226,232,240,0.9);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease;
          cursor: default;
        }

        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 22px rgba(15,23,42,0.06);
        }

        .info-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.55), transparent 40%);
          pointer-events: none;
        }

        .info-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .info-icon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
          transition: transform 220ms ease;
        }

        .info-card:hover .info-icon {
          transform: scale(1.06);
        }

        .info-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          font-weight: 700;
        }

        .info-value {
          font-size: 0.92rem;
          line-height: 1.45;
          font-weight: 600;
          color: #0f172a;
          word-break: break-word;
        }

        .stats-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cgpa-card {
          position: relative;
          overflow: hidden;
          padding: 22px;
          border-radius: 22px;
          background:
            linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
          box-shadow:
            0 14px 30px rgba(37,99,235,0.24);
          transform: translateY(${loaded ? "0" : "18px"});
          opacity: ${loaded ? 1 : 0};
          transition:
            opacity 650ms ease 80ms,
            transform 650ms ease 80ms;
        }

        .cgpa-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top right, rgba(255,255,255,0.22), transparent 35%);
          pointer-events: none;
        }

        .cgpa-label {
          font-size: 0.72rem;
          opacity: 0.88;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .cgpa-value {
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;
        }

        .cgpa-description {
          margin-top: 12px;
          line-height: 1.6;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.88);
        }

        .action-card {
          padding: 20px;
          border-radius: 22px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(18px);
          box-shadow:
            0 8px 24px rgba(15,23,42,0.05);
          transform: translateY(${loaded ? "0" : "18px"});
          opacity: ${loaded ? 1 : 0};
          transition:
            opacity 650ms ease 120ms,
            transform 650ms ease 120ms;
        }

        .edit-button {
          width: 100%;
          border: none;
          outline: none;
          padding: 12px 16px;
          border-radius: 14px;
          background:
            linear-gradient(135deg, #2563eb, #4f46e5);
          color: white;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition:
            transform 200ms ease,
            box-shadow 200ms ease,
            opacity 200ms ease;
          box-shadow:
            0 12px 24px rgba(37,99,235,0.24);
        }

        .edit-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 16px 28px rgba(37,99,235,0.3);
        }

        .edit-button:active {
          transform: scale(0.98);
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
          animation: ping 1.8s infinite;
        }

        @keyframes ping {
          0% {
            box-shadow: 0 0 0 0 rgba(34,197,94,0.45);
          }

          70% {
            box-shadow: 0 0 0 10px rgba(34,197,94,0);
          }

          100% {
            box-shadow: 0 0 0 0 rgba(34,197,94,0);
          }
        }

        .mini-stat {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(248,250,252,0.92);
          border: 1px solid rgba(226,232,240,0.9);
        }

        .mini-stat-title {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 700;
        }

        .mini-stat-value {
          font-size: 0.96rem;
          font-weight: 800;
          color: #0f172a;
        }

        @media (max-width: 920px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .stats-panel {
            order: -1;
          }
        }

        @media (max-width: 640px) {
          .profile-shell {
            padding: 20px 14px 36px;
          }

          .hero,
          .main-card,
          .cgpa-card,
          .action-card {
            border-radius: 18px;
          }

          .hero {
            padding: 20px;
          }

          .main-card {
            padding: 18px;
          }

          .cgpa-card {
            padding: 18px;
          }
        }
      `}</style>

            <div className="profile-shell">
                <section className="hero">
                    <div className="hero-top">
                        <div>
                            <h1 className="hero-title">My Profile</h1>

                            <p className="hero-subtitle">
                                Personal information and academic overview in a fast,
                                responsive React dashboard.
                            </p>
                        </div>

                        <div className="profile-badge">
                            <span className="live-dot" />
                            Active Student
                        </div>
                    </div>
                </section>

                <div className="content-grid">
                    <div className="main-card">
                        <h2 className="section-title">Profile Information</h2>

                        <div className="info-grid">
                            {cards.map((item, index) => (
                                <div
                                    key={item.label}
                                    className="info-card"
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{
                                        borderColor:
                                            hovered === index
                                                ? `${item.accent}33`
                                                : "rgba(226,232,240,0.9)",
                                    }}
                                >
                                    <div className="info-top">
                                        <div
                                            className="info-icon"
                                            style={{
                                                background: `${item.accent}15`,
                                                color: item.accent,
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        <div className="info-label">{item.label}</div>
                                    </div>

                                    <div className="info-value">{item.value || "—"}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stats-panel">
                        <div className="cgpa-card">
                            <div className="cgpa-label">Current CGPA</div>

                            <div className="cgpa-value">
                                {user.cgpa || "0.00"}
                            </div>

                            <div className="cgpa-description">
                                Your current CGPA is only a number don't beat yourself too hard or praise yourself too hard
                            </div>
                        </div>

                        <div className="action-card">
                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: 14,
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                }}
                            >
                                Quick Actions
                            </h3>

                            <a
                                href={user.edit_profile_path}
                                className="edit-button"
                            >
                                ✨ Edit Profile
                            </a>

                            <div className="mini-stat">
                                <div>
                                    <div className="mini-stat-title">
                                        Current Semester
                                    </div>

                                    <div className="mini-stat-value">
                                        {user.current_semester || "N/A"}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    🎓
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}