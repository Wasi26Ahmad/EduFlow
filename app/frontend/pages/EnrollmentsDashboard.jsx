import React, { useEffect, useMemo, useState } from "react";

const fadeUp = {
    opacity: 0,
    transform: "translateY(14px)",
};

const fadeUpVisible = {
    opacity: 1,
    transform: "translateY(0px)",
};

function EnrollmentCard({ enrollment, index }) {
    const approved = enrollment?.status === "approved";

    // FIXED: safely resolve course ID
    const courseId =
        enrollment?.course_id ||
        enrollment?.course?.id;

    const testsPath = courseId
        ? `/courses/${courseId}/tests`
        : "#";

    return (
        <div
            style={{
                ...fadeUpVisible,
                transition: `all 500ms cubic-bezier(.2,.8,.2,1) ${index * 60}ms`,
                position: "relative",
                overflow: "hidden",
                background: "#ffffff",
                borderRadius: 24,
                padding: 20,
                border: "1px solid #e5e7eb",
                boxShadow:
                    "0 10px 30px rgba(15,23,42,0.05)",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-4px)";

                e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(37,99,235,0.10)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0px)";

                e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(15,23,42,0.05)";
            }}
        >
            {/* Glow */}
            <div
                style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 140,
                    height: 140,
                    borderRadius: 999,
                    background: "rgba(59,130,246,0.06)",
                    filter: "blur(10px)",
                }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
                {/* Top */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 14,
                        alignItems: "flex-start",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "6px 11px",
                                borderRadius: 999,
                                background: "#eff6ff",
                                color: "#2563eb",
                                fontSize: 10,
                                fontWeight: 800,
                                letterSpacing: ".4px",
                                marginBottom: 14,
                            }}
                        >
                            🎓 ENROLLED COURSE
                        </div>

                        <h2
                            style={{
                                fontSize: 20,
                                fontWeight: 800,
                                color: "#0f172a",
                                lineHeight: 1.25,
                                margin: 0,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            {enrollment?.course?.title || "Untitled Course"}
                        </h2>

                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                color: "#64748b",
                                lineHeight: 1.6,
                            }}
                        >
                            Course Code:{" "}
                            <strong style={{ color: "#0f172a" }}>
                                {enrollment?.course?.code || "N/A"}
                            </strong>
                        </div>
                    </div>

                    {/* Status */}
                    <div
                        style={{
                            padding: "8px 13px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 800,
                            textTransform: "capitalize",
                            background: approved
                                ? "#dcfce7"
                                : "#fef3c7",
                            color: approved
                                ? "#166534"
                                : "#92400e",
                            whiteSpace: "nowrap",
                        }}
                    >
                        ● {enrollment?.status || "pending"}
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        height: 1,
                        background: "#f1f5f9",
                        margin: "20px 0",
                    }}
                />

                {/* Details */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2,minmax(0,1fr))",
                        gap: 12,
                    }}
                >
                    <InfoBox
                        label="Semester"
                        value={
                            enrollment?.course?.semester || "N/A"
                        }
                    />

                    <InfoBox
                        label="Course Fee"
                        value={`৳${enrollment?.course?.price || 0}`}
                        valueColor="#2563eb"
                    />
                </div>

                {/* TEST SECTION */}
                <div
                    style={{
                        marginTop: 18,
                        padding: 16,
                        borderRadius: 16,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                            flexWrap: "wrap",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    color: "#64748b",
                                    textTransform: "uppercase",
                                    letterSpacing: ".4px",
                                    marginBottom: 6,
                                }}
                            >
                                COURSE TESTS
                            </div>

                            <div
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#0f172a",
                                }}
                            >
                                View available CT exams
                            </div>
                        </div>

                        <button
                            disabled={!courseId}
                            onClick={() => {
                                if (courseId) {
                                    window.location.href =
                                        testsPath;
                                }
                            }}
                            style={{
                                border: "none",
                                background: courseId
                                    ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                                    : "#cbd5e1",
                                color: "white",
                                padding: "10px 16px",
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 800,
                                cursor: courseId
                                    ? "pointer"
                                    : "not-allowed",
                                boxShadow:
                                    "0 6px 16px rgba(37,99,235,0.18)",
                                transition: "0.2s",
                            }}
                        >
                            📝 Open Tests
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        marginTop: 18,
                        paddingTop: 16,
                        borderTop: "1px solid #f1f5f9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            fontSize: 12,
                            color: "#64748b",
                        }}
                    >
                        Enrollment ID:{" "}
                        <strong style={{ color: "#0f172a" }}>
                            #{enrollment?.id}
                        </strong>
                    </div>

                    <div
                        style={{
                            padding: "7px 12px",
                            borderRadius: 999,
                            background: "#eff6ff",
                            color: "#2563eb",
                            fontSize: 11,
                            fontWeight: 800,
                        }}
                    >
                        Active Enrollment
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoBox({ label, value, valueColor }) {
    return (
        <div
            style={{
                background: "#f8fafc",
                border: "1px solid #eef2f7",
                borderRadius: 14,
                padding: 14,
            }}
        >
            <div
                style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: ".4px",
                    marginBottom: 6,
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: valueColor || "#0f172a",
                }}
            >
                {value}
            </div>
        </div>
    );
}

function StatCard({ label, value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        const interval = setInterval(() => {
            start += 1;

            if (start >= value) {
                start = value;
                clearInterval(interval);
            }

            setCount(start);
        }, 20);

        return () => clearInterval(interval);
    }, [value]);

    return (
        <div
            style={{
                minWidth: 145,
                padding: 18,
                borderRadius: 20,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid #dbeafe",
                boxShadow:
                    "0 6px 18px rgba(59,130,246,0.08)",
            }}
        >
            <div
                style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    marginBottom: 6,
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: 30,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#0f172a",
                }}
            >
                {count}
            </div>
        </div>
    );
}

