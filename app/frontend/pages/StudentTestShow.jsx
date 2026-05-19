import React, { useEffect, useMemo, useState } from "react";

const floatingAnimation = `
@keyframes floatBlob {
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  50% {
    transform: translateY(-18px) translateX(10px) scale(1.04);
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotateSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

const glassCard = {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 14px 40px rgba(15,23,42,0.10)",
};

const detailCard = {
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(226,232,240,0.8)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    transition: "all 0.25s ease",
};

const formatLabel = (label) => label.toUpperCase();

export default function StudentTestShow({ test }) {
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 120);

        return () => clearTimeout(timeout);
    }, []);

    const stats = useMemo(
        () => [
            {
                label: "Duration",
                value: `${test.duration_minutes} mins`,
                icon: "⏳",
            },
            {
                label: "Marks",
                value: `${test.total_marks}`,
                icon: "🎯",
            },
            {
                label: "Course",
                value: test.course_title,
                icon: "📘",
            },
            {
                label: "Exam ID",
                value: `#${test.id}`,
                icon: "ID",
            },
        ],
        [test]
    );

    const handleStart = async () => {
        const form = document.createElement("form");

        form.method = "POST";
        form.action = test.start_path;

        const csrf = document.createElement("input");
        csrf.type = "hidden";
        csrf.name = "authenticity_token";
        csrf.value = test.csrf_token;

        form.appendChild(csrf);

        document.body.appendChild(form);

        form.submit();
    };

    return (
        <>
            <style>{floatingAnimation}</style>

            <div
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                    background:
                        "linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #f1f5f9 100%)",
                    padding: "28px 18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily:
                        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
                }}
            >

                <div
                    style={{
                        position: "absolute",
                        width: 300,
                        height: 300,
                        borderRadius: "999px",
                        background:
                            "radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)",
                        top: -80,
                        left: -80,
                        animation: "floatBlob 10s ease-in-out infinite",
                        filter: "blur(12px)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 260,
                        height: 260,
                        borderRadius: "999px",
                        background:
                            "radial-gradient(circle, rgba(14,165,233,0.10), transparent 70%)",
                        bottom: -90,
                        right: -70,
                        animation: "floatBlob 12s ease-in-out infinite",
                        filter: "blur(12px)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 580,
                        height: 580,
                        borderRadius: "999px",
                        border: "1px dashed rgba(148,163,184,0.12)",
                        animation: "rotateSlow 50s linear infinite",
                    }}
                />

                <div
                    style={{
                        ...glassCard,
                        width: "100%",
                        maxWidth: 960,
                        borderRadius: 28,
                        overflow: "hidden",
                        position: "relative",
                        opacity: loaded ? 1 : 0,
                        transform: loaded
                            ? "translateY(0px)"
                            : "translateY(20px)",
                        transition: "all 0.8s ease",
                    }}
                >
                    <div
                        style={{
                            padding: "36px 40px 30px",
                            borderBottom: "1px solid rgba(226,232,240,0.9)",
                            background:
                                "linear-gradient(to bottom, rgba(255,255,255,0.92), rgba(248,250,252,0.92))",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 20,
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: 240 }}>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        background: "rgba(99,102,241,0.08)",
                                        color: "#4338ca",
                                        padding: "7px 14px",
                                        borderRadius: 999,
                                        marginBottom: 18,
                                        fontWeight: 700,
                                        fontSize: 11,
                                        letterSpacing: 0.8,
                                        border:
                                            "1px solid rgba(99,102,241,0.12)",
                                    }}
                                >
                                    ● TEST SESSION
                                </div>

                                <h1
                                    style={{
                                        margin: 0,
                                        fontSize: "clamp(1.9rem, 4vw, 3rem)",
                                        color: "#0f172a",
                                        fontWeight: 800,
                                        lineHeight: 1.08,
                                        letterSpacing: "-1.5px",
                                        animation: "fadeSlide 0.9s ease",
                                    }}
                                >
                                    {test.title}
                                </h1>

                                <p
                                    style={{
                                        marginTop: 16,
                                        marginBottom: 0,
                                        color: "#475569",
                                        fontSize: 15,
                                        lineHeight: 1.7,
                                        maxWidth: 640,
                                        animation: "fadeSlide 1.1s ease",
                                    }}
                                >
                                    {test.description ||
                                        "No description provided."}
                                </p>
                            </div>

                            <div
                                style={{
                                    width: 110,
                                    height: 110,
                                    borderRadius: 24,
                                    background:
                                        "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                                    border:
                                        "1px solid rgba(226,232,240,0.9)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#334155",
                                    fontSize: 46,
                                    boxShadow:
                                        "inset 0 1px 0 rgba(255,255,255,0.8)",
                                }}
                            >
                                T
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            padding: "26px 26px 8px",
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(190px, 1fr))",
                            gap: 18,
                        }}
                    >
                        {stats.map((item, index) => (
                            <div
                                key={item.label}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    ...detailCard,
                                    padding: 20,
                                    borderRadius: 22,
                                    transform:
                                        hovered === index
                                            ? "translateY(-4px)"
                                            : "translateY(0px)",
                                    boxShadow:
                                        hovered === index
                                            ? "0 12px 24px rgba(15,23,42,0.08)"
                                            : "0 4px 14px rgba(15,23,42,0.04)",
                                    animation: `fadeSlide ${
                                        0.5 + index * 0.15
                                    }s ease`,
                                    cursor: "pointer",
                                }}
                            >
                                <div
                                    style={{
                                        width: 46,
                                        height: 46,
                                        borderRadius: 14,
                                        background:
                                            "linear-gradient(135deg, #4f46e5, #6366f1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20,
                                        marginBottom: 14,
                                        color: "white",
                                        boxShadow:
                                            "0 8px 18px rgba(79,70,229,0.18)",
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        letterSpacing: 1.1,
                                        color: "#64748b",
                                        marginBottom: 8,
                                    }}
                                >
                                    {formatLabel(item.label)}
                                </div>

                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 800,
                                        color: "#0f172a",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            padding: "8px 26px 28px",
                        }}
                    >
                        <div
                            style={{
                                ...detailCard,
                                borderRadius: 24,
                                padding: 24,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 22,
                                    flexWrap: "wrap",
                                }}
                            >
                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <div
                                        style={{
                                            color: "#4f46e5",
                                            fontWeight: 800,
                                            letterSpacing: 1,
                                            fontSize: 11,
                                            marginBottom: 10,
                                        }}
                                    >
                                        TEST STARTS
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 21,
                                            fontWeight: 800,
                                            color: "#0f172a",
                                        }}
                                    >
                                        {test.start_time}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        width: 1,
                                        background:
                                            "linear-gradient(to bottom, transparent, rgba(148,163,184,0.35), transparent)",
                                    }}
                                />

                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <div
                                        style={{
                                            color: "#0f766e",
                                            fontWeight: 800,
                                            letterSpacing: 1,
                                            fontSize: 11,
                                            marginBottom: 10,
                                        }}
                                    >
                                        TEST ENDS
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 21,
                                            fontWeight: 800,
                                            color: "#0f172a",
                                        }}
                                    >
                                        {test.end_time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            padding: "0 26px 30px",
                        }}
                    >
                        <button
                            onClick={handleStart}
                            style={{
                                width: "100%",
                                border: "none",
                                borderRadius: 20,
                                padding: "17px 22px",
                                background: "#0f172a",
                                color: "white",
                                fontSize: 16,
                                fontWeight: 800,
                                letterSpacing: 0.2,
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                                boxShadow:
                                    "0 12px 24px rgba(15,23,42,0.16)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                e.currentTarget.style.background = "#020617";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0px)";
                                e.currentTarget.style.background = "#0f172a";
                            }}
                        >
                            Start Test
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}