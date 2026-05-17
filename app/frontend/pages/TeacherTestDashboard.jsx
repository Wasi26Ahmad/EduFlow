import React, { useEffect, useMemo, useState } from "react";

const glassCard = {
    background: "rgba(255,255,255,0.68)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.22)",
    boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
};

function FloatingOrb({ top, left, size, delay }) {
    return (
        <div
            style={{
                position: "absolute",
                top,
                left,
                width: size,
                height: size,
                borderRadius: "999px",
                background:
                    "radial-gradient(circle, rgba(99,102,241,0.10), rgba(16,185,129,0.06))",
                filter: "blur(10px)",
                animation: `floatAnim 8s ease-in-out ${delay}s infinite`,
                pointerEvents: "none",
            }}
        />
    );
}

function StatCard({ label, value, delay }) {
    return (
        <div
            style={{
                ...glassCard,
                padding: "15px",
                borderRadius: "18px",
                minHeight: "90px",
                animation: `fadeInUp 0.5s ease ${delay}s both`,
            }}
        >
            <div
                style={{
                    fontSize: "10px",
                    color: "#64748b",
                    marginBottom: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#0f172a",
                }}
            >
                {value}
            </div>
        </div>
    );
}

function InfoTile({ title, value }) {
    return (
        <div
            style={{
                padding: "13px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.42)",
                border: "1px solid rgba(148,163,184,0.10)",
            }}
        >
            <div
                style={{
                    fontSize: "10px",
                    color: "#64748b",
                    marginBottom: "5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.35px",
                }}
            >
                {title}
            </div>

            <div
                style={{
                    fontSize: "13px",
                    color: "#0f172a",
                    fontWeight: 700,
                    lineHeight: 1.45,
                }}
            >
                {value}
            </div>
        </div>
    );
}

function ActionButton({ href, label, gradient }) {
    return (
        <a
            href={href}
            style={{
                background: gradient,
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.25s ease",
                boxShadow: "0 8px 18px rgba(15,23,42,0.08)",
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-1px)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0px)";
            }}
        >
            {label}
        </a>
    );
}

function TestCard({ test, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...glassCard,
                borderRadius: "20px",
                padding: "20px",
                transition: "all 0.28s ease",
                transform: hovered
                    ? "translateY(-3px)"
                    : "translateY(0px)",
                animation: `fadeInUp 0.55s ease ${index * 0.07}s both`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(16,185,129,0.03))",
                    opacity: hovered ? 1 : 0,
                    transition: "0.25s ease",
                }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "14px",
                        marginBottom: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                color: "#0f172a",
                                fontSize: "19px",
                                fontWeight: 800,
                                lineHeight: 1.25,
                            }}
                        >
                            {test.title}
                        </h3>

                        <div
                            style={{
                                marginTop: "9px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "rgba(99,102,241,0.08)",
                                color: "#4338ca",
                                borderRadius: "999px",
                                padding: "6px 11px",
                                fontWeight: 700,
                                fontSize: "10px",
                            }}
                        >
                            Active Assessment
                        </div>
                    </div>

                    <div
                        style={{
                            background: "rgba(15,23,42,0.92)",
                            color: "white",
                            borderRadius: "15px",
                            padding: "10px 14px",
                            minWidth: "80px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "10px",
                                opacity: 0.7,
                            }}
                        >
                            Marks
                        </div>

                        <div
                            style={{
                                fontSize: "20px",
                                fontWeight: 800,
                            }}
                        >
                            {test.total_marks}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "12px",
                        marginBottom: "18px",
                    }}
                >
                    <InfoTile
                        title="Duration"
                        value={`${test.duration_minutes} mins`}
                    />

                    <InfoTile
                        title="Start Time"
                        value={test.start_time}
                    />

                    <InfoTile
                        title="End Time"
                        value={test.end_time}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}
                >
                    <ActionButton
                        href={test.manage_questions_path}
                        label="Manage Questions"
                        gradient="linear-gradient(135deg, #f59e0b, #f97316)"
                    />

                    <ActionButton
                        href={test.view_attempts_path}
                        label="View Attempts"
                        gradient="linear-gradient(135deg, #6366f1, #4f46e5)"
                    />
                </div>
            </div>
        </div>
    );
}

