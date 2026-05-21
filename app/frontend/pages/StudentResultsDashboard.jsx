import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

const fadeInUp = {
    animation: "fadeUp .6s ease forwards",
};

function groupBySemester(results) {
    return results.reduce((acc, result) => {
        const semester =
            result.semester ||
            result.course?.semester ||
            "N/A";

        if (!acc[semester]) {
            acc[semester] = [];
        }

        acc[semester].push(result);

        return acc;
    }, {});
}

export default function StudentResultsDashboard({
                                                    results = [],
                                                    pagination,
                                                    generatePdfUrl,
                                                    latestExport,
                                                }) {
    const [activeCard, setActiveCard] =
        useState(null);

    const [exportState, setExportState] =
        useState(latestExport || null);

    const [loading, setLoading] =
        useState(false);

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

    const totalCourses =
        normalizedResults.length;

    useEffect(() => {
        if (
            !exportState ||
            !["pending", "processing"].includes(
                exportState.status
            )
        ) {
            return;
        }
        const interval = setInterval(async () => {
            try {
                const response = await fetch(
                    `/result_exports/${exportState.id}.json`
                );

                if (!response.ok) {
                    return;
                }

                const data = await response.json();

                setExportState(data);

                if (
                    data.status === "completed" &&
                    data.file_url
                ) {
                    clearInterval(interval);

                    const link =
                        document.createElement("a");

                    link.href = data.file_url;

                    link.setAttribute(
                        "download",
                        "transcript.pdf"
                    );

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);
                }

                if (data.status === "failed") {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error(error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [exportState]);

    const generatePdf = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                generatePdfUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        "X-CSRF-Token":
                            document
                                .querySelector(
                                    'meta[name="csrf-token"]'
                                )
                                ?.getAttribute(
                                    "content"
                                ),
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to generate PDF"
                );
            }

            const data =
                await response.json();

            setExportState(data);
        } catch (error) {
            console.error(error);

            alert(
                "Failed to start PDF generation."
            );
        } finally {
            setLoading(false);
        }
    };

    const renderExportButton = () => {
        if (!exportState) {
            return (
                <button
                    onClick={generatePdf}
                    disabled={loading}
                    style={{
                        marginTop: 18,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "14px 20px",
                        background: "#ffffff",
                        color: "#2563eb",
                        borderRadius: 14,
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 800,
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        boxShadow:
                            "0 8px 20px rgba(0,0,0,.12)",
                        transition: "all .2s ease",
                    }}
                >
                    {loading
                        ? "Generating..."
                        : "⬇ Generate PDF"}
                </button>
            );
        }

        if (
            ["pending", "processing"].includes(
                exportState.status
            )
        ) {
            return (
                <div
                    style={{
                        marginTop: 18,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 20px",
                        borderRadius: 14,
                        background: "#ffffff",
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#2563eb",
                        boxShadow:
                            "0 8px 20px rgba(0,0,0,.12)",
                    }}
                >
                    ⏳ Generating PDF...
                </div>
            );
        }

        if (
            exportState.status === "failed"
        ) {
            return (
                <div
                    style={{
                        marginTop: 18,
                    }}
                >
                    <div
                        style={{
                            fontSize: 13,
                            marginBottom: 10,
                            color: "#fee2e2",
                            fontWeight: 700,
                        }}
                    >
                        PDF generation failed
                    </div>

                    <button
                        onClick={generatePdf}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "14px 20px",
                            background: "#ffffff",
                            color: "#2563eb",
                            borderRadius: 14,
                            fontSize: 14,
                            fontWeight: 800,
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,.12)",
                        }}
                    >
                        Retry PDF Generation
                    </button>
                </div>
            );
        }

        if (
            exportState.status === "completed"
        ) {
            return (
                <a
                    href={
                        exportState.download_url
                    }
                    style={{
                        marginTop: 18,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "14px 20px",
                        background: "#ffffff",
                        color: "#2563eb",
                        borderRadius: 14,
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 800,
                        border: "none",
                        boxShadow:
                            "0 8px 20px rgba(0,0,0,.12)",
                    }}
                >
                    ⬇ Download PDF
                </a>
            );
        }

        return null;
    };

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
        `}
            </style>

            <div
                style={{
                    maxWidth: 1080,
                    margin:
                        "30px auto",
                    padding:
                        "0 16px 50px",
                    fontFamily:
                        "Inter, system-ui, sans-serif",
                }}
            >
                {/* HERO */}
                <div
                    style={{
                        borderRadius: 28,
                        padding: 30,
                        background:
                            "linear-gradient(135deg, #ffffff 0%, #f3f8ff 50%, #e8f0ff 100%)",
                        border:
                            "1px solid rgba(191,219,254,.7)",
                        boxShadow:
                            "0 18px 45px rgba(59,130,246,.08)",
                        marginBottom: 22,
                    }}
                >
                    <div
                        style={{
                            display:
                                "inline-flex",
                            alignItems:
                                "center",
                            gap: 8,
                            padding:
                                "7px 12px",
                            borderRadius: 999,
                            background:
                                "linear-gradient(135deg, #dbeafe, #eff6ff)",
                            color:
                                "#2563eb",
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing:
                                ".5px",
                            textTransform:
                                "uppercase",
                            border:
                                "1px solid #bfdbfe",
                        }}
                    >
                        🎓 Student Academic Dashboard
                    </div>

                    <h1
                        style={{
                            fontSize: 52,
                            fontWeight: 900,
                            margin:
                                "18px 0 10px",
                            color:
                                "#0f172a",
                        }}
                    >
                        My Results
                    </h1>

                    <p
                        style={{
                            maxWidth: 620,
                            color:
                                "#475569",
                            fontSize: 15,
                            lineHeight:
                                1.8,
                        }}
                    >
                        Track your academic
                        performance semester-by-semester
                        and generate your official transcript.
                    </p>
                </div>

                {/* TOP CARDS */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 18,
                        marginBottom: 28,
                    }}
                >
                    <div
                        className="dashboard-card"
                        style={{
                            background:
                                "white",
                            borderRadius: 24,
                            padding: 24,
                            border:
                                "1px solid #e5e7eb",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color:
                                    "#64748b",
                                textTransform:
                                    "uppercase",
                            }}
                        >
                            Courses Completed
                        </div>

                        <div
                            style={{
                                marginTop: 14,
                                fontSize: 42,
                                fontWeight: 900,
                            }}
                        >
                            {totalCourses}
                        </div>
                    </div>

                    <div
                        className="dashboard-card"
                        style={{
                            background:
                                "white",
                            borderRadius: 24,
                            padding: 24,
                            border:
                                "1px solid #e5e7eb",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color:
                                    "#64748b",
                                textTransform:
                                    "uppercase",
                            }}
                        >
                            Semesters Completed
                        </div>

                        <div
                            style={{
                                marginTop: 14,
                                fontSize: 42,
                                fontWeight: 900,
                                color:
                                    "#7c3aed",
                            }}
                        >
                            {
                                semesterKeys.length
                            }
                        </div>
                    </div>

                    {/* PDF CARD */}
                    <div
                        style={{
                            borderRadius: 24,
                            padding: 24,
                            background:
                                "linear-gradient(135deg, #2563eb, #4f46e5)",
                            color: "white",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 800,
                                textTransform:
                                    "uppercase",
                                opacity: 0.9,
                            }}
                        >
                            Official Transcript
                        </div>

                        <div
                            style={{
                                marginTop: 10,
                                fontSize: 36,
                                fontWeight: 900,
                            }}
                        >
                            PDF Export
                        </div>

                        <div
                            style={{
                                marginTop: 10,
                                fontSize: 14,
                                opacity: 0.9,
                            }}
                        >
                            Generate and download your transcript instantly.
                        </div>

                        {renderExportButton()}
                    </div>
                </div>

                {/* RESULTS */}
                <div
                    style={{
                        display:
                            "flex",
                        flexDirection:
                            "column",
                        gap: 24,
                    }}
                >
                    {semesterKeys.map(
                        (semester) => {
                            const semesterResults =
                                semesterGroups[
                                    semester
                                    ];

                            const semesterGPA =
                                (
                                    semesterResults.reduce(
                                        (
                                            acc,
                                            r
                                        ) =>
                                            acc +
                                            Number(
                                                r.gpa ||
                                                0
                                            ),
                                        0
                                    ) /
                                    semesterResults.length
                                ).toFixed(
                                    2
                                );

                            return (
                                <div
                                    key={
                                        semester
                                    }
                                    style={{
                                        background:
                                            "white",
                                        borderRadius: 28,
                                        border:
                                            "1px solid #e5e7eb",
                                        overflow:
                                            "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding:
                                                "22px 24px",
                                            background:
                                                "linear-gradient(135deg,#eff6ff 0%, #f5f3ff 100%)",
                                            borderBottom:
                                                "1px solid #e0e7ff",
                                            display:
                                                "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems:
                                                "center",
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    fontSize: 28,
                                                    fontWeight: 900,
                                                }}
                                            >
                                                Semester{" "}
                                                {
                                                    semester
                                                }
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: 4,
                                                    color:
                                                        "#64748b",
                                                }}
                                            >
                                                {
                                                    semesterResults.length
                                                }{" "}
                                                published results
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                textAlign:
                                                    "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color:
                                                        "#64748b",
                                                }}
                                            >
                                                GPA
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 28,
                                                    fontWeight: 900,
                                                    color:
                                                        "#2563eb",
                                                }}
                                            >
                                                {
                                                    semesterGPA
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            padding: 18,
                                            display:
                                                "grid",
                                            gap: 16,
                                        }}
                                    >
                                        {semesterResults.map(
                                            (
                                                result
                                            ) => (
                                                <div
                                                    key={
                                                        result.id
                                                    }
                                                    className="course-row"
                                                    onMouseEnter={() =>
                                                        setActiveCard(
                                                            result.id
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setActiveCard(
                                                            null
                                                        )
                                                    }
                                                    style={{
                                                        border:
                                                            "1px solid #e5e7eb",
                                                        borderRadius: 22,
                                                        padding: 22,
                                                        background:
                                                            "linear-gradient(to bottom right, #ffffff, #f8fbff)",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display:
                                                                "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems:
                                                                "center",
                                                            flexWrap:
                                                                "wrap",
                                                            gap: 18,
                                                        }}
                                                    >
                                                        <div>
                                                            <div
                                                                style={{
                                                                    fontSize: 20,
                                                                    fontWeight: 900,
                                                                }}
                                                            >
                                                                {
                                                                    result
                                                                        .course
                                                                        .title
                                                                }
                                                            </div>

                                                            <div
                                                                style={{
                                                                    marginTop: 6,
                                                                    color:
                                                                        "#64748b",
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    result
                                                                        .course
                                                                        .code
                                                                }
                                                            </div>
                                                        </div>

                                                        <div
                                                            style={{
                                                                display:
                                                                    "flex",
                                                                gap: 14,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    minWidth: 110,
                                                                    padding:
                                                                        "12px 16px",
                                                                    borderRadius: 18,
                                                                    background:
                                                                        "white",
                                                                    border:
                                                                        "1px solid #e5e7eb",
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        fontSize: 11,
                                                                        color:
                                                                            "#64748b",
                                                                    }}
                                                                >
                                                                    Marks
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        marginTop: 6,
                                                                        fontSize: 26,
                                                                        fontWeight: 900,
                                                                    }}
                                                                >
                                                                    {
                                                                        result.marks
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div
                                                                style={{
                                                                    minWidth: 110,
                                                                    padding:
                                                                        "12px 16px",
                                                                    borderRadius: 18,
                                                                    background:
                                                                        "linear-gradient(135deg, #2563eb, #4f46e5)",
                                                                    color:
                                                                        "white",
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        fontSize: 11,
                                                                        opacity: 0.85,
                                                                    }}
                                                                >
                                                                    GPA
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        marginTop: 6,
                                                                        fontSize: 26,
                                                                        fontWeight: 900,
                                                                    }}
                                                                >
                                                                    {
                                                                        result.gpa
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                {pagination && (
                    <div
                        style={{
                            marginTop: 34,
                            display:
                                "flex",
                            justifyContent:
                                "center",
                        }}
                        dangerouslySetInnerHTML={{
                            __html:
                            pagination,
                        }}
                    />
                )}
            </div>
        </>
    );
}