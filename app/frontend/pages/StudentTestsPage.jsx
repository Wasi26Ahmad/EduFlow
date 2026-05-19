import React, { useEffect, useMemo, useState } from "react";

const floatingAnimation = `
@keyframes floatBlob {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-16px) translateX(8px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 rgba(99,102,241,0);
  }
  50% {
    box-shadow: 0 0 24px rgba(99,102,241,0.22);
  }
  100% {
    box-shadow: 0 0 0 rgba(99,102,241,0);
  }
}
`;

const glassCard = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.5)",
    boxShadow: "0 8px 28px rgba(15,23,42,0.08)",
};

const badgeStyle = {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "0.74rem",
    fontWeight: 700,
    background: "rgba(99,102,241,0.10)",
    color: "#4338ca",
    border: "1px solid rgba(99,102,241,0.15)",
};

export default function StudentTestsPage({ tests = [] }) {
    const [search, setSearch] = useState("");
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = floatingAnimation;
        document.head.appendChild(style);

        return () => document.head.removeChild(style);
    }, []);

    const filteredTests = useMemo(() => {
        return tests.filter((test) => {
            const query = search.toLowerCase();

            return (
                test.title.toLowerCase().includes(query) ||
                test.course.title.toLowerCase().includes(query)
            );
        });
    }, [tests, search]);

    return (
        <div
            style={{
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                background:
                    "linear-gradient(135deg, #eef2ff 0%, #f8fafc 40%, #ecfeff 100%)",
                padding: "30px 20px 55px",
            }}
        >
            {/* Floating Background Effects */}
            <div
                style={{
                    position: "absolute",
                    top: -90,
                    right: -90,
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background: "rgba(99,102,241,0.18)",
                    filter: "blur(40px)",
                    animation: "floatBlob 8s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    bottom: -100,
                    left: -90,
                    width: 290,
                    height: 290,
                    borderRadius: "50%",
                    background: "rgba(6,182,212,0.18)",
                    filter: "blur(50px)",
                    animation: "floatBlob 10s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    maxWidth: 1120,
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* Header */}
                <div
                    style={{
                        marginBottom: 26,
                        animation: "fadeUp 0.5s ease",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: "2.45rem",
                                    fontWeight: 900,
                                    color: "#0f172a",
                                    letterSpacing: "-1px",
                                }}
                            >
                                Available Tests
                            </h1>

                            <p
                                style={{
                                    marginTop: 8,
                                    color: "#475569",
                                    fontSize: "0.95rem",
                                }}
                            >
                                View all active tests and access them instantly.
                            </p>
                        </div>

                        <div
                            style={{
                                ...glassCard,
                                borderRadius: 16,
                                padding: 8,
                                width: 280,
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search by test or course..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontSize: "0.9rem",
                                    color: "#0f172a",
                                    padding: "8px 12px",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {filteredTests.length === 0 ? (
                    <div
                        style={{
                            ...glassCard,
                            borderRadius: 22,
                            padding: "55px 24px",
                            textAlign: "center",
                            animation: "fadeUp 0.5s ease",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "3.2rem",
                                marginBottom: 12,
                            }}
                        >
                            📚
                        </div>

                        <h2
                            style={{
                                margin: 0,
                                color: "#0f172a",
                                fontSize: "1.7rem",
                            }}
                        >
                            No Available Tests
                        </h2>

                        <p
                            style={{
                                color: "#64748b",
                                marginTop: 12,
                                fontSize: "0.95rem",
                            }}
                        >
                            Tests will appear here when they become available.
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: 18,
                        }}
                    >
                        {filteredTests.map((test, index) => {
                            const isHovered = hoveredCard === test.id;

                            return (
                                <div
                                    key={test.id}
                                    onMouseEnter={() => setHoveredCard(test.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        ...glassCard,
                                        borderRadius: 22,
                                        padding: 22,
                                        position: "relative",
                                        overflow: "hidden",
                                        transition: "all 0.32s ease",
                                        transform: isHovered
                                            ? "translateY(-5px) scale(1.015)"
                                            : "translateY(0px)",
                                        animation: `fadeUp 0.45s ease ${
                                            index * 0.06
                                        }s backwards`,
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))",
                                            opacity: isHovered ? 1 : 0,
                                            transition: "0.35s ease",
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "relative",
                                            zIndex: 2,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                gap: 14,
                                                marginBottom: 16,
                                            }}
                                        >
                                            <div>
                                                <h2
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "1.22rem",
                                                        fontWeight: 800,
                                                        color: "#0f172a",
                                                        lineHeight: 1.3,
                                                    }}
                                                >
                                                    {test.title}
                                                </h2>

                                                <p
                                                    style={{
                                                        marginTop: 8,
                                                        color: "#475569",
                                                        fontWeight: 600,
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {test.course.title}
                                                </p>
                                            </div>

                                            <div style={badgeStyle}>Test</div>
                                        </div>

                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: 12,
                                                marginBottom: 20,
                                            }}
                                        >
                                            <InfoCard
                                                label="Start"
                                                value={test.start_time}
                                            />

                                            <InfoCard
                                                label="End"
                                                value={test.end_time}
                                            />

                                            <InfoCard
                                                label="Duration"
                                                value={`${test.duration_minutes} mins`}
                                            />

                                            <InfoCard
                                                label="Marks"
                                                value={test.total_marks}
                                            />
                                        </div>

                                        {/* Action */}
                                        <a
                                            href={test.url}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 8,
                                                textDecoration: "none",
                                                background:
                                                    "linear-gradient(135deg,#4f46e5,#06b6d4)",
                                                color: "white",
                                                padding: "12px 16px",
                                                borderRadius: 15,
                                                fontWeight: 800,
                                                fontSize: "0.92rem",
                                                letterSpacing: "0.2px",
                                                transition: "all 0.25s ease",
                                                animation: isHovered
                                                    ? "pulseGlow 1.6s infinite"
                                                    : "none",
                                            }}
                                        >
                                            View Test

                                            <span
                                                style={{
                                                    fontSize: "1rem",
                                                    transition: "transform 0.25s ease",
                                                    transform: isHovered
                                                        ? "translateX(3px)"
                                                        : "translateX(0px)",
                                                }}
                                            >
                                                →
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div
            style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: 14,
                padding: "12px 14px",
            }}
        >
            <div
                style={{
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    marginBottom: 5,
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: "0.88rem",
                    color: "#0f172a",
                    fontWeight: 700,
                    lineHeight: 1.4,
                }}
            >
                {value}
            </div>
        </div>
    );
}