function CourseCard({ course, index }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div
            style={{
                ...glassCard,
                padding: "24px",
                borderRadius: "26px",
                marginBottom: "22px",
                position: "relative",
                overflow: "hidden",
                animation: `fadeInUp 0.55s ease ${index * 0.08}s both`,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "190px",
                    height: "190px",
                    background:
                        "radial-gradient(circle, rgba(99,102,241,0.10), transparent 72%)",
                }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 10px",
                                borderRadius: "999px",
                                background: "rgba(16,185,129,0.10)",
                                color: "#047857",
                                fontWeight: 700,
                                fontSize: "10px",
                                marginBottom: "12px",
                            }}
                        >
                            Semester {course.semester}
                        </div>

                        <h2
                            style={{
                                margin: 0,
                                fontSize: "28px",
                                color: "#0f172a",
                                fontWeight: 900,
                                letterSpacing: "-0.03em",
                                lineHeight: 1.1,
                            }}
                        >
                            {course.title}
                        </h2>

                        <div
                            style={{
                                marginTop: "8px",
                                color: "#64748b",
                                fontWeight: 600,
                                fontSize: "13px",
                            }}
                        >
                            Course Code • {course.code}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                border: "none",
                                background:
                                    "rgba(255,255,255,0.55)",
                                color: "#0f172a",
                                padding: "10px 14px",
                                borderRadius: "12px",
                                fontWeight: 700,
                                fontSize: "12px",
                                cursor: "pointer",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            {expanded ? "Hide Tests" : "Show Tests"}
                        </button>

                        <a
                            href={course.new_test_path}
                            style={{
                                background:
                                    "linear-gradient(135deg, #10b981, #059669)",
                                color: "white",
                                textDecoration: "none",
                                padding: "11px 16px",
                                borderRadius: "13px",
                                fontWeight: 800,
                                fontSize: "12px",
                                boxShadow:
                                    "0 10px 24px rgba(16,185,129,0.16)",
                            }}
                        >
                            + Create New Test
                        </a>
                    </div>
                </div>

                {expanded && (
                    <div style={{ marginTop: "22px" }}>
                        {course.tests.length > 0 ? (
                            <div
                                style={{
                                    display: "grid",
                                    gap: "14px",
                                }}
                            >
                                {course.tests.map((test, idx) => (
                                    <TestCard
                                        key={test.id}
                                        test={test}
                                        index={idx}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                style={{
                                    padding: "24px",
                                    borderRadius: "18px",
                                    background:
                                        "rgba(255,255,255,0.42)",
                                    border:
                                        "1px dashed rgba(148,163,184,0.25)",
                                    textAlign: "center",
                                    color: "#64748b",
                                    fontWeight: 700,
                                    fontSize: "13px",
                                }}
                            >
                                No tests created for this course yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function TeacherTestsDashboard({ courses }) {
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const query = search.toLowerCase();

            return (
                course.title.toLowerCase().includes(query) ||
                course.code.toLowerCase().includes(query)
            );
        });
    }, [courses, search]);

    const totalTests = useMemo(() => {
        return courses.reduce((sum, course) => {
            return sum + course.tests.length;
        }, 0);
    }, [courses]);

    if (!mounted) return null;

    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
                fontFamily:
                    "Inter, ui-sans-serif, system-ui, sans-serif",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            <style>
                {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          @keyframes floatAnim {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          input:focus {
            border-color: rgba(99,102,241,0.35) !important;
            box-shadow: 0 0 0 4px rgba(99,102,241,0.08);
          }
        `}
            </style>

            <FloatingOrb
                top="100px"
                left="-40px"
                size="140px"
                delay={0}
            />

            <FloatingOrb
                top="360px"
                left="82%"
                size="200px"
                delay={1.2}
            />

            <div
                style={{
                    maxWidth: "1180px",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        ...glassCard,
                        borderRadius: "30px",
                        padding: "30px",
                        marginBottom: "28px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background:
                                        "rgba(79,70,229,0.08)",
                                    color: "#4338ca",
                                    padding: "6px 12px",
                                    borderRadius: "999px",
                                    fontWeight: 700,
                                    fontSize: "10px",
                                    marginBottom: "14px",
                                }}
                            >
                                Teacher Dashboard
                            </div>

                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: "42px",
                                    lineHeight: 1,
                                    color: "#0f172a",
                                    fontWeight: 900,
                                    letterSpacing: "-0.05em",
                                }}
                            >
                                Test Management
                            </h1>

                            <p
                                style={{
                                    marginTop: "14px",
                                    color: "#64748b",
                                    fontSize: "14px",
                                    maxWidth: "620px",
                                    lineHeight: 1.6,
                                }}
                            >
                                Manage assessments, monitor attempts,
                                organize questions
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(2, minmax(120px, 1fr))",
                                gap: "12px",
                                minWidth: "260px",
                            }}
                        >
                            <StatCard
                                label="Courses"
                                value={courses.length}
                                delay={0.1}
                            />

                            <StatCard
                                label="Tests"
                                value={totalTests}
                                delay={0.18}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: "22px" }}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search courses by title or code..."
                            style={{
                                width: "100%",
                                border:
                                    "1px solid rgba(148,163,184,0.15)",
                                borderRadius: "15px",
                                padding: "14px 16px",
                                fontSize: "13px",
                                outline: "none",
                                background:
                                    "rgba(255,255,255,0.50)",
                                transition: "0.25s ease",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>
                </div>

                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            index={index}
                        />
                    ))
                ) : (
                    <div
                        style={{
                            ...glassCard,
                            borderRadius: "24px",
                            padding: "50px 24px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "18px",
                                color: "#0f172a",
                                fontWeight: 800,
                                marginBottom: "10px",
                            }}
                        >
                            No assigned courses found.
                        </div>

                        <div
                            style={{
                                color: "#64748b",
                                fontWeight: 600,
                                fontSize: "13px",
                            }}
                        >
                            Your assigned courses will appear here
                            automatically.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}