import React, { useEffect, useMemo, useState } from "react";

const STATUS_STYLES = {
    approved: {
        bg: "#dcfce7",
        text: "#166534",
        glow: "rgba(34,197,94,0.18)",
    },
    rejected: {
        bg: "#fee2e2",
        text: "#991b1b",
        glow: "rgba(239,68,68,0.18)",
    },
    pending: {
        bg: "#fef3c7",
        text: "#92400e",
        glow: "rgba(245,158,11,0.18)",
    },
};

export default function EnrollmentRequestsPage({
                                                   enrollments,
                                                   total_requests,
                                                   pending_requests,
                                                   is_admin,
                                                   csrf_token,
                                               }) {
    const [mounted, setMounted] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const t = requestAnimationFrame(() => {
            setMounted(true);
        });

        return () => cancelAnimationFrame(t);
    }, []);

    const stats = useMemo(() => {
        return {
            approved: enrollments.filter((e) => e.status === "approved").length,
            rejected: enrollments.filter((e) => e.status === "rejected").length,
        };
    }, [enrollments]);

    const submitStatus = async (path) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = path;

        const methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        methodInput.value = "patch";

        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "authenticity_token";
        csrfInput.value = csrf_token;

        form.appendChild(methodInput);
        form.appendChild(csrfInput);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div
            style={{
                maxWidth: 1150,
                margin: "34px auto",
                padding: "0 18px 80px",
                fontFamily:
                    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            {/* HERO */}
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 34,
                    padding: "34px",
                    background:
                        "linear-gradient(135deg,#0f172a 0%, #111827 38%, #1d4ed8 100%)",
                    boxShadow: "0 28px 70px rgba(37,99,235,0.20)",
                    marginBottom: 28,
                    transform: mounted ? "translateY(0px)" : "translateY(16px)",
                    opacity: mounted ? 1 : 0,
                    transition:
                        "transform .7s cubic-bezier(.22,1,.36,1), opacity .7s ease",
                }}
            >
                {/* Animated Background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(circle at top right, rgba(96,165,250,.25), transparent 28%)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 340,
                        height: 340,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        top: -120,
                        right: -90,
                        filter: "blur(12px)",
                        animation: "floatOrb 8s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                        bottom: -70,
                        left: -40,
                        filter: "blur(8px)",
                        animation: "floatOrbReverse 10s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 28,
                        flexWrap: "wrap",
                    }}
                >
                    {/* LEFT */}
                    <div style={{ flex: 1, minWidth: 280 }}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 14px",
                                borderRadius: 999,
                                background: "rgba(255,255,255,.10)",
                                backdropFilter: "blur(14px)",
                                color: "white",
                                fontSize: 11,
                                fontWeight: 800,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                marginBottom: 18,
                                border: "1px solid rgba(255,255,255,.08)",
                            }}
                        >
                            🎓 Enrollment Administration
                        </div>

                        <h1
                            style={{
                                fontSize: "clamp(34px, 6vw, 48px)",
                                lineHeight: 1,
                                fontWeight: 900,
                                margin: "0 0 14px",
                                color: "white",
                                letterSpacing: "-2px",
                            }}
                        >
                            Enrollment Requests
                        </h1>

                        <p
                            style={{
                                maxWidth: 620,
                                color: "rgba(255,255,255,.78)",
                                lineHeight: 1.8,
                                fontSize: 15,
                                margin: 0,
                            }}
                        >
                            Review, approve, and manage student course enrollment requests
                            across all semesters from a centralized academic dashboard.
                        </p>
                    </div>

                    {/* STATS */}
                    <div
                        style={{
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                            alignItems: "stretch",
                        }}
                    >
                        <StatCard
                            label="Total Requests"
                            value={total_requests}
                            delay={0}
                        />

                        <StatCard
                            label="Pending"
                            value={pending_requests}
                            delay={120}
                        />

                        <StatCard
                            label="Approved"
                            value={stats.approved}
                            delay={240}
                        />
                    </div>
                </div>
            </div>

            {/* EMPTY */}
            {enrollments.length === 0 ? (
                <div
                    style={{
                        background: "rgba(255,255,255,.82)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(229,231,235,.85)",
                        borderRadius: 34,
                        padding: "90px 28px",
                        textAlign: "center",
                        boxShadow: "0 18px 50px rgba(15,23,42,.06)",
                        animation: "fadeIn .7s ease",
                    }}
                >
                    <div
                        style={{
                            fontSize: 72,
                            marginBottom: 16,
                        }}
                    >
                        ✅
                    </div>

                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 900,
                            color: "#111827",
                            letterSpacing: "-1px",
                        }}
                    >
                        You're All Caught Up
                    </div>

                    <div
                        style={{
                            maxWidth: 540,
                            margin: "14px auto 0",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            fontSize: 15,
                        }}
                    >
                        There are currently no enrollment requests waiting for review.
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gap: 22,
                    }}
                >
                    {enrollments.map((e, index) => {
                        const style =
                            STATUS_STYLES[e.status] || STATUS_STYLES.pending;

                        return (
                            <div
                                key={e.id}
                                onMouseEnter={() => setHovered(e.id)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: 30,
                                    padding: 28,
                                    background: "rgba(255,255,255,.84)",
                                    backdropFilter: "blur(18px)",
                                    border: "1px solid rgba(229,231,235,.8)",
                                    boxShadow:
                                        hovered === e.id
                                            ? `0 24px 60px ${style.glow}`
                                            : "0 14px 40px rgba(15,23,42,.05)",
                                    transform:
                                        hovered === e.id
                                            ? "translateY(-4px)"
                                            : "translateY(0px)",
                                    transition: "all .28s ease",
                                    opacity: mounted ? 1 : 0,
                                    animation: `cardEnter .55s ease forwards`,
                                    animationDelay: `${index * 60}ms`,
                                }}
                            >
                                {/* glow */}
                                <div
                                    style={{
                                        position: "absolute",
                                        width: 220,
                                        height: 220,
                                        borderRadius: "50%",
                                        background: "rgba(37,99,235,.06)",
                                        top: -100,
                                        right: -90,
                                    }}
                                />

                                <div style={{ position: "relative", zIndex: 2 }}>
                                    {/* TOP */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 24,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {/* LEFT */}
                                        <div style={{ flex: 1, minWidth: 260 }}>
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    padding: "7px 13px",
                                                    borderRadius: 999,
                                                    background: "#eef2ff",
                                                    color: "#4338ca",
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    marginBottom: 16,
                                                    letterSpacing: ".05em",
                                                }}
                                            >
                                                📘 Enrollment Request
                                            </div>

                                            <h2
                                                style={{
                                                    margin: 0,
                                                    fontSize: 28,
                                                    fontWeight: 900,
                                                    color: "#111827",
                                                    letterSpacing: "-1px",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {e.course_title}
                                            </h2>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 12,
                                                    marginTop: 16,
                                                }}
                                            >
                                                <InfoChip>
                                                    👤 <strong>{e.student_email}</strong>
                                                </InfoChip>

                                                <InfoChip>
                                                    📚 <strong>{e.course_code}</strong>
                                                </InfoChip>

                                                {e.semester && (
                                                    <div
                                                        style={{
                                                            padding: "10px 14px",
                                                            borderRadius: 16,
                                                            background: "#eff6ff",
                                                            border: "1px solid #dbeafe",
                                                            color: "#1d4ed8",
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        🎓 Semester {e.semester}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-end",
                                                gap: 14,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "10px 16px",
                                                    borderRadius: 999,
                                                    background: style.bg,
                                                    color: style.text,
                                                    fontSize: 12,
                                                    fontWeight: 900,
                                                    textTransform: "capitalize",
                                                    boxShadow:
                                                        "inset 0 1px 0 rgba(255,255,255,.6)",
                                                }}
                                            >
                                                ● {e.status}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Enrollment ID{" "}
                                                <span style={{ color: "#111827" }}>
                          #{e.id}
                        </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* divider */}
                                    <div
                                        style={{
                                            height: 1,
                                            background: "#f1f5f9",
                                            margin: "24px 0",
                                        }}
                                    />

                                    {/* BOTTOM */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 24,
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* teacher */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 14,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 54,
                                                    height: 54,
                                                    borderRadius: 18,
                                                    background:
                                                        "linear-gradient(135deg,#2563eb,#4f46e5)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "white",
                                                    fontWeight: 900,
                                                    fontSize: 18,
                                                    boxShadow:
                                                        "0 12px 24px rgba(37,99,235,.20)",
                                                }}
                                            >
                                                {e.teacher_email?.charAt(0)?.toUpperCase()}
                                            </div>

                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: 11,
                                                        color: "#6b7280",
                                                        fontWeight: 800,
                                                        letterSpacing: ".06em",
                                                        textTransform: "uppercase",
                                                        marginBottom: 5,
                                                    }}
                                                >
                                                    Assigned Teacher
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: 700,
                                                        color: "#111827",
                                                    }}
                                                >
                                                    {e.teacher_email}
                                                </div>
                                            </div>
                                        </div>

                                        {/* actions */}
                                        {is_admin && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: 12,
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <ActionButton
                                                    label="✓ Approve"
                                                    type="approve"
                                                    onClick={() =>
                                                        submitStatus(e.approve_path)
                                                    }
                                                />

                                                <ActionButton
                                                    label="✕ Reject"
                                                    type="reject"
                                                    onClick={() =>
                                                        submitStatus(e.reject_path)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style>{`
        @keyframes floatOrb {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(16px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes floatOrbReverse {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        * {
          box-sizing: border-box;
        }

        button:hover {
          transform: translateY(-2px);
        }

        button:active {
          transform: scale(.98);
        }

        @media (max-width: 720px) {
          .hero-stack {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
}

function StatCard({ label, value, delay }) {
    return (
        <div
            style={{
                minWidth: 165,
                padding: 22,
                borderRadius: 24,
                background: "rgba(255,255,255,.10)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,.08)",
                color: "white",
                animation: `cardEnter .55s ease forwards`,
                animationDelay: `${delay}ms`,
                opacity: 0,
            }}
        >
            <div
                style={{
                    fontSize: 11,
                    fontWeight: 800,
                    opacity: 0.78,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    marginBottom: 10,
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: 38,
                    fontWeight: 900,
                    lineHeight: 1,
                }}
            >
                {value}
            </div>
        </div>
    );
}

function InfoChip({ children }) {
    return (
        <div
            style={{
                padding: "10px 14px",
                borderRadius: 16,
                background: "#f8fafc",
                border: "1px solid #eef2f7",
                color: "#374151",
                fontSize: 13,
            }}
        >
            {children}
        </div>
    );
}

function ActionButton({ label, type, onClick }) {
    const approve = type === "approve";

    return (
        <button
            onClick={onClick}
            style={{
                border: "none",
                cursor: "pointer",
                padding: "12px 18px",
                borderRadius: 16,
                color: "white",
                fontWeight: 800,
                fontSize: 13,
                transition: "all .22s ease",
                background: approve
                    ? "linear-gradient(135deg,#10b981,#059669)"
                    : "linear-gradient(135deg,#ef4444,#dc2626)",
                boxShadow: approve
                    ? "0 10px 24px rgba(16,185,129,.18)"
                    : "0 10px 24px rgba(239,68,68,.18)",
            }}
        >
            {label}
        </button>
    );
}