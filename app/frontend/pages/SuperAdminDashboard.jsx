import React, { useEffect, useMemo, useState } from "react";

const modules = [
    {
        title: "Manage Users",
        description:
            "Approve accounts, update permissions, and manage platform-wide user access.",
        icon: "👥",
        path: "/admin/users",
        color: "#6366f1",
    },
    {
        title: "Approve Enrollments",
        description:
            "Review student enrollment requests and manage course admissions.",
        icon: "📚",
        path: "/admin/enrollments",
        color: "#10b981",
    },
    {
        title: "Approve Results",
        description:
            "Validate marks, approve bulk uploads, and publish academic results.",
        icon: "📊",
        path: "/admin/results",
        color: "#f59e0b",
    },
    {
        title: "Course Analytics",
        description:
            "Monitor revenue, enrollments, payments, and financial analytics.",
        icon: "💰",
        path: "/admin/course_catalogue",
        color: "#8b5cf6",
    },
    {
        title: "Courses",
        description:
            "Browse, manage, and monitor all available courses across the platform.",
        icon: "🎓",
        path: "/courses",
        color: "#06b6d4",
    },
];

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(
            () => setTime(new Date()),
            1000
        );

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

function ModuleCard({ module }) {
    const [hovered, setHovered] = useState(false);

    const handleNavigate = () => {
        window.location.href = module.path;
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
                    ? `1px solid ${module.color}`
                    : "1px solid rgba(255, 255, 255, 0.5)",
                transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: hovered
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(0)",
                boxShadow: hovered
                    ? `0 20px 40px -10px ${module.color}33`
                    : "0 10px 25px -5px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow Background */}

            <div
                style={{
                    position: "absolute",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    background: `${module.color}12`,
                    top: "-70px",
                    right: "-70px",
                    transition: "0.4s",
                    transform: hovered
                        ? "scale(1.2)"
                        : "scale(1)",
                }}
            />

            {/* Icon */}

            <div
                style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: hovered
                        ? module.color
                        : `${module.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    transition: "0.3s",
                    position: "relative",
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
                    {module.icon}
                </span>
            </div>

            {/* Content */}

            <div style={{ position: "relative", zIndex: 2 }}>
                <h3
                    style={{
                        margin: "0 0 8px 0",
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#1e293b",
                    }}
                >
                    {module.title}
                </h3>

                <p
                    style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#64748b",
                        lineHeight: "1.6",
                    }}
                >
                    {module.description}
                </p>
            </div>

            {/* Footer */}

            <div
                style={{
                    marginTop: "auto",
                    color: module.color,
                    fontSize: "14px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                Launch Module
                <span
                    style={{
                        transform: hovered
                            ? "translateX(4px)"
                            : "translateX(0)",
                        transition: "0.25s",
                    }}
                >
                    →
                </span>
            </div>
        </div>
    );
}

export function SuperAdminDashboard({
                                        currentUserEmail,
                                        activeUsers,
                                    }) {
    const [search, setSearch] = useState("");

    const [activeTab, setActiveTab] =
        useState("all");

    const filteredModules = useMemo(() => {
        return modules.filter((m) => {
            const matches = m.title
                .toLowerCase()
                .includes(search.toLowerCase());

            return activeTab === "all"
                ? matches
                : matches &&
                m.title
                    .toLowerCase()
                    .includes(activeTab);
        });
    }, [search, activeTab]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f1f5f9",
                backgroundImage:
                    "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.1) 0px, transparent 50%)",
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
                        justifyContent:
                            "space-between",
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
                                flexWrap: "wrap",
                            }}
                        >
                            <div
                                style={{
                                    padding:
                                        "6px 12px",
                                    background: "#fff",
                                    borderRadius:
                                        "100px",
                                    fontSize: "12px",
                                    fontWeight:
                                        "700",
                                    color: "#6366f1",
                                    boxShadow:
                                        "0 4px 6px -1px rgba(0,0,0,0.05)",
                                }}
                            >
                                ADMIN CONSOLE
                            </div>

                            <Clock />
                        </div>

                        <h1
                            style={{
                                fontSize: "42px",
                                fontWeight: "800",
                                color: "#0f172a",
                                margin: 0,
                                letterSpacing:
                                    "-1px",
                            }}
                        >
                            Welcome back,{" "}
                            <span
                                style={{
                                    color: "#6366f1",
                                }}
                            >
                                Admin
                            </span>
                        </h1>

                        <p
                            style={{
                                color: "#64748b",
                                marginTop: "8px",
                            }}
                        >
                            Managing{" "}
                            {currentUserEmail}
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
                                    fontWeight:
                                        "600",
                                    color: "#94a3b8",
                                }}
                            >
                                ACTIVE USERS
                            </div>

                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight:
                                        "800",
                                    color: "#0f172a",
                                }}
                            >
                                {activeUsers}
                            </div>
                        </div>

                        <div
                            style={{
                                width: "1px",
                                background:
                                    "#cbd5e1",
                            }}
                        />

                        <div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    fontWeight:
                                        "600",
                                    color: "#94a3b8",
                                }}
                            >
                                STATUS
                            </div>

                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight:
                                        "800",
                                    color: "#10b981",
                                }}
                            >
                                Live
                            </div>
                        </div>
                    </div>
                </header>

                {/* Controls */}

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        marginBottom: "32px",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            background:
                                "rgba(255,255,255,0.5)",
                            padding: "4px",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.8)",
                        }}
                    >
                        {[
                            "all",
                            "users",
                            "courses",
                            "results",
                        ].map((tab) => (
                            <button
                                key={tab}
                                onClick={() =>
                                    setActiveTab(
                                        tab
                                    )
                                }
                                style={{
                                    padding:
                                        "8px 20px",
                                    border: "none",
                                    borderRadius:
                                        "10px",
                                    fontSize:
                                        "14px",
                                    fontWeight:
                                        "600",
                                    cursor: "pointer",
                                    transition:
                                        "0.2s",
                                    background:
                                        activeTab ===
                                        tab
                                            ? "#fff"
                                            : "transparent",
                                    color:
                                        activeTab ===
                                        tab
                                            ? "#0f172a"
                                            : "#64748b",
                                    boxShadow:
                                        activeTab ===
                                        tab
                                            ? "0 4px 12px rgba(0,0,0,0.05)"
                                            : "none",
                                    textTransform:
                                        "capitalize",
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div
                        style={{
                            position: "relative",
                            flex: 1,
                            maxWidth: "400px",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Quick search modules..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding:
                                    "14px 20px",
                                borderRadius:
                                    "16px",
                                border: "1px solid rgba(255,255,255,0.8)",
                                background:
                                    "rgba(255,255,255,0.8)",
                                fontSize: "14px",
                                outline: "none",
                                boxShadow:
                                    "0 4px 6px -1px rgba(0,0,0,0.02)",
                                transition:
                                    "0.2s",
                            }}
                        />
                    </div>
                </div>

                {/* Grid */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {filteredModules.map(
                        (module) => (
                            <ModuleCard
                                key={
                                    module.title
                                }
                                module={
                                    module
                                }
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}