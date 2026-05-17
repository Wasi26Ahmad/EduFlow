import React, { useEffect, useMemo, useState } from "react";

const fadeUp = {
    opacity: 0,
    transform: "translateY(20px)",
};

const fadeUpVisible = {
    opacity: 1,
    transform: "translateY(0px)",
};

const glassCard = {
    background: "rgba(255,255,255,0.78)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.55)",
    boxShadow: "0 10px 35px rgba(15,23,42,0.08)",
};

function AnimatedCounter({ value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;

        const increment = Math.max(1, Math.ceil(value / 24));

        const interval = setInterval(() => {
            current += increment;

            if (current >= value) {
                current = value;
                clearInterval(interval);
            }

            setCount(current);
        }, 25);

        return () => clearInterval(interval);
    }, [value]);

    return <>{count}</>;
}

function StatCard({ label, value, delay }) {
    return (
        <div
            style={{
                ...glassCard,
                padding: "18px",
                borderRadius: "22px",
                transition: "all 0.45s ease",
                animation: `fadeInUp 0.7s ease ${delay}s forwards`,
                opacity: 0,
            }}
            className="hover-lift"
        >
            <div
                style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#64748b",
                    marginBottom: "8px",
                    letterSpacing: "0.3px",
                }}
            >
                {label}
            </div>

            <div
                style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    color: "#0f172a",
                }}
            >
                <AnimatedCounter value={value} />
            </div>
        </div>
    );
}

function OptionItem({ option, index }) {
    return (
        <div
            className="option-row"
            style={{
                padding: "12px 14px",
                borderRadius: "14px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: option.correct
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(248,250,252,0.9)",
                border: option.correct
                    ? "1px solid rgba(34,197,94,0.3)"
                    : "1px solid rgba(226,232,240,0.9)",
                transition: "all 0.25s ease",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <div
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "999px",
                        background: option.correct
                            ? "rgba(34,197,94,0.18)"
                            : "rgba(148,163,184,0.14)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0f172a",
                    }}
                >
                    {String.fromCharCode(65 + index)}
                </div>

                <div
                    style={{
                        color: "#1e293b",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: 1.5,
                    }}
                >
                    {option.content}
                </div>
            </div>

            {option.correct && (
                <div
                    style={{
                        background: "rgba(34,197,94,0.18)",
                        color: "#15803d",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                    }}
                >
                    ✓ Correct
                </div>
            )}
        </div>
    );
}

