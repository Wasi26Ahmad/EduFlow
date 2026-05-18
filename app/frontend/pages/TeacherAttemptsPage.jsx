import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

const fadeUp = {
    opacity: 0,
    transform: "translateY(14px)",
};

const fadeUpVisible = {
    opacity: 1,
    transform: "translateY(0px)",
};

const glassCard = {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.55)",
    boxShadow: "0 8px 28px rgba(15,23,42,0.08)",
};

const statusColors = {
    submitted: {
        bg: "rgba(59,130,246,0.14)",
        text: "#2563eb",
    },
    pending: {
        bg: "rgba(234,179,8,0.15)",
        text: "#ca8a04",
    },
    evaluated: {
        bg: "rgba(34,197,94,0.15)",
        text: "#16a34a",
    },
    completed: {
        bg: "rgba(168,85,247,0.15)",
        text: "#9333ea",
    },
};

function FloatingOrb({
                         top,
                         left,
                         right,
                         size,
                         delay,
                     }) {
    return (
        <div
            style={{
                position: "absolute",
                top,
                left,
                right,
                width: size,
                height: size,
                borderRadius: "999px",
                background:
                    "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(56,189,248,0.15))",
                filter: "blur(12px)",
                animation:
                    "float 8s ease-in-out infinite",
                animationDelay: delay,
                pointerEvents: "none",
            }}
        />
    );
}

function AttemptCard({ attempt, index }) {
    const [hovered, setHovered] =
        useState(false);

    const normalizedStatus = (
        attempt.status || ""
    ).toLowerCase();

    const statusStyle =
        statusColors[normalizedStatus] || {
            bg: "rgba(148,163,184,0.16)",
            text: "#475569",
        };

    const studentEmail =
        attempt.student_email || "";

    const avatarLetter =
        studentEmail
            .charAt(0)
            .toUpperCase() || "S";

    return (
        <div
            style={{
                ...glassCard,
                ...fadeUpVisible,
                padding: "18px",
                borderRadius: "22px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: hovered
                    ? "translateY(-4px) scale(1.008)"
                    : "translateY(0px)",
                opacity: 1,
                animation:
                    "cardIn 0.55s ease forwards",
                animationDelay: `${index * 0.06}s`,
            }}
            onMouseEnter={() =>
                setHovered(true)
            }
            onMouseLeave={() =>
                setHovered(false)
            }
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(255,255,255,0))",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    gap: "14px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "46px",
                                height: "46px",
                                borderRadius: "14px",
                                background:
                                    "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "center",
                                fontWeight: 800,
                                fontSize: "16px",
                                letterSpacing:
                                    "0.5px",
                                boxShadow:
                                    "0 8px 20px rgba(99,102,241,0.25)",
                            }}
                        >
                            {avatarLetter}
                        </div>

                        <div>
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "15px",
                                    color: "#0f172a",
                                    fontWeight: 800,
                                    wordBreak:
                                        "break-word",
                                }}
                            >
                                {studentEmail}
                            </h2>

                            <div
                                style={{
                                    marginTop: "8px",
                                    display:
                                        "inline-flex",
                                    alignItems:
                                        "center",
                                    gap: "7px",
                                    padding:
                                        "6px 10px",
                                    borderRadius:
                                        "999px",
                                    background:
                                    statusStyle.bg,
                                    color:
                                    statusStyle.text,
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    textTransform:
                                        "capitalize",
                                }}
                            >
                                <span
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        borderRadius:
                                            "999px",
                                        background:
                                        statusStyle.text,
                                    }}
                                />

                                {attempt.status ||
                                    "Unknown"}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                background:
                                    "rgba(99,102,241,0.08)",
                                borderRadius: "15px",
                                padding:
                                    "12px 15px",
                                minWidth: "120px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "#64748b",
                                    marginBottom:
                                        "5px",
                                    fontWeight: 700,
                                    letterSpacing:
                                        "0.4px",
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Marks Obtained
                            </div>

                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 800,
                                    color: "#312e81",
                                }}
                            >
                                {attempt.marks ??
                                    0}
                            </div>
                        </div>

                        <div
                            style={{
                                background:
                                    "rgba(15,23,42,0.05)",
                                borderRadius: "15px",
                                padding:
                                    "12px 15px",
                                minWidth: "180px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "#64748b",
                                    marginBottom:
                                        "5px",
                                    fontWeight: 700,
                                    letterSpacing:
                                        "0.4px",
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Last Activity
                            </div>

                            <div
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                }}
                            >
                                {attempt.submitted_at ||
                                    "No timestamp"}
                            </div>
                        </div>
                    </div>
                </div>

                <a
                    href={attempt.evaluate_path}
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <button
                        style={{
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            padding:
                                "12px 17px",
                            borderRadius:
                                "15px",
                            background: hovered
                                ? "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)"
                                : "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                            color: "white",
                            fontWeight: 800,
                            fontSize: "13px",
                            boxShadow: hovered
                                ? "0 12px 24px rgba(79,70,229,0.32)"
                                : "0 8px 20px rgba(99,102,241,0.22)",
                            transition:
                                "all 0.25s ease",
                        }}
                    >
                        Evaluate →
                    </button>
                </a>
            </div>
        </div>
    );
}

