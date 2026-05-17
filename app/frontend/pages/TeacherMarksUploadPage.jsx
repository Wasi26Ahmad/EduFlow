import React, { useMemo, useState } from "react";

const glassCard = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 10px 35px rgba(15,23,42,0.08)",
};

const statColors = {
    average: "#2563eb",
    highest: "#10b981",
    lowest: "#ef4444",
};

function AnalyticsCard({ title, value, color }) {
    return (
        <div
            style={{
                ...glassCard,
                borderRadius: 24,
                padding: 24,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `${color}15`,
                }}
            />

            <div
                style={{
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    color: "#94a3b8",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {title}
            </div>

            <div
                style={{
                    marginTop: 14,
                    fontSize: 38,
                    fontWeight: 900,
                    color,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {value}
            </div>
        </div>
    );
}

function StudentCard({ student }) {
    const safeName = student.name || "Unnamed Student";
    const safeEmail = student.email || "No email available";

    return (
        <div
            style={{
                ...glassCard,
                position: "relative",
                overflow: "hidden",
                borderRadius: 28,
                padding: 24,
                transition: "all 0.25s ease",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                    "0 24px 45px rgba(15,23,42,0.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                    "0 10px 35px rgba(15,23,42,0.08)";
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(79,70,229,0.06))",
                }}
            />

            <div
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "linear-gradient(135deg,#2563eb 0%, #4f46e5 100%)",
                    color: "white",
                    fontSize: 24,
                    fontWeight: 900,
                    boxShadow: "0 15px 30px rgba(37,99,235,0.24)",
                    marginBottom: 18,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {(student.name || "?").charAt(0).toUpperCase()}
            </div>

            <div
                style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {safeName}
            </div>

            <div
                style={{
                    marginTop: 8,
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.6,
                    wordBreak: "break-word",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {safeEmail}
            </div>

            {student.existing_marks !== null &&
                student.existing_marks !== undefined && (
                    <div
                        style={{
                            marginTop: 18,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 14px",
                            borderRadius: 999,
                            background: "rgba(16,185,129,0.12)",
                            color: "#059669",
                            fontSize: 12,
                            fontWeight: 800,
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        📊 Existing Marks: {student.existing_marks}
                    </div>
                )}

            <div
                style={{
                    marginTop: 24,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <label
                    style={{
                        display: "block",
                        marginBottom: 10,
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        color: "#94a3b8",
                    }}
                >
                    Enter Marks
                </label>

                <input
                    type="number"
                    step="0.01"
                    name={`marks[${student.id}]`}
                    placeholder="0.00"
                    style={{
                        width: "100%",
                        padding: "16px 18px",
                        borderRadius: 18,
                        border: "1px solid #dbe2ea",
                        background: "#f8fafc",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0f172a",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => {
                        e.target.style.border =
                            "1px solid #2563eb";
                        e.target.style.boxShadow =
                            "0 0 0 4px rgba(37,99,235,0.08)";
                    }}
                    onBlur={(e) => {
                        e.target.style.border =
                            "1px solid #dbe2ea";
                        e.target.style.boxShadow = "none";
                    }}
                />
            </div>
        </div>
    );
}

export default function TeacherMarksUploadPage({
                                                   courses = [],
                                                   selectedCourse = null,
                                                   students = [],
                                                   analytics = {},
                                                   routes = {},
                                               }) {
    const [search, setSearch] = useState("");

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const value = search.toLowerCase();

            const studentName = (student.name || "").toLowerCase();
            const studentEmail = (student.email || "").toLowerCase();

            return (
                studentName.includes(value) ||
                studentEmail.includes(value)
            );
        });
    }, [students, search]);

    return (
        <div
            style={{
                maxWidth: 1320,
                margin: "40px auto",
                padding: "0 20px 70px",
                fontFamily:
                    "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                background: `
                    radial-gradient(circle at top, #eef2ff, transparent 60%),
                    radial-gradient(circle at bottom, #ecfeff, transparent 55%)
                `,
            }}
        >
            {/* HERO */}
            <div
                style={{
                    ...glassCard,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 36,
                    padding: 42,
                    marginBottom: 34,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -80,
                        right: -80,
                        width: 240,
                        height: 240,
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, rgba(37,99,235,0.10), rgba(79,70,229,0.06))",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 20,
                        flexWrap: "wrap",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 14px",
                                borderRadius: 999,
                                background: "rgba(37,99,235,0.12)",
                                color: "#2563eb",
                                fontSize: 12,
                                fontWeight: 800,
                                letterSpacing: 0.4,
                                marginBottom: 16,
                            }}
                        >
                            📘 TEACHER MARKS CENTER
                        </div>

                        <h1
                            style={{
                                fontSize: 52,
                                fontWeight: 900,
                                letterSpacing: -2,
                                color: "#0f172a",
                                margin: 0,
                                lineHeight: 1.02,
                            }}
                        >
                            Upload Student Marks
                        </h1>

                        <p
                            style={{
                                marginTop: 18,
                                fontSize: 15,
                                color: "#475569",
                                maxWidth: 720,
                                lineHeight: 1.8,
                            }}
                        >
                            Submit marks individually or upload Excel sheets in
                            bulk while maintaining approval workflows and
                            grading integrity across the institution.
                        </p>
                    </div>

                    <div
                        style={{
                            minWidth: 270,
                            padding: 22,
                            borderRadius: 24,
                            background: "rgba(255,255,255,0.82)",
                            border: "1px solid rgba(255,255,255,0.7)",
                            boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: 0.6,
                                color: "#94a3b8",
                                marginBottom: 10,
                            }}
                        >
                            Bulk Upload
                        </div>

                        <div
                            style={{
                                fontSize: 14,
                                lineHeight: 1.7,
                                fontWeight: 700,
                                color: "#0f172a",
                                marginBottom: 18,
                            }}
                        >
                            Upload marks for all students instantly using Excel
                            spreadsheets.
                        </div>

                        <a
                            href={routes.bulk_upload_path}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "13px 18px",
                                background: "#10b981",
                                color: "white",
                                borderRadius: 16,
                                fontSize: 13,
                                fontWeight: 800,
                                textDecoration: "none",
                                boxShadow:
                                    "0 12px 24px rgba(16,185,129,0.24)",
                            }}
                        >
                            Open Excel Upload
                        </a>
                    </div>
                </div>
            </div>

            {/* COURSE SELECTOR */}
            <div
                style={{
                    ...glassCard,
                    borderRadius: 30,
                    padding: 28,
                    marginBottom: 34,
                }}
            >
                <form action={routes.load_students_path} method="GET">
                    <div
                        style={{
                            display: "flex",
                            gap: 18,
                            alignItems: "flex-end",
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ flex: 1, minWidth: 260 }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: 10,
                                    fontSize: 13,
                                    fontWeight: 800,
                                    color: "#334155",
                                }}
                            >
                                Select Course
                            </label>

                            <select
                                name="course_id"
                                defaultValue={selectedCourse?.id || ""}
                                style={{
                                    width: "100%",
                                    padding: "16px 18px",
                                    borderRadius: 18,
                                    border: "1px solid #dbe2ea",
                                    background: "#f8fafc",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    outline: "none",
                                }}
                            >
                                <option value="">Choose Course</option>

                                {courses.map((course) => (
                                    <option
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: "16px 24px",
                                border: "none",
                                borderRadius: 18,
                                background: "#2563eb",
                                color: "white",
                                fontSize: 14,
                                fontWeight: 800,
                                cursor: "pointer",
                                boxShadow:
                                    "0 12px 24px rgba(37,99,235,0.18)",
                            }}
                        >
                            Load Students
                        </button>
                    </div>
                </form>
            </div>

            {selectedCourse && (
                <form
                    action={routes.submit_marks_path}
                    method="POST"
                >
                    <input
                        type="hidden"
                        name="course_id"
                        value={selectedCourse.id}
                    />

                    {/* COURSE HERO */}
                    <div
                        style={{
                            borderRadius: 32,
                            padding: 34,
                            marginBottom: 30,
                            background:
                                "linear-gradient(135deg,#0f172a 0%, #1e293b 100%)",
                            boxShadow:
                                "0 20px 50px rgba(15,23,42,0.22)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 20,
                                flexWrap: "wrap",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "7px 14px",
                                        borderRadius: 999,
                                        background:
                                            "rgba(255,255,255,0.08)",
                                        color:
                                            "rgba(255,255,255,0.92)",
                                        fontSize: 12,
                                        fontWeight: 800,
                                        letterSpacing: 0.4,
                                        marginBottom: 14,
                                    }}
                                >
                                    🎓 ACTIVE COURSE
                                </div>

                                <h2
                                    style={{
                                        fontSize: 38,
                                        fontWeight: 900,
                                        letterSpacing: -1,
                                        color: "white",
                                        margin: 0,
                                    }}
                                >
                                    {selectedCourse.title}
                                </h2>

                                <p
                                    style={{
                                        marginTop: 12,
                                        color:
                                            "rgba(255,255,255,0.72)",
                                        fontSize: 14,
                                    }}
                                >
                                    {
                                        selectedCourse.enrollmentsCount
                                    }{" "}
                                    enrolled students
                                </p>
                            </div>

                            <a
                                href={
                                    routes.bulk_upload_with_course_path
                                }
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "13px 18px",
                                    background: "white",
                                    color: "#0f172a",
                                    borderRadius: 16,
                                    fontSize: 13,
                                    fontWeight: 800,
                                    textDecoration: "none",
                                }}
                            >
                                Excel Upload
                            </a>
                        </div>
                    </div>

                    {/* ANALYTICS */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(240px,1fr))",
                            gap: 20,
                            marginBottom: 32,
                        }}
                    >
                        <AnalyticsCard
                            title="Average Marks"
                            value={analytics.average_marks || 0}
                            color={statColors.average}
                        />

                        <AnalyticsCard
                            title="Highest Marks"
                            value={analytics.highest_marks || 0}
                            color={statColors.highest}
                        />

                        <AnalyticsCard
                            title="Lowest Marks"
                            value={analytics.lowest_marks || 0}
                            color={statColors.lowest}
                        />
                    </div>

                    {/* SEARCH */}
                    <div style={{ marginBottom: 26 }}>
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            style={{
                                width: "100%",
                                maxWidth: 400,
                                padding: "16px 18px",
                                borderRadius: 18,
                                border: "1px solid #dbe2ea",
                                background:
                                    "rgba(255,255,255,0.75)",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#0f172a",
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* STUDENTS */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px,1fr))",
                            gap: 22,
                        }}
                    >
                        {filteredStudents.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                            />
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div
                        style={{
                            marginTop: 38,
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            type="submit"
                            style={{
                                padding: "17px 24px",
                                border: "none",
                                borderRadius: 18,
                                background: "#2563eb",
                                color: "white",
                                fontSize: 14,
                                fontWeight: 800,
                                cursor: "pointer",
                                boxShadow:
                                    "0 12px 24px rgba(37,99,235,0.18)",
                            }}
                        >
                            Submit Individual Marks
                        </button>

                        <a
                            href={
                                routes.bulk_upload_with_course_path
                            }
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "17px 24px",
                                background: "#10b981",
                                color: "white",
                                borderRadius: 18,
                                fontSize: 14,
                                fontWeight: 800,
                                textDecoration: "none",
                                boxShadow:
                                    "0 12px 24px rgba(16,185,129,0.20)",
                            }}
                        >
                            Go To Bulk Excel Upload
                        </a>
                    </div>
                </form>
            )}
        </div>
    );
}