function QuestionCard({ question, index }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
        }, index * 90);

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <div
            className="question-card hover-lift"
            style={{
                ...glassCard,
                borderRadius: "28px",
                padding: "26px",
                marginBottom: "24px",
                transition: "all 0.45s cubic-bezier(.17,.67,.38,1)",
                ...(visible ? fadeUpVisible : fadeUp),
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "18px",
                    marginBottom: "22px",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            background:
                                "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.14))",
                            color: "#2563eb",
                            fontWeight: 700,
                            fontSize: "13px",
                            marginBottom: "14px",
                        }}
                    >
                        <span>Question {question.index}</span>
                    </div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1.3,
                        }}
                    >
                        {question.content}
                    </h2>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            padding: "10px 14px",
                            borderRadius: "14px",
                            background: "rgba(15,23,42,0.06)",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#334155",
                        }}
                    >
                        {question.question_type}
                    </div>

                    <div
                        style={{
                            padding: "10px 14px",
                            borderRadius: "14px",
                            background:
                                "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(245,158,11,0.12))",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#b45309",
                        }}
                    >
                        {question.marks} Marks
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "22px",
                }}
            >
                <div
                    style={{
                        padding: "10px 14px",
                        borderRadius: "12px",
                        background: question.auto_check
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(239,68,68,0.12)",
                        color: question.auto_check
                            ? "#15803d"
                            : "#b91c1c",
                        fontWeight: 700,
                        fontSize: "13px",
                    }}
                >
                    {question.auto_check
                        ? "Automatic Checking Enabled"
                        : "Manual Checking"}
                </div>
            </div>

            {question.mcq ? (
                <div>
                    <div
                        style={{
                            fontSize: "15px",
                            fontWeight: 800,
                            color: "#334155",
                            marginBottom: "14px",
                        }}
                    >
                        Options
                    </div>

                    {question.options.map((option, optionIndex) => (
                        <OptionItem
                            key={option.id}
                            option={option}
                            index={optionIndex}
                        />
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        padding: "18px",
                        borderRadius: "18px",
                        background:
                            "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(59,130,246,0.05))",
                        border: "1px solid rgba(99,102,241,0.12)",
                    }}
                >
                    <div
                        style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#6366f1",
                            marginBottom: "8px",
                            letterSpacing: "0.3px",
                        }}
                    >
                        Correct Answer
                    </div>

                    <div
                        style={{
                            color: "#1e293b",
                            fontWeight: 600,
                            lineHeight: 1.7,
                            fontSize: "15px",
                        }}
                    >
                        {question.correct_answer}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function TeacherQuestionsPage({
                                                 test,
                                                 questions,
                                                 add_question_path,
                                             }) {
    const [search, setSearch] = useState("");

    const filteredQuestions = useMemo(() => {
        return questions.filter((question) => {
            const text = `
                ${question.content}
                ${question.question_type}
            `.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [questions, search]);

    const mcqCount = useMemo(() => {
        return questions.filter((q) => q.mcq).length;
    }, [questions]);

    const autoCheckedCount = useMemo(() => {
        return questions.filter((q) => q.auto_check).length;
    }, [questions]);

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
                            radial-gradient(circle at top left, rgba(99,102,241,0.14), transparent 24%),
                            radial-gradient(circle at bottom right, rgba(59,130,246,0.12), transparent 26%),
                            #f8fafc;
                        font-family:
                            Inter,
                            ui-sans-serif,
                            system-ui,
                            -apple-system,
                            BlinkMacSystemFont,
                            "Segoe UI",
                            sans-serif;
                    }

                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(22px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0px);
                        }
                    }

                    .hover-lift:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 20px 45px rgba(15,23,42,0.12);
                    }

                    .question-card:hover {
                        border-color: rgba(99,102,241,0.22);
                    }

                    .option-row:hover {
                        transform: translateX(4px);
                    }

                    .search-input:focus {
                        outline: none;
                        border-color: rgba(99,102,241,0.5);
                        box-shadow: 0 0 0 5px rgba(99,102,241,0.1);
                    }

                    .add-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 14px 30px rgba(79,70,229,0.28);
                    }

                    @media (max-width: 768px) {
                        .stats-grid {
                            grid-template-columns: 1fr !important;
                        }

                        .page-padding {
                            padding: 22px !important;
                        }
                    }
                `}
            </style>

            <div
                className="page-padding"
                style={{
                    maxWidth: "1180px",
                    margin: "0 auto",
                    padding: "40px",
                }}
            >
                <div
                    style={{
                        marginBottom: "34px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "18px",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <div
                            style={{
                                color: "#6366f1",
                                fontWeight: 800,
                                fontSize: "14px",
                                marginBottom: "10px",
                                letterSpacing: "0.4px",
                                textTransform: "uppercase",
                            }}
                        >
                            Teacher Dashboard
                        </div>

                        <h1
                            style={{
                                margin: 0,
                                fontSize: "44px",
                                lineHeight: 1.1,
                                fontWeight: 900,
                                color: "#0f172a",
                            }}
                        >
                            {test.title}
                        </h1>

                        <p
                            style={{
                                marginTop: "14px",
                                color: "#64748b",
                                fontSize: "15px",
                                maxWidth: "720px",
                                lineHeight: 1.7,
                            }}
                        >
                            Manage, review and organize all questions with
                            blazing-fast React rendering, smooth animations and
                            optimized UI transitions.
                        </p>
                    </div>

                    <a
                        href={add_question_path}
                        className="add-btn"
                        style={{
                            background:
                                "linear-gradient(135deg, #4f46e5, #3b82f6)",
                            color: "white",
                            textDecoration: "none",
                            padding: "16px 22px",
                            borderRadius: "18px",
                            fontWeight: 800,
                            fontSize: "14px",
                            transition: "all 0.25s ease",
                            boxShadow:
                                "0 10px 24px rgba(79,70,229,0.22)",
                        }}
                    >
                        + Add New Question
                    </a>
                </div>

                <div
                    className="stats-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "18px",
                        marginBottom: "26px",
                    }}
                >
                    <StatCard
                        label="Total Questions"
                        value={questions.length}
                        delay={0}
                    />

                    <StatCard
                        label="MCQ Questions"
                        value={mcqCount}
                        delay={0.08}
                    />

                    <StatCard
                        label="Auto Checked"
                        value={autoCheckedCount}
                        delay={0.16}
                    />
                </div>

                <div
                    style={{
                        ...glassCard,
                        borderRadius: "24px",
                        padding: "18px",
                        marginBottom: "26px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search questions, types..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                        style={{
                            width: "100%",
                            padding: "16px 18px",
                            borderRadius: "16px",
                            border: "1px solid rgba(226,232,240,1)",
                            fontSize: "15px",
                            transition: "all 0.25s ease",
                            background: "rgba(255,255,255,0.95)",
                        }}
                    />
                </div>

                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, index) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            index={index}
                        />
                    ))
                ) : (
                    <div
                        style={{
                            ...glassCard,
                            borderRadius: "24px",
                            padding: "60px 30px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "22px",
                                fontWeight: 800,
                                color: "#0f172a",
                                marginBottom: "10px",
                            }}
                        >
                            No questions found
                        </div>

                        <div
                            style={{
                                color: "#64748b",
                                fontSize: "15px",
                            }}
                        >
                            Try searching with different keywords.
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}