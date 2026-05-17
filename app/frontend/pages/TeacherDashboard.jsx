import React, { useEffect, useMemo, useState } from "react";

const cards = [
    {
        title: "Upload Marks",
        description:
            "Submit and manage student grades with streamlined approval workflows.",
        icon: "📝",
        color: "#6366f1",
        buttonText: "Open",
        key: "upload",
    },
    {
        title: "Courses",
        description:
            "Browse, manage, and navigate all assigned courses in one organized space.",
        icon: "🎓",
        color: "#06b6d4",
        buttonText: "View Courses",
        key: "courses",
    },
    {
        title: "Tests & CT Exams",
        description:
            "Create class tests, manage questions, review attempts, and evaluate student submissions.",
        icon: "📚",
        color: "#f59e0b",
        buttonText: "Manage Tests",
        key: "tests",
    },
];

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span
            style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#64748b",
                fontFamily: "monospace",
            }}
        >
            {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })}
        </span>
    );
}

function DashboardCard({ card, link }) {
    const [hovered, setHovered] = useState(false);

    const handleNavigate = () => {
        window.location.href = link;
    };

    return (
        <div
            onClick={handleNavigate}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "32px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                border: hovered
                    ? `1px solid ${card.color}`
                    : "1px solid rgba(255, 255, 255, 0.5)",
                transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: hovered
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(0)",
                boxShadow: hovered
                    ? `0 20px 40px -10px ${card.color}33`
                    : "0 10px 25px -5px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "120px",
                    height: "120px",
                    background: `${card.color}12`,
                    borderRadius: "50%",
                    transition: "0.4s",
                    transform: hovered
                        ? "scale(1.2)"
                        : "scale(1)",
                }}
            />

            <div
                style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: hovered
                        ? card.color
                        : `${card.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    transition: "0.3s",
                    zIndex: 2,
                }}
            >
                <span
                    style={{
                        filter: hovered
                            ? "brightness(0) invert(1)"
                            : "none",
                    }}
                >
                    {card.icon}
                </span>
            </div>

            <div style={{ zIndex: 2 }}>
                <h3
                    style={{
                        margin: "0 0 8px 0",
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#1e293b",
                    }}
                >
                    {card.title}
                </h3>

                <p
                    style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#64748b",
                        lineHeight: "1.6",
                    }}
                >
                    {card.description}
                </p>
            </div>

            <div
                style={{
                    marginTop: "auto",
                    color: card.color,
                    fontSize: "14px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 2,
                }}
            >
                {card.buttonText}

                <span
                    style={{
                        transform: hovered
                            ? "translateX(4px)"
                            : "translateX(0)",
                        transition: "0.2s",
                    }}
                >
                    →
                </span>
            </div>
        </div>
    );
}

export function TeacherDashboard({
                                     currentUserEmail,
                                     uploadMarksPath,
                                     coursesPath,
                                     testsPath,
                                 }) {
    const [search, setSearch] = useState("");

    const filteredCards = useMemo(() => {
        return cards.filter((card) =>
            card.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    const getCardLink = (key) => {
        switch (key) {
            case "upload":
                return uploadMarksPath;

            case "courses":
                return coursesPath;

            case "tests":
                return testsPath;

            default:
                return "/";
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f1f5f9",
                backgroundImage:
                    "radial-gradient(at 0% 0%, rgba(218, 226, 235, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(188, 226, 232, 0.1) 0px, transparent 50%)",
                fontFamily:
                    "'Plus Jakarta Sans', 'Inter', sans-serif",
                padding: "40px",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {/* Header */}
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: "48px",
                        flexWrap: "wrap",
                        gap: "24px",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "8px",
                            }}
                        >
                            <div
                                style={{
                                    padding: "6px 12px",
                                    background: "#fff",
                                    borderRadius: "100px",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "#6366f1",
                                    boxShadow:
                                        "0 4px 6px -1px rgba(0,0,0,0.05)",
                                }}
                            >
                                TEACHER PORTAL
                            </div>

                            <Clock />
                        </div>

                        <h1
                            style={{
                                fontSize: "42px",
                                fontWeight: "800",
                                color: "#0f172a",
                                margin: 0,
                                letterSpacing: "-1px",
                            }}
                        >
                            Faculty{" "}
                            <span
                                style={{
                                    color: "#6366f1",
                                }}
                            >
                                Workspace
                            </span>
                        </h1>

                        <p
                            style={{
                                color: "#64748b",
                                marginTop: "8px",
                            }}
                        >
                            Logged in as{" "}
                            <strong>
                                {currentUserEmail}
                            </strong>
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "24px",
                            textAlign: "right",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    color: "#94a3b8",
                                }}
                            >
                                STATUS
                            </div>

                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "800",
                                    color: "#10b981",
                                }}
                            >
                                Active
                            </div>
                        </div>
                    </div>
                </header>

                {/* Search */}
                <div
                    style={{
                        marginBottom: "32px",
                        position: "relative",
                        maxWidth: "500px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search your tools..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "14px 20px",
                            borderRadius: "16px",
                            border:
                                "1px solid rgba(255,255,255,0.8)",
                            background:
                                "rgba(255,255,255,0.8)",
                            fontSize: "14px",
                            outline: "none",
                            boxShadow:
                                "0 4px 6px -1px rgba(0,0,0,0.02)",
                            transition: "0.2s",
                        }}
                    />
                </div>

                {/* Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card) => (
                            <DashboardCard
                                key={card.key}
                                card={card}
                                link={getCardLink(card.key)}
                            />
                        ))
                    ) : (
                        <div
                            style={{
                                gridColumn: "1/-1",
                                textAlign: "center",
                                padding: "60px",
                                color: "#64748b",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "40px",
                                    marginBottom: "10px",
                                }}
                            >
                                🔍
                            </div>

                            <p
                                style={{
                                    fontWeight: "600",
                                }}
                            >
                                No matching tools found.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}