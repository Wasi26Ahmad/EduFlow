import React, { useEffect, useMemo, useState } from "react";

const floatingAnimation = `
@keyframes floatOrb {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-14px) translateX(8px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 rgba(59,130,246,0);
  }
  50% {
    box-shadow: 0 0 16px rgba(59,130,246,0.14);
  }
  100% {
    box-shadow: 0 0 0 rgba(59,130,246,0);
  }
}
`;

const statusColors = {
    submitted: {
        bg: "rgba(34,197,94,0.12)",
        color: "#16a34a",
        border: "rgba(34,197,94,0.24)",
    },
    pending: {
        bg: "rgba(245,158,11,0.12)",
        color: "#d97706",
        border: "rgba(245,158,11,0.24)",
    },
    failed: {
        bg: "rgba(239,68,68,0.12)",
        color: "#dc2626",
        border: "rgba(239,68,68,0.24)",
    },
};

export default function CTMarksPage({ attempts }) {
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredAttempts = useMemo(() => {
        return attempts.filter((attempt) => {
            const text = `
        ${attempt.test_title}
        ${attempt.course_title}
        ${attempt.semester}
        ${attempt.status}
      `.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [attempts, search]);

    const averagePercentage = useMemo(() => {
        if (!attempts.length) return 0;

        const total = attempts.reduce(
            (sum, item) => sum + Number(item.percentage),
            0
        );

        return (total / attempts.length).toFixed(2);
    }, [attempts]);

    return (
        <>
            <style>{floatingAnimation}</style>

            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eef2ff 100%)",
                    color: "#0f172a",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily:
                        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
                }}
            >
                {/* Background Effects */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        left: "-80px",
                        width: "220px",
                        height: "220px",
                        background: "rgba(59,130,246,0.08)",
                        filter: "blur(70px)",
                        borderRadius: "999px",
                        animation: "floatOrb 8s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        bottom: "-100px",
                        right: "-80px",
                        width: "240px",
                        height: "240px",
                        background: "rgba(139,92,246,0.08)",
                        filter: "blur(80px)",
                        borderRadius: "999px",
                        animation: "floatOrb 10s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                        padding: "24px 16px 50px",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            marginBottom: "24px",
                            animation: mounted
                                ? "fadeSlideUp 0.6s ease forwards"
                                : "none",
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "7px 12px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.7)",
                                border: "1px solid rgba(148,163,184,0.18)",
                                backdropFilter: "blur(12px)",
                                marginBottom: "14px",
                            }}
                        >
                            <div
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "999px",
                                    background: "#3b82f6",
                                    animation: "pulseGlow 2s infinite",
                                }}
                            />

                            <span
                                style={{
                                    fontSize: "11px",
                                    color: "#334155",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                STUDENT PERFORMANCE DASHBOARD
                            </span>
                        </div>

                        <h1
                            style={{
                                fontSize: "34px",
                                fontWeight: 800,
                                margin: 0,
                                letterSpacing: "-1.5px",
                            }}
                        >
                            CT Marks
                        </h1>

                        <p
                            style={{
                                marginTop: "10px",
                                color: "#475569",
                                fontSize: "13px",
                                maxWidth: "580px",
                                lineHeight: 1.7,
                            }}
                        >
                            View your continuous assessment performance with a clean,
                            modern dashboard.
                        </p>
                    </div>

                    {/* Stats */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                            gap: "12px",
                            marginBottom: "20px",
                        }}
                    >
                        <StatCard
                            title="Total CTs"
                            value={attempts.length}
                            delay="0.1s"
                        />

                        <StatCard
                            title="Average Percentage"
                            value={`${averagePercentage}%`}
                            delay="0.2s"
                        />

                        <StatCard
                            title="Highest Marks"
                            value={
                                attempts.length
                                    ? `${Math.max(
                                        ...attempts.map((a) => Number(a.obtained_marks))
                                    )}`
                                    : "0"
                            }
                            delay="0.3s"
                        />
                    </div>

                    {/* Search */}
                    <div
                        style={{
                            marginBottom: "20px",
                            animation: "fadeSlideUp 0.6s ease forwards",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                borderRadius: "14px",
                                border: "1px solid rgba(148,163,184,0.22)",
                                background: "rgba(255,255,255,0.8)",
                                backdropFilter: "blur(12px)",
                                color: "#0f172a",
                                fontSize: "13px",
                                outline: "none",
                                transition: "all 0.25s ease",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* Empty State */}
                    {!filteredAttempts.length && (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "50px 16px",
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.72)",
                                border: "1px solid rgba(148,163,184,0.16)",
                                backdropFilter: "blur(14px)",
                                animation: "fadeSlideUp 0.6s ease forwards",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "42px",
                                    marginBottom: "14px",
                                }}
                            >
                                📘
                            </div>

                            <h2
                                style={{
                                    marginBottom: "8px",
                                    fontSize: "20px",
                                }}
                            >
                                No CT marks available
                            </h2>

                            <p
                                style={{
                                    color: "#64748b",
                                    fontSize: "13px",
                                }}
                            >
                                Your marks will appear here once tests are completed.
                            </p>
                        </div>
                    )}

                    {/* Cards */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "14px",
                        }}
                    >
                        {filteredAttempts.map((attempt, index) => {
                            const percentage = Number(attempt.percentage);

                            const status =
                                statusColors[attempt.status?.toLowerCase()] || {
                                    bg: "rgba(59,130,246,0.12)",
                                    color: "#2563eb",
                                    border: "rgba(59,130,246,0.24)",
                                };

                            return (
                                <div
                                    key={attempt.id}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: "20px",
                                        padding: "18px",
                                        background: "rgba(255,255,255,0.78)",
                                        border: "1px solid rgba(148,163,184,0.16)",
                                        backdropFilter: "blur(16px)",
                                        transition: "all 0.28s ease",
                                        animation: `fadeSlideUp 0.5s ease forwards`,
                                        animationDelay: `${index * 0.06}s`,
                                        opacity: 0,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-4px)";
                                        e.currentTarget.style.border =
                                            "1px solid rgba(59,130,246,0.22)";
                                        e.currentTarget.style.boxShadow =
                                            "0 12px 30px rgba(15,23,42,0.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0px)";
                                        e.currentTarget.style.border =
                                            "1px solid rgba(148,163,184,0.16)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {/* Glow */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "radial-gradient(circle at top right, rgba(59,130,246,0.06), transparent 55%)",
                                            pointerEvents: "none",
                                        }}
                                    />

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            marginBottom: "16px",
                                            gap: "10px",
                                        }}
                                    >
                                        <div>
                                            <h2
                                                style={{
                                                    margin: 0,
                                                    fontSize: "18px",
                                                    fontWeight: 800,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {attempt.test_title}
                                            </h2>

                                            <p
                                                style={{
                                                    marginTop: "6px",
                                                    marginBottom: 0,
                                                    color: "#64748b",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {attempt.course_title}
                                            </p>
                                        </div>

                                        <div
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: "999px",
                                                background: status.bg,
                                                border: `1px solid ${status.border}`,
                                                color: status.color,
                                                fontWeight: 700,
                                                fontSize: "10px",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.5px",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {attempt.status}
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div style={{ marginBottom: "18px" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: "8px",
                                                fontSize: "11px",
                                                color: "#64748b",
                                            }}
                                        >
                                            <span>Performance</span>
                                            <span>{percentage}%</span>
                                        </div>

                                        <div
                                            style={{
                                                width: "100%",
                                                height: "8px",
                                                borderRadius: "999px",
                                                background: "#e2e8f0",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${percentage}%`,
                                                    height: "100%",
                                                    borderRadius: "999px",
                                                    background:
                                                        "linear-gradient(90deg, #3b82f6, #6366f1)",
                                                    transition: "width 1s ease",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "10px",
                                        }}
                                    >
                                        <InfoCard
                                            label="Semester"
                                            value={attempt.semester}
                                        />

                                        <InfoCard
                                            label="Marks"
                                            value={`${attempt.obtained_marks} / ${attempt.total_marks}`}
                                        />

                                        <InfoCard
                                            label="Percentage"
                                            value={`${attempt.percentage}%`}
                                        />

                                        <InfoCard
                                            label="Submitted"
                                            value={attempt.submitted_at || "N/A"}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({ title, value, delay }) {
    return (
        <div
            style={{
                padding: "16px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.78)",
                border: "1px solid rgba(148,163,184,0.16)",
                backdropFilter: "blur(14px)",
                animation: `fadeSlideUp 0.5s ease forwards`,
                animationDelay: delay,
                opacity: 0,
            }}
        >
            <p
                style={{
                    margin: 0,
                    marginBottom: "6px",
                    color: "#64748b",
                    fontSize: "11px",
                }}
            >
                {title}
            </p>

            <h2
                style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                }}
            >
                {value}
            </h2>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div
            style={{
                padding: "12px",
                borderRadius: "14px",
                background: "#f8fafc",
                border: "1px solid rgba(148,163,184,0.14)",
            }}
        >
            <p
                style={{
                    margin: 0,
                    marginBottom: "5px",
                    color: "#64748b",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                }}
            >
                {label}
            </p>

            <p
                style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 700,
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                    color: "#0f172a",
                }}
            >
                {value}
            </p>
        </div>
    );
}