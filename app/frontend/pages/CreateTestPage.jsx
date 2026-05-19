import React, { useMemo, useState } from "react";

const backgroundAnimation = `
@keyframes floatOrb {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-18px) translateX(10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes pulseGlow {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.4;
  }
}
`;

export default function CreateTestPage({
                                           submit_url,
                                           csrf_token,
                                           test
                                       }) {
    const [form, setForm] = useState({
        title: test.title || "",
        description: test.description || "",
        start_time: formatDateTime(test.start_time),
        end_time: formatDateTime(test.end_time),
        duration_minutes: test.duration_minutes || "",
        total_marks: test.total_marks || "",
        published: test.published || false
    });

    const [focusedField, setFocusedField] = useState(null);
    const [loading, setLoading] = useState(false);

    const completion = useMemo(() => {
        const values = Object.values(form);

        const completed = values.filter((value) => {
            if (typeof value === "boolean") return true;
            return value !== "";
        }).length;

        return Math.round((completed / values.length) * 100);
    }, [form]);

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        setLoading(true);

        requestAnimationFrame(() => {
            document.getElementById("real-test-submit").click();
        });
    };

    return (
        <>
            <style>{backgroundAnimation}</style>

            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f7ff 100%)",
                    padding: "40px 20px",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily:
                        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont"
                }}
            >
                {/* Animated Background */}
                <div
                    style={{
                        position: "absolute",
                        width: 320,
                        height: 320,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(99,102,241,0.16), transparent 70%)",
                        top: -80,
                        left: -80,
                        animation: "floatOrb 8s ease-in-out infinite"
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 280,
                        height: 280,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(14,165,233,0.14), transparent 70%)",
                        bottom: -80,
                        right: -80,
                        animation: "floatOrb 10s ease-in-out infinite"
                    }}
                />

                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 2
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            marginBottom: 28,
                            animation: "fadeSlide 0.5s ease"
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "rgba(99,102,241,0.08)",
                                color: "#4338ca",
                                padding: "6px 14px",
                                borderRadius: 999,
                                fontWeight: 600,
                                fontSize: 13,
                                marginBottom: 16,
                                backdropFilter: "blur(8px)"
                            }}
                        >
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "#4f46e5",
                                    animation: "pulseGlow 2s infinite"
                                }}
                            />

                            Smart Test Builder
                        </div>

                        <h1
                            style={{
                                fontSize: 42,
                                fontWeight: 800,
                                margin: 0,
                                color: "#0f172a",
                                letterSpacing: "-1px"
                            }}
                        >
                            Create Test
                        </h1>

                        <p
                            style={{
                                marginTop: 12,
                                fontSize: 16,
                                color: "#64748b",
                                maxWidth: 620,
                                lineHeight: 1.6
                            }}
                        >
                            Create new assesment tests
                        </p>
                    </div>

                    {/* Progress Card */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            border: "1px solid rgba(255,255,255,0.6)",
                            backdropFilter: "blur(14px)",
                            borderRadius: 28,
                            padding: 22,
                            marginBottom: 24,
                            boxShadow: "0 10px 40px rgba(15,23,42,0.08)",
                            animation: "fadeSlide 0.6s ease"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 12
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: "#334155"
                                    }}
                                >
                                    Form Completion
                                </div>

                                <div
                                    style={{
                                        fontSize: 13,
                                        color: "#64748b",
                                        marginTop: 4
                                    }}
                                >
                                    Complete all fields before publishing
                                </div>
                            </div>

                            <div
                                style={{
                                    fontSize: 24,
                                    fontWeight: 800,
                                    color: "#4f46e5"
                                }}
                            >
                                {completion}%
                            </div>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                height: 10,
                                background: "#e2e8f0",
                                borderRadius: 999,
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    width: `${completion}%`,
                                    height: "100%",
                                    borderRadius: 999,
                                    transition: "all 0.35s ease",
                                    background:
                                        "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)"
                                }}
                            />
                        </div>
                    </div>

                    {/* Main Form */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.78)",
                            border: "1px solid rgba(255,255,255,0.7)",
                            backdropFilter: "blur(16px)",
                            borderRadius: 32,
                            padding: 34,
                            boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
                            animation: "fadeSlide 0.7s ease"
                        }}
                    >
                        <form action={submit_url} method="post">
                            <input
                                type="hidden"
                                name="authenticity_token"
                                value={csrf_token}
                            />

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 22
                                }}
                            >
                                <Field
                                    label="Test Title"
                                    focused={focusedField === "title"}
                                >
                                    <input
                                        type="text"
                                        name="test[title]"
                                        value={form.title}
                                        onFocus={() => setFocusedField("title")}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) =>
                                            updateField("title", e.target.value)
                                        }
                                        placeholder="Midterm Evaluation"
                                        style={inputStyle(focusedField === "title")}
                                    />
                                </Field>

                                <Field
                                    label="Duration (Minutes)"
                                    focused={focusedField === "duration"}
                                >
                                    <input
                                        type="number"
                                        name="test[duration_minutes]"
                                        value={form.duration_minutes}
                                        onFocus={() => setFocusedField("duration")}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) =>
                                            updateField(
                                                "duration_minutes",
                                                e.target.value
                                            )
                                        }
                                        placeholder="60"
                                        style={inputStyle(focusedField === "duration")}
                                    />
                                </Field>

                                <div style={{ gridColumn: "1 / -1" }}>
                                    <Field
                                        label="Description"
                                        focused={focusedField === "description"}
                                    >
                    <textarea
                        name="test[description]"
                        value={form.description}
                        onFocus={() =>
                            setFocusedField("description")
                        }
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                            updateField(
                                "description",
                                e.target.value
                            )
                        }
                        placeholder="Describe your assessment..."
                        rows={5}
                        style={{
                            ...inputStyle(
                                focusedField === "description"
                            ),
                            resize: "vertical",
                            minHeight: 140
                        }}
                    />
                                    </Field>
                                </div>

                                <Field
                                    label="Start Time"
                                    focused={focusedField === "start"}
                                >
                                    <input
                                        type="datetime-local"
                                        name="test[start_time]"
                                        value={form.start_time}
                                        onFocus={() => setFocusedField("start")}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) =>
                                            updateField(
                                                "start_time",
                                                e.target.value
                                            )
                                        }
                                        style={inputStyle(focusedField === "start")}
                                    />
                                </Field>

                                <Field
                                    label="End Time"
                                    focused={focusedField === "end"}
                                >
                                    <input
                                        type="datetime-local"
                                        name="test[end_time]"
                                        value={form.end_time}
                                        onFocus={() => setFocusedField("end")}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) =>
                                            updateField(
                                                "end_time",
                                                e.target.value
                                            )
                                        }
                                        style={inputStyle(focusedField === "end")}
                                    />
                                </Field>

                                <Field
                                    label="Total Marks"
                                    focused={focusedField === "marks"}
                                >
                                    <input
                                        type="number"
                                        name="test[total_marks]"
                                        value={form.total_marks}
                                        onFocus={() => setFocusedField("marks")}
                                        onBlur={() => setFocusedField(null)}
                                        onChange={(e) =>
                                            updateField(
                                                "total_marks",
                                                e.target.value
                                            )
                                        }
                                        placeholder="100"
                                        style={inputStyle(focusedField === "marks")}
                                    />
                                </Field>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                        background:
                                            "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
                                        padding: 20,
                                        borderRadius: 22,
                                        border: "1px solid #e2e8f0"
                                    }}
                                >
                                    <div
                                        onClick={() =>
                                            updateField(
                                                "published",
                                                !form.published
                                            )
                                        }
                                        style={{
                                            width: 64,
                                            height: 36,
                                            borderRadius: 999,
                                            background: form.published
                                                ? "#4f46e5"
                                                : "#cbd5e1",
                                            position: "relative",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: "50%",
                                                background: "white",
                                                position: "absolute",
                                                top: 4,
                                                left: form.published ? 32 : 4,
                                                transition: "all 0.3s ease",
                                                boxShadow:
                                                    "0 4px 10px rgba(15,23,42,0.15)"
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 700,
                                                color: "#0f172a"
                                            }}
                                        >
                                            Publish Immediately
                                        </div>

                                        <div
                                            style={{
                                                color: "#64748b",
                                                fontSize: 13,
                                                marginTop: 4
                                            }}
                                        >
                                            Students can access the test instantly
                                        </div>
                                    </div>

                                    <input
                                        type="hidden"
                                        name="test[published]"
                                        value={form.published ? "1" : "0"}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div
                                style={{
                                    marginTop: 34,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 16
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "center"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 14,
                                            height: 14,
                                            borderRadius: "50%",
                                            background: "#10b981"
                                        }}
                                    />

                                    <span
                                        style={{
                                            color: "#64748b",
                                            fontWeight: 500
                                        }}
                                    >
                    Autosave-ready
                  </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    style={{
                                        border: "none",
                                        background:
                                            "linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)",
                                        color: "white",
                                        padding: "16px 28px",
                                        borderRadius: 18,
                                        fontWeight: 700,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        boxShadow:
                                            "0 14px 30px rgba(79,70,229,0.25)",
                                        transform: loading
                                            ? "scale(0.98)"
                                            : "scale(1)"
                                    }}
                                >
                                    {loading ? "Creating..." : "Create Test"}
                                </button>

                                <button
                                    id="real-test-submit"
                                    type="submit"
                                    style={{ display: "none" }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

function Field({ label, focused, children }) {
    return (
        <div>
            <div
                style={{
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 10,
                    color: focused ? "#4338ca" : "#334155",
                    transition: "all 0.2s ease"
                }}
            >
                {label}
            </div>

            {children}
        </div>
    );
}

function inputStyle(focused) {
    return {
        width: "100%",
        padding: "16px 18px",
        borderRadius: 18,
        border: focused
            ? "1px solid #6366f1"
            : "1px solid #dbeafe",
        outline: "none",
        fontSize: 15,
        background: "rgba(255,255,255,0.92)",
        boxSizing: "border-box",
        transition: "all 0.25s ease",
        boxShadow: focused
            ? "0 0 0 5px rgba(99,102,241,0.12)"
            : "0 2px 4px rgba(15,23,42,0.03)"
    };
}

function formatDateTime(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    const pad = (num) => String(num).padStart(2, "0");

    return `${date.getFullYear()}-${pad(
        date.getMonth() + 1
    )}-${pad(date.getDate())}T${pad(
        date.getHours()
    )}:${pad(date.getMinutes())}`;
}