import React, { useMemo, useState } from "react";

const glassCard = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.28)",
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
};

const inputStyle = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: "14px",
    border: "1px solid rgba(148,163,184,0.18)",
    background: "rgba(255,255,255,0.55)",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.25s ease",
    color: "#0f172a",
    boxSizing: "border-box",
};

const labelStyle = {
    fontWeight: 600,
    marginBottom: "8px",
    display: "block",
    color: "#334155",
    fontSize: "14px",
};

export default function TeacherQuestionCreate({
                                                  submit_url,
                                                  question_types = [],
                                              }) {
    const defaultType = useMemo(() => {
        return question_types?.[0] || "mcq";
    }, [question_types]);

    const [questionType, setQuestionType] =
        useState(defaultType);

    const isMCQ =
        questionType.toLowerCase().includes("mcq") ||
        questionType
            .toLowerCase()
            .includes("multiple");

    const isShort =
        questionType.toLowerCase().includes("short");

    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
                animation: "fadeUp 0.4s ease",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "980px",
                    margin: "0 auto",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "34px",
                            fontWeight: 800,
                            marginBottom: "6px",
                            color: "#0f172a",
                            letterSpacing: "-0.8px",
                        }}
                    >
                        Create Question
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                            margin: 0,
                        }}
                    >
                        Add questions and set evaluation method
                    </p>
                </div>

                {/* CARD */}
                <form
                    method="post"
                    action={submit_url}
                    style={{
                        ...glassCard,
                        borderRadius: "26px",
                        padding: "30px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* CSRF */}
                    <input
                        type="hidden"
                        name="authenticity_token"
                        value={
                            document
                                .querySelector(
                                    'meta[name="csrf-token"]'
                                )
                                ?.getAttribute("content") || ""
                        }
                    />

                    {/* CONTENT */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "22px",
                        }}
                    >
                        {/* QUESTION */}
                        <div>
                            <label style={labelStyle}>
                                Question
                            </label>

                            <textarea
                                name="question[content]"
                                rows="5"
                                placeholder="Type your question..."
                                style={{
                                    ...inputStyle,
                                    minHeight: "140px",
                                    resize: "vertical",
                                }}
                            />
                        </div>

                        {/* TOP GRID */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: "18px",
                            }}
                        >
                            <div>
                                <label style={labelStyle}>
                                    Question Type
                                </label>

                                <select
                                    name="question[question_type]"
                                    value={questionType}
                                    onChange={(e) =>
                                        setQuestionType(e.target.value)
                                    }
                                    style={{
                                        ...inputStyle,
                                        cursor: "pointer",
                                    }}
                                >
                                    {question_types.map((type) => (
                                        <option
                                            key={type}
                                            value={type}
                                        >
                                            {type
                                                .replaceAll("_", " ")
                                                .replace(/\b\w/g, (c) =>
                                                    c.toUpperCase()
                                                )}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>
                                    Marks
                                </label>

                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    name="question[marks]"
                                    placeholder="5"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* AUTO CHECK */}
                        <div
                            style={{
                                padding: "16px 18px",
                                borderRadius: "18px",
                                background:
                                    "rgba(255,255,255,0.38)",
                                border:
                                    "1px solid rgba(148,163,184,0.12)",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <input
                                type="checkbox"
                                name="question[auto_check]"
                                id="auto_check"
                                style={{
                                    width: "17px",
                                    height: "17px",
                                    cursor: "pointer",
                                }}
                            />

                            <label
                                htmlFor="auto_check"
                                style={{
                                    fontWeight: 600,
                                    color: "#334155",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                            >
                                Enable Automatic Checking
                            </label>
                        </div>

                        {/* MCQ */}
                        <div
                            style={{
                                maxHeight: isMCQ
                                    ? "900px"
                                    : "0px",
                                opacity: isMCQ ? 1 : 0,
                                overflow: "hidden",
                                transition:
                                    "all 0.35s ease-in-out",
                            }}
                        >
                            <div
                                style={{
                                    padding: "24px",
                                    borderRadius: "22px",
                                    background:
                                        "rgba(255,255,255,0.35)",
                                    border:
                                        "1px solid rgba(148,163,184,0.12)",
                                }}
                            >
                                <h2
                                    style={{
                                        marginTop: 0,
                                        marginBottom: "20px",
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: "#0f172a",
                                    }}
                                >
                                    MCQ Options
                                </h2>

                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "14px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                minWidth: "78px",
                                                fontWeight: 600,
                                                color: "#475569",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Option {i + 1}
                                        </div>

                                        <input
                                            type="text"
                                            name={`options[${i}]`}
                                            placeholder={`Option ${
                                                i + 1
                                            }`}
                                            style={{
                                                ...inputStyle,
                                                flex: 1,
                                            }}
                                        />

                                        <label
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                fontWeight: 600,
                                                color: "#334155",
                                                fontSize: "14px",
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="correct_option"
                                                value={i}
                                            />

                                            Correct
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SHORT ANSWER */}
                        <div
                            style={{
                                maxHeight: isShort
                                    ? "400px"
                                    : "0px",
                                opacity: isShort ? 1 : 0,
                                overflow: "hidden",
                                transition:
                                    "all 0.35s ease-in-out",
                            }}
                        >
                            <div
                                style={{
                                    padding: "24px",
                                    borderRadius: "22px",
                                    background:
                                        "rgba(255,255,255,0.35)",
                                    border:
                                        "1px solid rgba(148,163,184,0.12)",
                                }}
                            >
                                <label
                                    style={{
                                        ...labelStyle,
                                        fontSize: "18px",
                                        marginBottom: "14px",
                                    }}
                                >
                                    Correct Answer
                                </label>

                                <textarea
                                    name="correct_answer"
                                    rows="4"
                                    placeholder="Type the correct answer..."
                                    style={{
                                        ...inputStyle,
                                        resize: "vertical",
                                    }}
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "4px",
                            }}
                        >
                            <button
                                type="submit"
                                style={{
                                    border: "none",
                                    background:
                                        "linear-gradient(135deg, #4f46e5, #6366f1)",
                                    color: "white",
                                    padding: "14px 28px",
                                    borderRadius: "14px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transition: "all 0.22s ease",
                                    boxShadow:
                                        "0 8px 24px rgba(79,70,229,0.18)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0px)";
                                }}
                            >
                                Create Question
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <style>
                {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }

            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          textarea:focus,
          input:focus,
          select:focus {
            border-color: rgba(99,102,241,0.45) !important;
            box-shadow: 0 0 0 4px rgba(99,102,241,0.08);
            background: rgba(255,255,255,0.82) !important;
          }

          button:active {
            transform: scale(0.98);
          }
        `}
            </style>
        </div>
    );
}