export default function TeacherAttemptsPage({
                                                test = {},
                                                attempts = [],
                                            }) {
    const [visible, setVisible] =
        useState(false);

    const [search, setSearch] =
        useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const filteredAttempts = useMemo(() => {
        return attempts.filter((attempt) => {
            const studentEmail =
                attempt.student_email || "";

            return studentEmail
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );
        });
    }, [attempts, search]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(180deg, #eef2ff 0%, #f8fafc 40%, #ffffff 100%)",
                padding: "28px 18px",
                position: "relative",
                overflow: "hidden",
                fontFamily:
                    "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
        >
            <style>
                {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-14px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes cardIn {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
          }
        `}
            </style>

            <FloatingOrb
                top="-60px"
                left="-40px"
                size="180px"
                delay="0s"
            />

            <FloatingOrb
                top="120px"
                right="-60px"
                size="150px"
                delay="1.2s"
            />

            <FloatingOrb
                top="70%"
                left="75%"
                size="130px"
                delay="2s"
            />

            <div
                style={{
                    maxWidth: "1080px",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        ...glassCard,
                        ...(visible
                            ? fadeUpVisible
                            : fadeUp),
                        borderRadius: "26px",
                        padding: "28px",
                        marginBottom: "22px",
                        transition:
                            "all 0.6s ease",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "-100px",
                            right: "-60px",
                            width: "220px",
                            height: "220px",
                            borderRadius: "999px",
                            background:
                                "radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%)",
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
                                display:
                                    "inline-flex",
                                alignItems:
                                    "center",
                                gap: "7px",
                                background:
                                    "rgba(99,102,241,0.12)",
                                color: "#4338ca",
                                padding:
                                    "7px 12px",
                                borderRadius:
                                    "999px",
                                fontWeight: 700,
                                marginBottom:
                                    "14px",
                                fontSize: "12px",
                            }}
                        >
                            ✨ Smart Evaluation
                            Dashboard
                        </div>

                        <h1
                            style={{
                                margin: 0,
                                fontSize: "36px",
                                lineHeight: 1.1,
                                fontWeight: 900,
                                color: "#0f172a",
                                letterSpacing:
                                    "-1px",
                            }}
                        >
                            Attempts for{" "}
                            {test.title ||
                                "Untitled Test"}
                        </h1>

                        <p
                            style={{
                                marginTop: "14px",
                                marginBottom:
                                    "20px",
                                maxWidth: "660px",
                                color: "#475569",
                                fontSize: "15px",
                                lineHeight: 1.6,
                            }}
                        >
                            Evaluate submissions and get marks
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "14px",
                                flexWrap: "wrap",
                                alignItems:
                                    "center",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    minWidth: "220px",
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Search student emails..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target
                                                .value
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        outline: "none",
                                        borderRadius:
                                            "15px",
                                        padding:
                                            "13px 15px",
                                        fontSize:
                                            "14px",
                                        background:
                                            "rgba(255,255,255,0.92)",
                                        boxShadow:
                                            "0 5px 18px rgba(15,23,42,0.06)",
                                        color:
                                            "#0f172a",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    padding:
                                        "12px 16px",
                                    borderRadius:
                                        "15px",
                                    background:
                                        "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                                    color: "white",
                                    fontWeight: 800,
                                    fontSize: "13px",
                                    boxShadow:
                                        "0 8px 20px rgba(99,102,241,0.22)",
                                }}
                            >
                                {
                                    filteredAttempts.length
                                }{" "}
                                Attempts
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gap: "18px",
                    }}
                >
                    {filteredAttempts.length >
                    0 ? (
                        filteredAttempts.map(
                            (
                                attempt,
                                index
                            ) => (
                                <AttemptCard
                                    key={
                                        attempt.id
                                    }
                                    attempt={
                                        attempt
                                    }
                                    index={index}
                                />
                            )
                        )
                    ) : (
                        <div
                            style={{
                                ...glassCard,
                                borderRadius:
                                    "22px",
                                padding: "40px",
                                textAlign:
                                    "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "19px",
                                    fontWeight: 800,
                                    color: "#0f172a",
                                    marginBottom:
                                        "8px",
                                }}
                            >
                                No matching
                                attempts found
                            </div>

                            <div
                                style={{
                                    color: "#64748b",
                                    fontSize: "14px",
                                }}
                            >
                                Try searching
                                with another
                                student email.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}