export default function EnrollmentsDashboard({
                                                 enrollments = [],
                                                 current_user = {},
                                                 stats = {},
                                                 pagination = {},
                                             }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setMounted(true);
        });
    }, []);

    const firstLetter = useMemo(() => {
        return current_user?.email
            ?.charAt(0)
            ?.toUpperCase() || "U";
    }, [current_user]);

    return (
        <div
            style={{
                maxWidth: 1020,
                margin: "28px auto",
                padding: 16,
                fontFamily:
                    "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            {/* Hero */}
            <div
                style={{
                    ...(!mounted ? fadeUp : fadeUpVisible),
                    transition:
                        "all 650ms cubic-bezier(.2,.8,.2,1)",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 28,
                    padding: 28,
                    background: `
                        radial-gradient(circle at top right, rgba(96,165,250,0.18), transparent 30%),
                        linear-gradient(135deg,#ffffff 0%, #f8fafc 60%, #eff6ff 100%)
                    `,
                    border: "1px solid #dbeafe",
                    boxShadow:
                        "0 16px 40px rgba(59,130,246,0.08)",
                    marginBottom: 26,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: 200,
                        height: 200,
                        borderRadius: 999,
                        background: "rgba(59,130,246,0.08)",
                        top: -70,
                        right: -40,
                        filter: "blur(10px)",
                        animation:
                            "floatOrb 6s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 22,
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 12px",
                                borderRadius: 999,
                                background: "#dbeafe",
                                color: "#2563eb",
                                fontSize: 11,
                                fontWeight: 800,
                                letterSpacing: ".5px",
                                textTransform: "uppercase",
                                marginBottom: 16,
                            }}
                        >
                            🎓 Enrollment Dashboard
                        </div>

                        <h1
                            style={{
                                fontSize: 34,
                                lineHeight: 1.05,
                                fontWeight: 900,
                                margin: "0 0 10px",
                                letterSpacing: "-1.2px",
                                color: "#0f172a",
                            }}
                        >
                            My Enrollments
                        </h1>

                        <p
                            style={{
                                maxWidth: 560,
                                color: "#475569",
                                fontSize: 14,
                                lineHeight: 1.7,
                                margin: 0,
                            }}
                        >
                            Track enrolled courses, monitor approvals,
                            and manage your academic progress semester
                            by semester.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            flexWrap: "wrap",
                        }}
                    >
                        <StatCard
                            label="Total"
                            value={stats?.total || 0}
                        />

                        <StatCard
                            label="Approved"
                            value={stats?.approved || 0}
                        />
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div
                style={{
                    marginBottom: 22,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 14,
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 16px",
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 18,
                        boxShadow:
                            "0 4px 14px rgba(15,23,42,0.04)",
                    }}
                >
                    <div
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 14,
                            background:
                                "linear-gradient(135deg,#2563eb,#3b82f6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 900,
                            fontSize: 15,
                        }}
                    >
                        {firstLetter}
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: 11,
                                color: "#64748b",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: ".5px",
                                marginBottom: 3,
                            }}
                        >
                            Logged In As
                        </div>

                        <div
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#0f172a",
                            }}
                        >
                            {current_user?.email || "Unknown User"}
                        </div>
                    </div>
                </div>

                {current_user?.semester && (
                    <div
                        style={{
                            padding: "13px 16px",
                            borderRadius: 16,
                            background: "#eef4ff",
                            border: "1px solid #dbeafe",
                            color: "#2563eb",
                            fontSize: 13,
                            fontWeight: 800,
                            boxShadow:
                                "0 4px 14px rgba(59,130,246,0.06)",
                        }}
                    >
                        📘 Semester {current_user.semester}
                    </div>
                )}
            </div>

            {/* Empty State */}
            {enrollments.length === 0 ? (
                <div
                    style={{
                        background: "#ffffff",
                        border: "1px dashed #cbd5e1",
                        borderRadius: 26,
                        padding: "70px 26px",
                        textAlign: "center",
                        boxShadow:
                            "0 10px 30px rgba(15,23,42,0.04)",
                    }}
                >
                    <div
                        style={{
                            fontSize: 58,
                            marginBottom: 16,
                            animation: "bounce 2.5s infinite",
                        }}
                    >
                        📚
                    </div>

                    <div
                        style={{
                            fontSize: 24,
                            fontWeight: 850,
                            color: "#0f172a",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        No Enrollments Yet
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(300px,1fr))",
                        gap: 18,
                    }}
                >
                    {enrollments.map((enrollment, index) => (
                        <EnrollmentCard
                            key={enrollment.id}
                            enrollment={enrollment}
                            index={index}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination?.html && (
                <div
                    style={{ marginTop: 32 }}
                    dangerouslySetInnerHTML={{
                        __html: pagination.html,
                    }}
                />
            )}

            {/* Global animations */}
            <style>
                {`
                    @keyframes floatOrb {
                        0% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(12px);
                        }
                        100% {
                            transform: translateY(0px);
                        }
                    }

                    @keyframes bounce {
                        0%,100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-8px);
                        }
                    }

                    * {
                        box-sizing: border-box;
                    }

                    html {
                        scroll-behavior: smooth;
                    }

                    body {
                        background: #f8fafc;
                    }
                `}
            </style>
        </div>
    );
}