import React, { useState } from "react";

const floatingStyles = `
@keyframes floatBlob {
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

@keyframes pulseGlow {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.08);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

@keyframes slideFade {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
`;

const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    border: "1px solid rgba(148,163,184,0.18)",
    outline: "none",
    background: "rgba(248,250,252,0.9)",
    borderRadius: "18px",
    fontSize: "15px",
    color: "#0f172a",
    boxSizing: "border-box",
    transition: "all 0.25s ease",
    backdropFilter: "blur(8px)",
};

const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#334155",
    marginBottom: "8px",
    letterSpacing: "0.02em",
};

export default function EditCoursePage({
                                           initialCourse,
                                           teachers,
                                           isAdmin,
                                           formAction,
                                       }) {
    const [hovered, setHovered] = useState(false);

    const [form, setForm] = useState({
        title: initialCourse.title || "",
        code: initialCourse.code || "",
        semester: initialCourse.semester || "",
        teacher_id: initialCourse.teacher_id || "",
        price: initialCourse.price || "",
    });

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <>
            <style>{floatingStyles}</style>

            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(99,102,241,0.12), transparent 35%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
                    padding: "40px 20px",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily:
                        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
            >
                {/* Floating Background Blobs */}
                <div
                    style={{
                        position: "absolute",
                        width: "340px",
                        height: "340px",
                        borderRadius: "999px",
                        background: "rgba(59,130,246,0.10)",
                        filter: "blur(12px)",
                        top: "-120px",
                        left: "-100px",
                        animation: "floatBlob 7s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: "280px",
                        height: "280px",
                        borderRadius: "999px",
                        background: "rgba(99,102,241,0.10)",
                        filter: "blur(16px)",
                        bottom: "-80px",
                        right: "-80px",
                        animation: "pulseGlow 6s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        maxWidth: "820px",
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 2,
                        animation: "slideFade 0.7s ease",
                    }}
                >
                    {/* HERO */}
                    <div
                        style={{
                            marginBottom: "34px",
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 16px",
                                background: "rgba(37,99,235,0.08)",
                                border: "1px solid rgba(37,99,235,0.12)",
                                color: "#2563eb",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: "800",
                                marginBottom: "22px",
                                letterSpacing: "0.08em",
                                boxShadow: "0 8px 20px rgba(37,99,235,0.08)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            ✨ COURSE MANAGEMENT
                        </div>

                        <div>
                            <h1
                                style={{
                                    fontSize: "52px",
                                    fontWeight: "900",
                                    color: "#0f172a",
                                    margin: 0,
                                    letterSpacing: "-0.06em",
                                    lineHeight: 1,
                                }}
                            >
                                Edit Course
                            </h1>

                            <p
                                style={{
                                    color: "#64748b",
                                    marginTop: "16px",
                                    fontSize: "16px",
                                    lineHeight: "1.8",
                                    maxWidth: "580px",
                                }}
                            >
                                Update course information, assign instructors,
                                manage semesters, and configure pricing with a
                                modern interactive dashboard.
                            </p>
                        </div>
                    </div>

                    {/* FORM CARD */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            background: "rgba(255,255,255,0.74)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.7)",
                            borderRadius: "34px",
                            padding: "34px",
                            boxShadow:
                                "0 20px 60px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                        }}
                    >
                        {/* Decorative Glow */}
                        <div
                            style={{
                                position: "absolute",
                                width: "280px",
                                height: "280px",
                                background: "rgba(37,99,235,0.10)",
                                borderRadius: "999px",
                                top: "-140px",
                                right: "-90px",
                                filter: "blur(10px)",
                                animation: "pulseGlow 6s ease infinite",
                            }}
                        />

                        <form
                            action={formAction}
                            method="post"
                            style={{
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            <input
                                type="hidden"
                                name="_method"
                                value="patch"
                            />

                            {/* Rails CSRF */}
                            <input
                                type="hidden"
                                name="authenticity_token"
                                value={
                                    document
                                        .querySelector('meta[name="csrf-token"]')
                                        ?.getAttribute("content") || ""
                                }
                            />

                            {/* TITLE */}
                            <div style={{ marginBottom: "24px" }}>
                                <label style={labelStyle}>Course Title</label>

                                <input
                                    type="text"
                                    name="course[title]"
                                    value={form.title}
                                    onChange={(e) =>
                                        updateField("title", e.target.value)
                                    }
                                    placeholder="Enter course title"
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.target.style.border =
                                            "1px solid rgba(37,99,235,0.35)";
                                        e.target.style.transform = "translateY(-2px)";
                                        e.target.style.boxShadow =
                                            "0 12px 30px rgba(37,99,235,0.10)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border =
                                            "1px solid rgba(148,163,184,0.18)";
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                            </div>

                            {/* CODE */}
                            <div style={{ marginBottom: "24px" }}>
                                <label style={labelStyle}>Course Code</label>

                                <input
                                    type="text"
                                    name="course[code]"
                                    value={form.code}
                                    onChange={(e) =>
                                        updateField(
                                            "code",
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    placeholder="e.g. CSE401"
                                    style={inputStyle}
                                />
                            </div>

                            {/* SEMESTER */}
                            <div style={{ marginBottom: "24px" }}>
                                <label style={labelStyle}>Semester</label>

                                <input
                                    type="number"
                                    name="course[semester]"
                                    min="1"
                                    value={form.semester}
                                    onChange={(e) =>
                                        updateField("semester", e.target.value)
                                    }
                                    placeholder="Enter semester number"
                                    style={inputStyle}
                                />

                                <div
                                    style={{
                                        marginTop: "14px",
                                        padding: "16px 18px",
                                        borderRadius: "18px",
                                        background:
                                            "linear-gradient(135deg, #eff6ff, #eef2ff)",
                                        border: "1px solid #bfdbfe",
                                        color: "#1d4ed8",
                                        fontSize: "13px",
                                        lineHeight: "1.7",
                                        fontWeight: "700",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                                            backgroundSize: "400px 100%",
                                            animation: "shimmer 3s linear infinite",
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "relative",
                                            zIndex: 2,
                                        }}
                                    >
                                        🎓 Students will only be able to enroll in this
                                        course if it matches their current semester.
                                    </div>
                                </div>
                            </div>

                            {/* CONDITIONAL ADMIN SECTION */}
                            {isAdmin && (
                                <div
                                    style={{
                                        marginTop: "38px",
                                        paddingTop: "30px",
                                        borderTop: "1px solid #e2e8f0",
                                        animation: "slideFade 0.5s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "24px",
                                            gap: "14px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    fontSize: "22px",
                                                    fontWeight: "800",
                                                    color: "#0f172a",
                                                    letterSpacing: "-0.03em",
                                                }}
                                            >
                                                Admin Settings
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: "6px",
                                                    fontSize: "13px",
                                                    color: "#64748b",
                                                }}
                                            >
                                                Advanced course management controls
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                padding: "10px 16px",
                                                borderRadius: "999px",
                                                background:
                                                    "rgba(124,58,237,0.08)",
                                                color: "#7c3aed",
                                                fontSize: "12px",
                                                fontWeight: "800",
                                                letterSpacing: "0.04em",
                                            }}
                                        >
                                            🔒 RESTRICTED ACCESS
                                        </div>
                                    </div>

                                    {/* TEACHER */}
                                    <div style={{ marginBottom: "24px" }}>
                                        <label style={labelStyle}>
                                            Assign Teacher
                                        </label>

                                        <select
                                            name="course[teacher_id]"
                                            value={form.teacher_id}
                                            onChange={(e) =>
                                                updateField(
                                                    "teacher_id",
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                ...inputStyle,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <option value="">
                                                Select a teacher
                                            </option>

                                            {teachers.map((teacher) => (
                                                <option
                                                    key={teacher.id}
                                                    value={teacher.id}
                                                >
                                                    {teacher.email}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* PRICE */}
                                    <div style={{ marginBottom: "10px" }}>
                                        <label style={labelStyle}>
                                            Course Price
                                        </label>

                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                      <span
                          style={{
                              position: "absolute",
                              left: "18px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              fontWeight: "800",
                              color: "#475569",
                          }}
                      >
                        $
                      </span>

                                            <input
                                                type="number"
                                                name="course[price]"
                                                step="0.01"
                                                min="0"
                                                value={form.price}
                                                onChange={(e) =>
                                                    updateField(
                                                        "price",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                style={{
                                                    ...inputStyle,
                                                    paddingLeft: "40px",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BUTTON */}
                            <div style={{ marginTop: "36px" }}>
                                <button
                                    type="submit"
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    style={{
                                        width: "100%",
                                        padding: "18px",
                                        border: "none",
                                        borderRadius: "22px",
                                        background:
                                            "linear-gradient(135deg, #2563eb, #4f46e5)",
                                        color: "white",
                                        fontSize: "16px",
                                        fontWeight: "800",
                                        cursor: "pointer",
                                        letterSpacing: "0.01em",
                                        boxShadow:
                                            hovered
                                                ? "0 18px 38px rgba(37,99,235,0.40)"
                                                : "0 12px 28px rgba(37,99,235,0.28)",
                                        transition: "all .25s ease",
                                        transform: hovered
                                            ? "translateY(-3px) scale(1.01)"
                                            : "translateY(0) scale(1)",
                                    }}
                                >
                                    ✨ Update Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}