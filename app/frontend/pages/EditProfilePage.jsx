import React, { useMemo, useState } from "react";

export default function EditProfilePage({ user, profilePath }) {
    const [form, setForm] = useState({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender || "Male",
        date_of_birth: user.date_of_birth || "",
        current_semester: user.current_semester || "",
        bio: user.bio || "",
    });

    const [focused, setFocused] = useState(null);
    const [loading, setLoading] = useState(false);

    const profileCompletion = useMemo(() => {
        const values = Object.values(form);
        const filled = values.filter((v) => String(v).trim() !== "").length;
        return Math.round((filled / values.length) * 100);
    }, [form]);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await fetch(profilePath, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-Token": document
                        .querySelector("meta[name='csrf-token']")
                        ?.getAttribute("content"),
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    user: form,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = profilePath;
            } else {
                console.error(data);
                alert(data?.errors?.join("\n") || "Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong while updating profile.");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            label: "Full Name",
            key: "name",
            type: "text",
            placeholder: "Enter your full name",
            icon: "👤",
        },
        {
            label: "Phone",
            key: "phone",
            type: "text",
            placeholder: "Enter phone number",
            icon: "📞",
        },
        {
            label: "Address",
            key: "address",
            type: "text",
            placeholder: "Enter address",
            icon: "📍",
        },
        {
            label: "Date of Birth",
            key: "date_of_birth",
            type: "date",
            icon: "🎂",
        },
        {
            label: "Current Semester",
            key: "current_semester",
            type: "number",
            placeholder: "Semester",
            icon: "🎓",
        },
    ];

    return (
        <div style={styles.page}>
            <div style={styles.glowOne} />
            <div style={styles.glowTwo} />

            <div style={styles.container}>
                {/* HERO */}
                <div style={styles.hero}>
                    <div>
                        <div style={styles.badge}>
                            <span>✨</span>
                            Student Portal
                        </div>

                        <h1 style={styles.title}>Edit Profile</h1>

                        <p style={styles.subtitle}>
                            Update your information with a clean modern profile editor.
                        </p>
                    </div>

                    <div style={styles.progressCard}>
                        <div style={styles.progressHeader}>
                            <span>Profile Completion</span>
                            <strong>{profileCompletion}%</strong>
                        </div>

                        <div style={styles.progressBar}>
                            <div
                                style={{
                                    ...styles.progressFill,
                                    width: `${profileCompletion}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* MAIN CARD */}
                <div style={styles.card}>
                    <div style={styles.cardGlow} />

                    <form onSubmit={handleSubmit}>
                        <div style={styles.grid}>
                            {fields.map((field) => (
                                <div key={field.key} style={styles.fieldWrapper}>
                                    <label style={styles.label}>{field.label}</label>

                                    <div
                                        style={{
                                            ...styles.inputContainer,
                                            borderColor:
                                                focused === field.key
                                                    ? "#2563eb"
                                                    : "#e5e7eb",
                                            transform:
                                                focused === field.key
                                                    ? "translateY(-1px)"
                                                    : "translateY(0px)",
                                            boxShadow:
                                                focused === field.key
                                                    ? "0 0 0 4px rgba(37,99,235,0.10)"
                                                    : "0 4px 14px rgba(15,23,42,0.05)",
                                        }}
                                    >
                                        <span style={styles.icon}>{field.icon}</span>

                                        <input
                                            type={field.type}
                                            value={form[field.key]}
                                            placeholder={field.placeholder}
                                            onFocus={() => setFocused(field.key)}
                                            onBlur={() => setFocused(null)}
                                            onChange={(e) =>
                                                handleChange(field.key, e.target.value)
                                            }
                                            style={styles.input}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Gender */}
                            <div style={styles.fieldWrapper}>
                                <label style={styles.label}>Gender</label>

                                <div
                                    style={{
                                        ...styles.inputContainer,
                                        borderColor:
                                            focused === "gender"
                                                ? "#2563eb"
                                                : "#e5e7eb",
                                    }}
                                >
                                    <span style={styles.icon}>⚧️</span>

                                    <select
                                        value={form.gender}
                                        onFocus={() => setFocused("gender")}
                                        onBlur={() => setFocused(null)}
                                        onChange={(e) =>
                                            handleChange("gender", e.target.value)
                                        }
                                        style={styles.select}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Bio */}
                            <div
                                style={{
                                    ...styles.fieldWrapper,
                                    gridColumn: "1 / -1",
                                }}
                            >
                                <label style={styles.label}>Bio</label>

                                <div
                                    style={{
                                        ...styles.textareaContainer,
                                        borderColor:
                                            focused === "bio"
                                                ? "#2563eb"
                                                : "#e5e7eb",
                                        boxShadow:
                                            focused === "bio"
                                                ? "0 0 0 4px rgba(37,99,235,0.10)"
                                                : "0 4px 14px rgba(15,23,42,0.05)",
                                    }}
                                >
                  <textarea
                      rows={4}
                      value={form.bio}
                      placeholder="Tell us about yourself..."
                      onFocus={() => setFocused("bio")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                          handleChange("bio", e.target.value)
                      }
                      style={styles.textarea}
                  />
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div style={styles.footer}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    ...styles.submitButton,
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? "not-allowed" : "pointer",
                                }}
                            >
                                {loading ? (
                                    <>
                                        <span style={styles.loader} />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <span>🚀</span>
                                        Update Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "28px 16px",
        fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    glowOne: {
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: "50%",
        background: "rgba(59,130,246,0.12)",
        filter: "blur(70px)",
        top: -100,
        left: -80,
        animation: "float 7s ease-in-out infinite",
    },

    glowTwo: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: "50%",
        background: "rgba(99,102,241,0.10)",
        filter: "blur(70px)",
        bottom: -90,
        right: -70,
        animation: "float 9s ease-in-out infinite",
    },

    container: {
        maxWidth: 760,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
    },

    hero: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 18,
        marginBottom: 18,
        flexWrap: "wrap",
    },

    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,255,255,0.8)",
        border: "1px solid #e5e7eb",
        color: "#475569",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        marginBottom: 14,
        backdropFilter: "blur(8px)",
    },

    title: {
        fontSize: 32,
        lineHeight: 1.05,
        fontWeight: 800,
        color: "#0f172a",
        margin: 0,
        letterSpacing: "-1px",
    },

    subtitle: {
        color: "#64748b",
        marginTop: 10,
        fontSize: 14,
        maxWidth: 480,
        lineHeight: 1.6,
    },

    progressCard: {
        minWidth: 190,
        background: "rgba(255,255,255,0.78)",
        border: "1px solid #e5e7eb",
        backdropFilter: "blur(12px)",
        padding: 14,
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
    },

    progressHeader: {
        display: "flex",
        justifyContent: "space-between",
        color: "#334155",
        marginBottom: 10,
        fontSize: 12,
    },

    progressBar: {
        width: "100%",
        height: 8,
        background: "#e2e8f0",
        borderRadius: 999,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 999,
        background:
            "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
        transition: "width 400ms ease",
    },

    card: {
        position: "relative",
        background: "rgba(255,255,255,0.84)",
        border: "1px solid #e5e7eb",
        borderRadius: 24,
        padding: 22,
        backdropFilter: "blur(18px)",
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        overflow: "hidden",
    },

    cardGlow: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(135deg, rgba(59,130,246,0.03), transparent 40%, rgba(99,102,241,0.03))",
        pointerEvents: "none",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 14,
        position: "relative",
        zIndex: 2,
    },

    fieldWrapper: {
        display: "flex",
        flexDirection: "column",
    },

    label: {
        color: "#334155",
        marginBottom: 8,
        fontSize: 12,
        fontWeight: 600,
    },

    inputContainer: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: "0 12px",
        transition: "all 180ms ease",
        minHeight: 48,
    },

    textareaContainer: {
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 12,
        transition: "all 180ms ease",
    },

    icon: {
        fontSize: 15,
        opacity: 0.85,
    },

    input: {
        flex: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        color: "#0f172a",
        fontSize: 13,
        padding: "14px 0",
    },

    select: {
        flex: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        color: "#0f172a",
        fontSize: 13,
        padding: "14px 0",
        appearance: "none",
    },

    textarea: {
        width: "100%",
        border: "none",
        outline: "none",
        background: "transparent",
        color: "#0f172a",
        fontSize: 13,
        resize: "vertical",
        lineHeight: 1.6,
    },

    footer: {
        marginTop: 22,
        display: "flex",
        justifyContent: "flex-end",
        position: "relative",
        zIndex: 2,
    },

    submitButton: {
        border: "none",
        background:
            "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
        color: "white",
        padding: "12px 18px",
        borderRadius: 14,
        fontWeight: 700,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 180ms ease",
        boxShadow: "0 12px 24px rgba(37,99,235,0.20)",
    },

    loader: {
        width: 14,
        height: 14,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "2px solid white",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
};

const styleSheet = document.createElement("style");

styleSheet.innerText = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(14px); }
    100% { transform: translateY(0px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  input::placeholder,
  textarea::placeholder {
    color: #94a3b8;
  }

  select option {
    background: white;
    color: #0f172a;
  }

  * {
    box-sizing: border-box;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 28px !important;
    }
  }
`;

if (!document.getElementById("edit-profile-styles")) {
    styleSheet.id = "edit-profile-styles";
    document.head.appendChild(styleSheet);
}