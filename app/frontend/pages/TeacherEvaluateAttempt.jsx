import React, { useMemo, useState } from "react";

const glass = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.42)",
    boxShadow: "0 10px 30px rgba(15,23,42,0.10)"
};

export default function TeacherEvaluateAttempt({
                                                   student_name,
                                                   test_title,
                                                   answers,
                                                   submit_url
                                               }) {
    const initialMarks = useMemo(() => {
        const obj = {};

        answers.forEach((answer) => {
            obj[answer.id] = "";
        });

        return obj;
    }, [answers]);

    const [marks, setMarks] = useState(initialMarks);
    const [hoveredCard, setHoveredCard] = useState(null);

    const totalGiven = useMemo(() => {
        return Object.values(marks).reduce((sum, val) => {
            return sum + (parseFloat(val) || 0);
        }, 0);
    }, [marks]);

    const totalMax = useMemo(() => {
        return answers.reduce((sum, answer) => {
            return sum + parseFloat(answer.max_marks || 0);
        }, 0);
    }, [answers]);

    const handleMarkChange = (id, value, max) => {
        if (value === "") {
            setMarks((prev) => ({
                ...prev,
                [id]: ""
            }));

            return;
        }

        let numeric = parseFloat(value);

        if (Number.isNaN(numeric)) return;

        if (numeric > max) numeric = max;
        if (numeric < 0) numeric = 0;

        setMarks((prev) => ({
            ...prev,
            [id]: numeric
        }));
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "28px",
                background:
                    "linear-gradient(135deg, #f8fbff 0%, #eef4ff 50%, #f8faff 100%)",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Animated background blobs */}
            <div
                style={{
                    position: "absolute",
                    width: 360,
                    height: 360,
                    borderRadius: "50%",
                    background: "#93c5fd",
                    filter: "blur(110px)",
                    top: -100,
                    left: -90,
                    opacity: 0.24,
                    animation: "floatOne 8s ease-in-out infinite"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    background: "#c4b5fd",
                    filter: "blur(110px)",
                    bottom: -100,
                    right: -70,
                    opacity: 0.24,
                    animation: "floatTwo 10s ease-in-out infinite"
                }}
            />

            <div
                style={{
                    maxWidth: 1080,
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2
                }}
            >
                {/* Hero Header */}
                <div
                    style={{
                        ...glass,
                        borderRadius: 28,
                        padding: "26px 30px",
                        marginBottom: 22,
                        transition: "all 0.35s ease"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 18,
                            flexWrap: "wrap"
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    color: "#6366f1",
                                    marginBottom: 10
                                }}
                            >
                                Evaluation Workspace
                            </div>

                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: 34,
                                    fontWeight: 800,
                                    color: "#0f172a",
                                    lineHeight: 1.1
                                }}
                            >
                                Evaluate Attempt
                            </h1>

                            <div
                                style={{
                                    marginTop: 14,
                                    display: "flex",
                                    gap: 10,
                                    flexWrap: "wrap"
                                }}
                            >
                                <div
                                    style={{
                                        padding: "8px 14px",
                                        borderRadius: 999,
                                        background: "rgba(99,102,241,0.12)",
                                        color: "#4338ca",
                                        fontWeight: 700,
                                        fontSize: 14
                                    }}
                                >
                                    Student: {student_name}
                                </div>

                                <div
                                    style={{
                                        padding: "8px 14px",
                                        borderRadius: 999,
                                        background: "rgba(16,185,129,0.12)",
                                        color: "#047857",
                                        fontWeight: 700,
                                        fontSize: 14
                                    }}
                                >
                                    Test: {test_title}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                ...glass,
                                borderRadius: 20,
                                minWidth: 190,
                                padding: 18,
                                alignSelf: "flex-start"
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 12,
                                    color: "#64748b",
                                    fontWeight: 700,
                                    marginBottom: 8
                                }}
                            >
                                Current Evaluation
                            </div>

                            <div
                                style={{
                                    fontSize: 34,
                                    fontWeight: 800,
                                    color: "#0f172a"
                                }}
                            >
                                {totalGiven}
                                <span
                                    style={{
                                        fontSize: 17,
                                        color: "#64748b",
                                        marginLeft: 4
                                    }}
                                >
                                    / {totalMax}
                                </span>
                            </div>

                            <div
                                style={{
                                    marginTop: 14,
                                    width: "100%",
                                    height: 8,
                                    borderRadius: 999,
                                    background: "rgba(148,163,184,0.2)",
                                    overflow: "hidden"
                                }}
                            >
                                <div
                                    style={{
                                        width: `${(totalGiven / totalMax) * 100 || 0}%`,
                                        height: "100%",
                                        borderRadius: 999,
                                        background:
                                            "linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)",
                                        transition: "width 0.35s ease"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <form action={submit_url} method="post">
                    <input
                        type="hidden"
                        name="_method"
                        value="patch"
                    />

                    {document.querySelector('meta[name="csrf-token"]') && (
                        <input
                            type="hidden"
                            name="authenticity_token"
                            value={
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    .getAttribute("content")
                            }
                        />
                    )}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 18
                        }}
                    >
                        {answers.map((answer, index) => {
                            const isHovered = hoveredCard === answer.id;

                            return (
                                <div
                                    key={answer.id}
                                    onMouseEnter={() => setHoveredCard(answer.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        ...glass,
                                        borderRadius: 24,
                                        padding: 24,
                                        transform: isHovered
                                            ? "translateY(-4px) scale(1.005)"
                                            : "translateY(0px)",
                                        transition:
                                            "transform 0.35s ease, box-shadow 0.35s ease",
                                        boxShadow: isHovered
                                            ? "0 18px 40px rgba(79,70,229,0.14)"
                                            : glass.boxShadow
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 18,
                                            flexWrap: "wrap",
                                            marginBottom: 18
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    padding: "6px 12px",
                                                    borderRadius: 999,
                                                    background: "rgba(99,102,241,0.1)",
                                                    color: "#4338ca",
                                                    fontWeight: 700,
                                                    fontSize: 12,
                                                    marginBottom: 12
                                                }}
                                            >
                                                Question {index + 1}
                                            </div>

                                            <h2
                                                style={{
                                                    margin: 0,
                                                    color: "#0f172a",
                                                    fontSize: 20,
                                                    lineHeight: 1.45,
                                                    maxWidth: 760
                                                }}
                                            >
                                                {answer.question_content}
                                            </h2>
                                        </div>

                                        <div
                                            style={{
                                                minWidth: 110,
                                                textAlign: "center",
                                                padding: 16,
                                                borderRadius: 18,
                                                background: "rgba(255,255,255,0.55)"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#64748b",
                                                    fontWeight: 700,
                                                    marginBottom: 6
                                                }}
                                            >
                                                Max Marks
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 28,
                                                    fontWeight: 800,
                                                    color: "#0f172a"
                                                }}
                                            >
                                                {answer.max_marks}
                                            </div>
                                        </div>
                                    </div>

                                    {!answer.auto_check ? (
                                        <>
                                            <div
                                                style={{
                                                    marginBottom: 10,
                                                    fontWeight: 700,
                                                    color: "#334155",
                                                    fontSize: 14
                                                }}
                                            >
                                                Student Answer
                                            </div>

                                            <div
                                                style={{
                                                    padding: 18,
                                                    borderRadius: 18,
                                                    background: "rgba(255,255,255,0.62)",
                                                    border: "1px solid rgba(226,232,240,0.9)",
                                                    lineHeight: 1.7,
                                                    color: "#1e293b",
                                                    fontSize: 15
                                                }}
                                            >
                                                {answer.student_answer || "No answer submitted."}
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: 22,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 14,
                                                    flexWrap: "wrap"
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        style={{
                                                            fontWeight: 700,
                                                            color: "#334155",
                                                            marginBottom: 6,
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        Give Marks
                                                    </div>

                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        max={answer.max_marks}
                                                        min="0"
                                                        name={`marks[${answer.id}]`}
                                                        value={marks[answer.id]}
                                                        onChange={(e) =>
                                                            handleMarkChange(
                                                                answer.id,
                                                                e.target.value,
                                                                answer.max_marks
                                                            )
                                                        }
                                                        placeholder="0"
                                                        style={{
                                                            width: 120,
                                                            padding: "13px 15px",
                                                            borderRadius: 14,
                                                            border:
                                                                "1px solid rgba(148,163,184,0.35)",
                                                            outline: "none",
                                                            fontSize: 16,
                                                            fontWeight: 700,
                                                            color: "#0f172a",
                                                            background: "rgba(255,255,255,0.9)",
                                                            transition: "all 0.25s ease"
                                                        }}
                                                    />
                                                </div>

                                                <div
                                                    style={{
                                                        padding: "11px 14px",
                                                        borderRadius: 14,
                                                        background: "rgba(99,102,241,0.08)",
                                                        color: "#4338ca",
                                                        fontWeight: 700,
                                                        fontSize: 14
                                                    }}
                                                >
                                                    Manual Evaluation Required
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            style={{
                                                padding: 18,
                                                borderRadius: 18,
                                                background:
                                                    "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08))",
                                                border:
                                                    "1px solid rgba(16,185,129,0.15)"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    gap: 16,
                                                    flexWrap: "wrap",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        style={{
                                                            fontWeight: 800,
                                                            color: "#047857",
                                                            fontSize: 18,
                                                            marginBottom: 4
                                                        }}
                                                    >
                                                        Auto Graded MCQ
                                                    </div>

                                                    <div
                                                        style={{
                                                            color: "#475569",
                                                            lineHeight: 1.6,
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        This answer has already been evaluated
                                                        automatically by the system.
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        padding: "14px 18px",
                                                        borderRadius: 18,
                                                        background: "white",
                                                        textAlign: "center",
                                                        minWidth: 120
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: 12,
                                                            color: "#64748b",
                                                            fontWeight: 700,
                                                            marginBottom: 4
                                                        }}
                                                    >
                                                        Obtained
                                                    </div>

                                                    <div
                                                        style={{
                                                            fontSize: 28,
                                                            fontWeight: 800,
                                                            color: "#059669"
                                                        }}
                                                    >
                                                        {answer.obtained_marks}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div
                        style={{
                            marginTop: 26,
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <button
                            type="submit"
                            style={{
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                                padding: "15px 28px",
                                borderRadius: 18,
                                fontSize: 16,
                                fontWeight: 800,
                                color: "white",
                                background:
                                    "linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)",
                                boxShadow:
                                    "0 14px 34px rgba(99,102,241,0.28)",
                                transition: "all 0.35s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-2px) scale(1.01)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0px) scale(1)";
                            }}
                        >
                            Finalize Evaluation
                        </button>
                    </div>
                </form>
            </div>

            <style>
                {`
          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            font-family: Inter, system-ui, sans-serif;
          }

          @keyframes floatOne{
            0%{
              transform:translateY(0px) translateX(0px);
            }
            50%{
              transform:translateY(24px) translateX(18px);
            }
            100%{
              transform:translateY(0px) translateX(0px);
            }
          }

          @keyframes floatTwo{
            0%{
              transform:translateY(0px) translateX(0px);
            }
            50%{
              transform:translateY(-18px) translateX(-24px);
            }
            100%{
              transform:translateY(0px) translateX(0px);
            }
          }

          input:focus{
            border-color:#6366f1 !important;
            box-shadow:0 0 0 4px rgba(99,102,241,0.15);
          }

          @media (max-width: 768px){
            h1{
              font-size:28px !important;
            }
          }
        `}
            </style>
        </div>
    );
}