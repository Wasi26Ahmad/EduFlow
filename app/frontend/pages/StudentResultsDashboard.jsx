import React, { useMemo, useState } from "react";

const fadeInUp = {
    animation: "fadeUp .6s ease forwards",
};

function groupBySemester(results) {
    return results.reduce((acc, result) => {
        // Use course semester if result semester is missing
        const semester =
            result.semester ||
            result.course?.semester ||
            "N/A";

        if (!acc[semester]) acc[semester] = [];

        acc[semester].push(result);

        return acc;
    }, {});
}

export default function StudentResultsDashboard({
                                                    results,
                                                    downloadUrl,
                                                    pagination,
                                                }) {
    const [activeCard, setActiveCard] = useState(null);

    const normalizedResults = useMemo(() => {
        return results.map((result) => ({
            ...result,
            semester:
                result.semester ||
                result.course?.semester ||
                "N/A",
        }));
    }, [results]);

    const semesterGroups = useMemo(
        () => groupBySemester(normalizedResults),
        [normalizedResults]
    );

    const semesterKeys = Object.keys(
        semesterGroups
    ).sort((a, b) => Number(a) - Number(b));

    const totalCourses = normalizedResults.length;

    return (
        <>
            <style>
                {`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background:
              radial-gradient(circle at top, rgba(96,165,250,0.08), transparent 30%),
              linear-gradient(to bottom, #f8fbff 0%, #eef4ff 100%);
            color: #111827;
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .dashboard-card {
            transition:
              transform .22s ease,
              box-shadow .22s ease,
              border-color .22s ease;
          }

          .dashboard-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 30px rgba(37,99,235,.08);
            border-color: #bfdbfe;
          }

          .course-row {
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              border-color .2s ease;
          }

          .course-row:hover {
            transform: translateY(-3px);
            border-color: #bfdbfe;
            box-shadow: 0 12px 26px rgba(37,99,235,.08);
          }

          .hero-title {
            letter-spacing: -2px;
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 34px !important;
            }

            .semester-header {
              flex-direction: column;
              align-items: flex-start !important;
            }
          }
        `}
            </style>

            <div
                style={{
                    maxWidth: 1080,
                    margin: "30px auto",
                    padding: "0 16px 50px",
                    fontFamily:
                        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
            >
                {/* HERO */}
                <div
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 28,
                        padding: 30,
                        background:
                            "linear-gradient(135deg, #ffffff 0%, #f3f8ff 50%, #e8f0ff 100%)",
                        border: "1px solid rgba(191,219,254,.7)",
                        boxShadow:
                            "0 18px 45px rgba(59,130,246,.08)",
                        marginBottom: 22,
                        ...fadeInUp,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: 220,
                            height: 220,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(96,165,250,.14), transparent 70%)",
                            top: -70,
                            right: -50,
                            filter: "blur(8px)",
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
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "7px 12px",
                                borderRadius: 999,
                                background:
                                    "linear-gradient(135deg, #dbeafe, #eff6ff)",
                                color: "#2563eb",
                                fontSize: 11,
                                fontWeight: 800,
                                letterSpacing: ".5px",
                                textTransform: "uppercase",
                                border: "1px solid #bfdbfe",
                            }}
                        >
                            🎓 Student Academic Dashboard
                        </div>

                        <h1
                            className="hero-title"
                            style={{
                                fontSize: 42,
                                lineHeight: 1.02,
                                fontWeight: 900,
                                margin: "18px 0 10px",
                                color: "#0f172a",
                            }}
                        >
                            My Results
                        </h1>

                        <p
                            style={{
                                maxWidth: 620,
                                color: "#475569",
                                fontSize: 14,
                                lineHeight: 1.8,
                                margin: 0,
                            }}
                        >
                            Track your academic performance semester-by-semester
                            and instantly access your official transcript
                            through a fast modern dashboard.
                        </p>
                    </div>
                </div>

                {normalizedResults.length > 0 ? (
                    <>
                        {/* TOP CARDS */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: 16,
                                marginBottom: 22,
                            }}
                        >
                            {/* COURSES */}
                            <div
                                className="dashboard-card"
                                style={{
                                    background: "rgba(255,255,255,.88)",
                                    border: "1px solid rgba(226,232,240,.9)",
                                    borderRadius: 24,
                                    padding: 22,
                                    boxShadow:
                                        "0 10px 28px rgba(15,23,42,.04)",
                                    ...fadeInUp,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        color: "#64748b",
                                        textTransform: "uppercase",
                                        letterSpacing: ".5px",
                                    }}
                                >
                                    Courses Completed
                                </div>

                                <div
                                    style={{
                                        marginTop: 10,
                                        fontSize: 40,
                                        fontWeight: 900,
                                        color: "#111827",
                                        letterSpacing: "-2px",
                                    }}
                                >
                                    {totalCourses}
                                </div>

                                <div
                                    style={{
                                        marginTop: 10,
                                        color: "#64748b",
                                        fontSize: 13,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Published and approved academic results.
                                </div>
                            </div>

                            {/* SEMESTERS */}
                            <div
                                className="dashboard-card"
                                style={{
                                    background: "rgba(255,255,255,.88)",
                                    border: "1px solid rgba(226,232,240,.9)",
                                    borderRadius: 24,
                                    padding: 22,
                                    boxShadow:
                                        "0 10px 28px rgba(15,23,42,.04)",
                                    ...fadeInUp,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        color: "#64748b",
                                        textTransform: "uppercase",
                                        letterSpacing: ".5px",
                                    }}
                                >
                                    Semesters Completed
                                </div>

                                <div
                                    style={{
                                        marginTop: 10,
                                        fontSize: 40,
                                        fontWeight: 900,
                                        color: "#7c3aed",
                                        letterSpacing: "-2px",
                                    }}
                                >
                                    {semesterKeys.length}
                                </div>

                                <div
                                    style={{
                                        marginTop: 12,
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 6,
                                    }}
                                >
                                    {semesterKeys.map((semester) => (
                                        <div
                                            key={semester}
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: 999,
                                                background: "#f3e8ff",
                                                color: "#7c3aed",
                                                fontSize: 11,
                                                fontWeight: 800,
                                                border: "1px solid #e9d5ff",
                                            }}
                                        >
                                            Semester {semester}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DOWNLOAD */}
                            <div
                                className="dashboard-card"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                                    borderRadius: 24,
                                    padding: 22,
                                    color: "white",
                                    boxShadow:
                                        "0 16px 35px rgba(37,99,235,.18)",
                                    border:
                                        "1px solid rgba(255,255,255,.10)",
                                    ...fadeInUp,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        opacity: 0.85,
                                        textTransform: "uppercase",
                                        letterSpacing: ".5px",
                                    }}
                                >
                                    Official Transcript
                                </div>

                                <div
                                    style={{
                                        marginTop: 10,
                                        fontSize: 24,
                                        fontWeight: 900,
                                        lineHeight: 1.3,
                                        letterSpacing: "-1px",
                                    }}
                                >
                                    Download PDF
                                </div>

                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        color: "rgba(255,255,255,.82)",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Export your transcript instantly.
                                </div>

                                <a
                                    href={downloadUrl}
                                    style={{
                                        marginTop: 18,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        padding: "12px 16px",
                                        background:
                                            "rgba(255,255,255,.16)",
                                        color: "white",
                                        borderRadius: 14,
                                        textDecoration: "none",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        border:
                                            "1px solid rgba(255,255,255,.18)",
                                    }}
                                >
                                    ⬇ Download
                                </a>
                            </div>
                        </div>

                        {/* SEMESTERS */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            {semesterKeys.map((semester) => {
                                const semesterResults =
                                    semesterGroups[semester];

                                const semesterGPA = (
                                    semesterResults.reduce(
                                        (acc, r) =>
                                            acc + Number(r.gpa || 0),
                                        0
                                    ) / semesterResults.length
                                ).toFixed(2);

                                return (
                                    <div
                                        key={semester}
                                        style={{
                                            background:
                                                "rgba(255,255,255,.94)",
                                            borderRadius: 28,
                                            border:
                                                "1px solid rgba(226,232,240,.9)",
                                            overflow: "hidden",
                                            boxShadow:
                                                "0 12px 32px rgba(15,23,42,.04)",
                                            ...fadeInUp,
                                        }}
                                    >
                                        {/* HEADER */}
                                        <div
                                            className="semester-header"
                                            style={{
                                                padding: "22px 24px",
                                                background:
                                                    "linear-gradient(135deg,#eff6ff 0%, #f5f3ff 100%)",
                                                borderBottom:
                                                    "1px solid #e0e7ff",
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems: "center",
                                                gap: 16,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: 26,
                                                        fontWeight: 900,
                                                        color: "#0f172a",
                                                        letterSpacing: "-1px",
                                                    }}
                                                >
                                                    Semester {semester}
                                                </div>

                                                <div
                                                    style={{
                                                        marginTop: 6,
                                                        color: "#64748b",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {
                                                        semesterResults.length
                                                    } published course results
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    background: "white",
                                                    border:
                                                        "1px solid #dbeafe",
                                                    padding: "12px 16px",
                                                    borderRadius: 16,
                                                    minWidth: 110,
                                                    textAlign: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: 10,
                                                        color: "#64748b",
                                                        fontWeight: 700,
                                                        textTransform:
                                                            "uppercase",
                                                    }}
                                                >
                                                    Semester GPA
                                                </div>

                                                <div
                                                    style={{
                                                        marginTop: 5,
                                                        fontSize: 24,
                                                        fontWeight: 900,
                                                        color: "#2563eb",
                                                    }}
                                                >
                                                    {semesterGPA}
                                                </div>
                                            </div>
                                        </div>

                                        {/* RESULTS */}
                                        <div
                                            style={{
                                                display: "grid",
                                                gap: 14,
                                                padding: 18,
                                            }}
                                        >
                                            {semesterResults.map((result) => (
                                                <div
                                                    key={result.id}
                                                    className="course-row"
                                                    onMouseEnter={() =>
                                                        setActiveCard(result.id)
                                                    }
                                                    onMouseLeave={() =>
                                                        setActiveCard(null)
                                                    }
                                                    style={{
                                                        position: "relative",
                                                        overflow: "hidden",
                                                        borderRadius: 20,
                                                        border:
                                                            "1px solid #eef2f7",
                                                        background:
                                                            "linear-gradient(to bottom right, #ffffff, #f8fbff)",
                                                        padding: 20,
                                                        boxShadow:
                                                            activeCard ===
                                                            result.id
                                                                ? "0 12px 26px rgba(37,99,235,.08)"
                                                                : "0 6px 18px rgba(15,23,42,.03)",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: 5,
                                                            height: "100%",
                                                            background:
                                                                "linear-gradient(180deg, #2563eb, #7c3aed)",
                                                        }}
                                                    />

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems: "center",
                                                            gap: 18,
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        <div>
                                                            <div
                                                                style={{
                                                                    fontSize: 19,
                                                                    fontWeight: 850,
                                                                    color: "#111827",
                                                                    letterSpacing:
                                                                        "-0.5px",
                                                                }}
                                                            >
                                                                {
                                                                    result.course
                                                                        .title
                                                                }
                                                            </div>

                                                            <div
                                                                style={{
                                                                    marginTop: 6,
                                                                    fontSize: 13,
                                                                    color: "#64748b",
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    result.course
                                                                        .code
                                                                }
                                                            </div>

                                                            <div
                                                                style={{
                                                                    marginTop: 10,
                                                                    display: "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: 8,
                                                                    flexWrap: "wrap",
                                                                }}
                                                            >
                                <span
                                    style={{
                                        padding:
                                            "6px 10px",
                                        borderRadius:
                                            999,
                                        background:
                                            "#eff6ff",
                                        color:
                                            "#2563eb",
                                        fontSize: 11,
                                        fontWeight: 800,
                                        border:
                                            "1px solid #dbeafe",
                                    }}
                                >
                                  📘 Semester{" "}
                                    {
                                        result.semester
                                    }
                                </span>

                                                                <span
                                                                    style={{
                                                                        padding:
                                                                            "6px 10px",
                                                                        borderRadius:
                                                                            999,
                                                                        background:
                                                                            "#dcfce7",
                                                                        color:
                                                                            "#166534",
                                                                        fontSize: 11,
                                                                        fontWeight: 700,
                                                                        border:
                                                                            "1px solid #bbf7d0",
                                                                    }}
                                                                >
                                  Approved
                                </span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                gap: 12,
                                                                alignItems:
                                                                    "center",
                                                                flexWrap: "wrap",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    minWidth: 105,
                                                                    background:
                                                                        "white",
                                                                    border:
                                                                        "1px solid #e5e7eb",
                                                                    borderRadius: 18,
                                                                    padding:
                                                                        "12px 16px",
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        fontSize: 10,
                                                                        fontWeight: 700,
                                                                        color:
                                                                            "#64748b",
                                                                        textTransform:
                                                                            "uppercase",
                                                                    }}
                                                                >
                                                                    Marks
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        marginTop: 5,
                                                                        fontSize: 24,
                                                                        fontWeight: 900,
                                                                        color:
                                                                            "#111827",
                                                                    }}
                                                                >
                                                                    {result.marks}
                                                                </div>
                                                            </div>

                                                            <div
                                                                style={{
                                                                    minWidth: 105,
                                                                    background:
                                                                        "linear-gradient(135deg, #2563eb, #4f46e5)",
                                                                    borderRadius: 18,
                                                                    padding:
                                                                        "12px 16px",
                                                                    textAlign:
                                                                        "center",
                                                                    color: "white",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        fontSize: 10,
                                                                        fontWeight: 700,
                                                                        opacity: 0.85,
                                                                        textTransform:
                                                                            "uppercase",
                                                                    }}
                                                                >
                                                                    GPA
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        marginTop: 5,
                                                                        fontSize: 26,
                                                                        fontWeight: 900,
                                                                    }}
                                                                >
                                                                    {result.gpa}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div
                        style={{
                            background: "white",
                            border:
                                "1px dashed rgba(148,163,184,.4)",
                            borderRadius: 28,
                            padding: "70px 24px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 60,
                                marginBottom: 14,
                            }}
                        >
                            📚
                        </div>

                        <div
                            style={{
                                fontSize: 26,
                                fontWeight: 850,
                                color: "#111827",
                            }}
                        >
                            No Results Yet
                        </div>

                        <div
                            style={{
                                maxWidth: 480,
                                margin: "12px auto 0",
                                color: "#64748b",
                                fontSize: 14,
                                lineHeight: 1.8,
                            }}
                        >
                            Your published grades will appear here once
                            your teachers upload and administrators
                            approve them.
                        </div>
                    </div>
                )}

                {/* PAGINATION */}
                {pagination && (
                    <div
                        style={{
                            marginTop: 34,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: pagination,
                        }}
                    />
                )}
            </div>
        </>
    );
}