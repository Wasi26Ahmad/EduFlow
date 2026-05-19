import React, { useEffect, useMemo, useState } from "react";

const styles = `
@keyframes floatBlob {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-14px) translateX(8px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes pulseRing {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}
`;

const glass = {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 10px 35px rgba(15,23,42,0.10)",
};

export default function TestAttemptPage({ data }) {
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(0);

    const totalQuestions = data.test.questions.length;

    const expiresAt = useMemo(() => {
        return new Date(data.expires_at).getTime();
    }, [data.expires_at]);

    const totalDuration = useMemo(() => {
        return expiresAt - Date.now();
    }, [expiresAt]);

    useEffect(() => {
        const interval = setInterval(() => {
            const distance = expiresAt - Date.now();

            if (distance <= 0) {
                clearInterval(interval);
                handleSubmit(true);
                return;
            }

            setTimeLeft(distance);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    const minutes = Math.floor(timeLeft / 1000 / 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    const completionPercentage = useMemo(() => {
        if (totalQuestions === 0) return 0;

        return Math.round(
            (Object.keys(answers).length / totalQuestions) * 100
        );
    }, [answers, totalQuestions]);

    const timerProgress = useMemo(() => {
        if (!totalDuration || totalDuration <= 0) return 0;

        return Math.max(
            0,
            Math.min(1, timeLeft / totalDuration)
        );
    }, [timeLeft, totalDuration]);

    const timerHue = Math.max(0, (1 - timerProgress) * 120);
    const timerColor = `hsl(${timerHue}, 85%, 48%)`;

    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleNext = () => {
        if (activeQuestion < totalQuestions - 1) {
            setActiveQuestion((prev) => prev + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            setActiveQuestion((prev) => prev - 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const handleSubmit = async () => {
        if (submitting) return;

        setSubmitting(true);

        const formData = new FormData();

        formData.append("_method", "patch");

        formData.append(
            "authenticity_token",
            data.csrf_token
        );

        Object.entries(answers).forEach(([questionId, answer]) => {
            formData.append(`answers[${questionId}]`, answer);
        });

        try {
            await fetch(data.submit_url, {
                method: "POST",
                headers: {
                    Accept: "text/html",
                },
                body: formData,
            });

            window.location.href = "/dashboard";
        } catch (error) {
            console.error(error);
            alert("Failed to submit test.");
            setSubmitting(false);
        }
    };

    return (
        <>
            <style>{styles}</style>

            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(135deg, #eef2ff 0%, #f8fafc 40%, #ecfeff 100%)",
                    position: "relative",
                    overflow: "hidden",
                    padding: "28px 18px",
                    fontFamily:
                        "Inter, ui-sans-serif, system-ui, sans-serif",
                }}>

                {/* Background Blobs */}
                <div
                    style={{
                        position: "absolute",
                        width: 240,
                        height: 240,
                        borderRadius: "50%",
                        background:
                            "rgba(99,102,241,0.12)",
                        top: -70,
                        left: -70,
                        filter: "blur(10px)",
                        animation:
                            "floatBlob 8s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background:
                            "rgba(16,185,129,0.10)",
                        bottom: -60,
                        right: -40,
                        filter: "blur(8px)",
                        animation:
                            "floatBlob 10s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        maxWidth: 1020,
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 5,
                    }}>

                    {/* HEADER */}
                    <div
                        style={{
                            ...glass,
                            borderRadius: 24,
                            padding: 22,
                            marginBottom: 22,
                            animation: "fadeUp 0.5s ease",
                        }}>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 18,
                                flexWrap: "wrap",
                            }}>

                            <div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: 1,
                                        textTransform: "uppercase",
                                        color: "#6366f1",
                                        marginBottom: 6,
                                    }}>
                                    Live Test Session
                                </div>

                                <h1
                                    style={{
                                        margin: 0,
                                        fontSize: 30,
                                        fontWeight: 800,
                                        color: "#0f172a",
                                    }}>
                                    {data.test.title}
                                </h1>
                            </div>

                            {/* TIMER */}
                            <div
                                style={{
                                    ...glass,
                                    borderRadius: 20,
                                    padding: "14px 18px",
                                    minWidth: 190,
                                    position: "relative",
                                    overflow: "hidden",
                                    border: `1px solid ${timerColor}25`,
                                }}>

                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: `${timerColor}10`,
                                    }}
                                />

                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 2,
                                    }}>

                                    <div
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: timerColor,
                                            marginBottom: 6,
                                            textTransform: "uppercase",
                                        }}>
                                        Time Remaining
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 28,
                                            fontWeight: 800,
                                            color: "#111827",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                        }}>

                                        <div
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: "50%",
                                                background: timerColor,
                                                position: "relative",
                                            }}>

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: "50%",
                                                    border: `2px solid ${timerColor}66`,
                                                    animation:
                                                        "pulseRing 1.5s linear infinite",
                                                }}
                                            />
                                        </div>

                                        {minutes}m {seconds}s
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROGRESS */}
                        <div
                            style={{
                                marginTop: 22,
                            }}>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 8,
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: "#334155",
                                }}>

                                <span>Completion Progress</span>

                                <span>
                                    {completionPercentage}%
                                </span>
                            </div>

                            <div
                                style={{
                                    height: 10,
                                    borderRadius: 999,
                                    background:
                                        "rgba(148,163,184,0.18)",
                                    overflow: "hidden",
                                }}>

                                <div
                                    style={{
                                        width: `${completionPercentage}%`,
                                        height: "100%",
                                        borderRadius: 999,
                                        background:
                                            "linear-gradient(90deg, #6366f1, #06b6d4)",
                                        transition:
                                            "width 0.35s ease",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "260px 1fr",
                            gap: 20,
                            alignItems: "start",
                        }}>

                        {/* NAVIGATOR */}
                        <div
                            style={{
                                ...glass,
                                borderRadius: 24,
                                padding: 20,
                                position: "sticky",
                                top: 20,
                            }}>

                            <h2
                                style={{
                                    marginTop: 0,
                                    marginBottom: 16,
                                    fontSize: 18,
                                    color: "#0f172a",
                                }}>
                                Question Navigator
                            </h2>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(4, 1fr)",
                                    gap: 10,
                                }}>

                                {data.test.questions.map(
                                    (question, index) => {
                                        const answered =
                                            answers[question.id];

                                        return (
                                            <button
                                                key={question.id}
                                                onClick={() =>
                                                    setActiveQuestion(index)
                                                }
                                                style={{
                                                    height: 46,
                                                    borderRadius: 14,
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontWeight: 800,
                                                    fontSize: 14,
                                                    transition:
                                                        "all 0.25s ease",
                                                    background:
                                                        activeQuestion ===
                                                        index
                                                            ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                                                            : answered
                                                                ? "linear-gradient(135deg, #10b981, #059669)"
                                                                : "rgba(255,255,255,0.7)",
                                                    color:
                                                        activeQuestion ===
                                                        index ||
                                                        answered
                                                            ? "white"
                                                            : "#334155",
                                                    transform:
                                                        activeQuestion ===
                                                        index
                                                            ? "scale(1.05)"
                                                            : "scale(1)",
                                                }}>
                                                {index + 1}
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* QUESTIONS */}
                        <div
                            style={{
                                position: "relative",
                            }}>

                            {data.test.questions.map(
                                (question, index) => {
                                    const isActive =
                                        activeQuestion === index;

                                    if (!isActive) return null;

                                    return (
                                        <div
                                            key={question.id}
                                            style={{
                                                ...glass,
                                                borderRadius: 26,
                                                padding: 24,
                                                border:
                                                    "2px solid rgba(99,102,241,0.20)",
                                                animation:
                                                    "fadeUp 0.35s ease",
                                            }}>

                                            {/* QUESTION HEADER */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems:
                                                        "center",
                                                    marginBottom: 18,
                                                    flexWrap:
                                                        "wrap",
                                                    gap: 12,
                                                }}>

                                                <div
                                                    style={{
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        gap: 12,
                                                    }}>

                                                    <div
                                                        style={{
                                                            width: 46,
                                                            height: 46,
                                                            borderRadius: 16,
                                                            background:
                                                                "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                                            color: "white",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            fontWeight: 800,
                                                            fontSize: 18,
                                                        }}>
                                                        {index + 1}
                                                    </div>

                                                    <div>
                                                        <div
                                                            style={{
                                                                fontSize: 20,
                                                                fontWeight: 800,
                                                                color: "#0f172a",
                                                            }}>
                                                            Question{" "}
                                                            {index + 1}
                                                        </div>

                                                        <div
                                                            style={{
                                                                color: "#64748b",
                                                                marginTop: 3,
                                                                fontWeight: 600,
                                                                fontSize: 14,
                                                            }}>
                                                            {
                                                                question.marks
                                                            }{" "}
                                                            marks
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* QUESTION CONTENT */}
                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    lineHeight: 1.8,
                                                    color: "#1e293b",
                                                    marginBottom: 22,
                                                    fontWeight: 500,
                                                }}>
                                                {
                                                    question.content
                                                }
                                            </div>

                                            {/* MCQ */}
                                            {question.question_type ===
                                            "mcq" ? (
                                                <div
                                                    style={{
                                                        display:
                                                            "grid",
                                                        gap: 12,
                                                    }}>

                                                    {question.options.map(
                                                        (
                                                            option
                                                        ) => {
                                                            const selected =
                                                                answers[
                                                                    question
                                                                        .id
                                                                    ] ===
                                                                String(
                                                                    option.id
                                                                );

                                                            return (
                                                                <label
                                                                    key={
                                                                        option.id
                                                                    }
                                                                    style={{
                                                                        cursor:
                                                                            "pointer",
                                                                    }}>

                                                                    <input
                                                                        type="radio"
                                                                        name={`question-${question.id}`}
                                                                        value={
                                                                            option.id
                                                                        }
                                                                        checked={
                                                                            selected
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleAnswerChange(
                                                                                question.id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                "none",
                                                                        }}
                                                                    />

                                                                    <div
                                                                        style={{
                                                                            padding:
                                                                                "15px 16px",
                                                                            borderRadius: 18,
                                                                            border:
                                                                                selected
                                                                                    ? "2px solid #6366f1"
                                                                                    : "1px solid rgba(148,163,184,0.20)",
                                                                            background:
                                                                                selected
                                                                                    ? "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(139,92,246,0.06))"
                                                                                    : "rgba(255,255,255,0.55)",
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            gap: 14,
                                                                            transition:
                                                                                "all 0.25s ease",
                                                                        }}>

                                                                        <div
                                                                            style={{
                                                                                width: 20,
                                                                                height: 20,
                                                                                borderRadius:
                                                                                    "50%",
                                                                                border:
                                                                                    selected
                                                                                        ? "6px solid #6366f1"
                                                                                        : "2px solid #cbd5e1",
                                                                            }}
                                                                        />

                                                                        <div
                                                                            style={{
                                                                                fontSize: 15,
                                                                                fontWeight: 600,
                                                                                color: "#0f172a",
                                                                            }}>
                                                                            {
                                                                                option.content
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            ) : (
                                                <textarea
                                                    value={
                                                        answers[
                                                            question.id
                                                            ] ||
                                                        ""
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleAnswerChange(
                                                            question.id,
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Write your answer here..."
                                                    style={{
                                                        width: "100%",
                                                        minHeight: 180,
                                                        borderRadius: 20,
                                                        border:
                                                            "1px solid rgba(148,163,184,0.22)",
                                                        padding: 18,
                                                        resize:
                                                            "vertical",
                                                        fontSize: 15,
                                                        outline:
                                                            "none",
                                                        boxSizing:
                                                            "border-box",
                                                        background:
                                                            "rgba(255,255,255,0.75)",
                                                    }}
                                                />
                                            )}

                                            {/* ACTION BUTTONS */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems:
                                                        "center",
                                                    marginTop: 28,
                                                    gap: 14,
                                                    flexWrap:
                                                        "wrap",
                                                }}>

                                                <button
                                                    onClick={
                                                        handlePrevious
                                                    }
                                                    disabled={
                                                        index === 0
                                                    }
                                                    style={{
                                                        border:
                                                            "none",
                                                        borderRadius: 16,
                                                        padding:
                                                            "14px 20px",
                                                        fontSize: 14,
                                                        fontWeight: 700,
                                                        cursor:
                                                            index ===
                                                            0
                                                                ? "not-allowed"
                                                                : "pointer",
                                                        background:
                                                            index ===
                                                            0
                                                                ? "#cbd5e1"
                                                                : "rgba(255,255,255,0.9)",
                                                        color:
                                                            index ===
                                                            0
                                                                ? "#64748b"
                                                                : "#0f172a",
                                                    }}>
                                                    Previous
                                                </button>

                                                {index ===
                                                totalQuestions -
                                                1 ? (
                                                    <button
                                                        onClick={
                                                            handleSubmit
                                                        }
                                                        disabled={
                                                            submitting
                                                        }
                                                        style={{
                                                            border:
                                                                "none",
                                                            borderRadius: 16,
                                                            padding:
                                                                "14px 24px",
                                                            fontSize: 15,
                                                            fontWeight: 800,
                                                            cursor:
                                                                "pointer",
                                                            color: "white",
                                                            background:
                                                                submitting
                                                                    ? "#94a3b8"
                                                                    : "linear-gradient(135deg, #2563eb, #7c3aed)",
                                                        }}>
                                                        {submitting
                                                            ? "Submitting..."
                                                            : "Submit Test"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={
                                                            handleNext
                                                        }
                                                        style={{
                                                            border:
                                                                "none",
                                                            borderRadius: 16,
                                                            padding:
                                                                "14px 24px",
                                                            fontSize: 15,
                                                            fontWeight: 800,
                                                            cursor:
                                                                "pointer",
                                                            color: "white",
                                                            background:
                                                                "linear-gradient(135deg, #2563eb, #7c3aed)",
                                                        }}>
                                                        Next Question
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}