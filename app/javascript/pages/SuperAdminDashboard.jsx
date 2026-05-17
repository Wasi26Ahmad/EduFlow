import React from "react";

const modules = [
    {
        title: "Manage Users",
        description:
            "Approve accounts, update permissions, and manage platform-wide user access.",
        icon: "👥",
        bg: "rgba(37,99,235,0.12)",
        button: "rgba(37,99,235,0.9)",
        path: "/admin/users",
    },
    {
        title: "Approve Enrollments",
        description:
            "Review student enrollment requests and manage course admissions.",
        icon: "📚",
        bg: "rgba(16,185,129,0.12)",
        button: "rgba(16,185,129,0.9)",
        path: "/admin/enrollments",
    },
    {
        title: "Approve Results",
        description:
            "Validate marks, approve bulk uploads, and publish academic results.",
        icon: "📊",
        bg: "rgba(245,158,11,0.12)",
        button: "rgba(245,158,11,0.9)",
        path: "/admin/results",
    },
    {
        title: "Course Analytics",
        description:
            "Monitor revenue, enrollments, payments, and financial analytics.",
        icon: "💰",
        bg: "rgba(124,58,237,0.12)",
        button: "rgba(124,58,237,0.9)",
        path: "/admin/course_catalogue",
    },
    {
        title: "Courses",
        description:
            "Browse, manage, and monitor all available courses across the platform.",
        icon: "🎓",
        bg: "rgba(14,165,233,0.12)",
        button: "rgba(14,165,233,0.9)",
        path: "/courses",
    },
];

export default function SuperAdminDashboard({ currentUserEmail }) {
    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "0 20px",
                fontFamily: "Inter, system-ui, sans-serif",
                background:
                    "radial-gradient(circle at top, #eef2ff, transparent 60%), radial-gradient(circle at bottom, #ecfeff, transparent 55%)",
            }}
        >
            {/* HERO */}
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "28px",
                    padding: "34px",
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
                    marginBottom: "32px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 12px",
                                borderRadius: "999px",
                                background: "rgba(124,58,237,0.12)",
                                color: "#6d28d9",
                                fontSize: "12px",
                                fontWeight: "700",
                                marginBottom: "16px",
                            }}
                        >
                            ⚡ PLATFORM CONTROL CENTER
                        </div>

                        <h1
                            style={{
                                fontSize: "42px",
                                lineHeight: 1.1,
                                fontWeight: 800,
                                color: "#0f172a",
                                margin: 0,
                                letterSpacing: "-1.4px",
                            }}
                        >
                            Super Admin Dashboard
                        </h1>

                        <p
                            style={{
                                marginTop: "14px",
                                fontSize: "15px",
                                color: "#475569",
                                maxWidth: "650px",
                                lineHeight: 1.7,
                            }}
                        >
                            Manage users, approvals, enrollments, academic workflows,
                            and platform revenue analytics from one centralized workspace.
                        </p>
                    </div>

                    {/* PROFILE CARD */}
                    <div
                        style={{
                            minWidth: "240px",
                            background: "rgba(255,255,255,0.45)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.5)",
                            borderRadius: "22px",
                            padding: "18px",
                            boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "12px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.6px",
                                color: "#94a3b8",
                                marginBottom: "8px",
                            }}
                        >
                            Logged In
                        </div>

                        <div
                            style={{
                                fontSize: "15px",
                                fontWeight: "700",
                                color: "#0f172a",
                                wordBreak: "break-word",
                            }}
                        >
                            {currentUserEmail}
                        </div>

                        <div
                            style={{
                                marginTop: "12px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "999px",
                                background: "rgba(16,185,129,0.12)",
                                color: "#059669",
                                fontSize: "12px",
                                fontWeight: "700",
                            }}
                        >
                            ● System Access Active
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                <div>
                    <h2
                        style={{
                            fontSize: "24px",
                            fontWeight: "800",
                            color: "#0f172a",
                            margin: 0,
                        }}
                    >
                        Management Modules
                    </h2>

                    <p
                        style={{
                            marginTop: "6px",
                            color: "#64748b",
                            fontSize: "14px",
                        }}
                    >
                        Quick access to all administrative operations
                    </p>
                </div>
            </div>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "22px",
                }}
            >
                {modules.map((module) => (
                    <div
                        key={module.title}
                        style={{
                            borderRadius: "24px",
                            padding: "24px",
                            background: "rgba(255,255,255,0.45)",
                            backdropFilter: "blur(18px)",
                            border: "1px solid rgba(255,255,255,0.4)",
                            boxShadow: "0 12px 35px rgba(15,23,42,0.06)",
                        }}
                    >
                        <div
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: module.bg,
                                marginBottom: "18px",
                            }}
                        >
                            {module.icon}
                        </div>

                        <div
                            style={{
                                fontSize: "20px",
                                fontWeight: "800",
                                color: "#0f172a",
                                marginBottom: "8px",
                            }}
                        >
                            {module.title}
                        </div>

                        <p
                            style={{
                                color: "#64748b",
                                fontSize: "14px",
                                lineHeight: 1.7,
                                marginBottom: "22px",
                            }}
                        >
                            {module.description}
                        </p>

                        <a
                            href={module.path}
                            style={{
                                display: "inline-flex",
                                padding: "11px 16px",
                                background: module.button,
                                color: "white",
                                borderRadius: "12px",
                                textDecoration: "none",
                                fontSize: "13px",
                                fontWeight: "700",
                            }}
                        >
                            Open Module
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}