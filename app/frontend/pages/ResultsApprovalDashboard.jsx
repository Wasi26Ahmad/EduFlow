import React, { useMemo, useState } from "react";

// --------------------------------------------------
// CSRF TOKEN
// --------------------------------------------------

const csrfToken =
    document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content") || "";

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const glassCard = {
    background: "rgba(255, 255, 255, 0.82)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(226, 232, 240, 0.9)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
};

const secondaryButton = {
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "700",
    textDecoration: "none",
    color: "#475569",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    textAlign: "center",
    transition: "all 0.2s ease",
    cursor: "pointer",
};

const approveButton = {
    ...secondaryButton,
    background: "#ecfdf5",
    color: "#059669",
    border: "1px solid #d1fae5",
    width: "100%",
};

const rejectButton = {
    ...secondaryButton,
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fee2e2",
    width: "100%",
};

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

async function patchRequest(url) {
    return fetch(url, {
        method: "PATCH",
        credentials: "same-origin",

        headers: {
            "X-CSRF-Token": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
        },
    });
}

async function deleteRequest(url) {
    return fetch(url, {
        method: "DELETE",
        credentials: "same-origin",

        headers: {
            "X-CSRF-Token": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
        },
    });
}

// --------------------------------------------------
// COMPONENTS
// --------------------------------------------------

const HeroStat = ({ title, value }) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <span
            style={{
                fontSize: "11px",
                fontWeight: "800",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: ".5px",
            }}
        >
            {title}
        </span>

        <span
            style={{
                fontSize: "32px",
                fontWeight: "900",
                color: "#0f172a",
                marginTop: 4,
                lineHeight: 1,
            }}
        >
            {value}
        </span>
    </div>
);

const StatusBadge = ({ text, bg, color }) => (
    <span
        style={{
            padding: "6px 10px",
            borderRadius: 999,
            background: bg,
            color,
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: ".4px",
        }}
    >
        {text}
    </span>
);

const InfoCard = ({ label, value }) => (
    <div
        style={{
            padding: 14,
            background: "#f8fafc",
            borderRadius: 14,
            border: "1px solid #f1f5f9",
        }}
    >
        <div
            style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: ".4px",
            }}
        >
            {label}
        </div>

        <div
            style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#334155",
                marginTop: 5,
                lineHeight: 1.5,
            }}
        >
            {value}
        </div>
    </div>
);

const EmptyState = ({ message }) => (
    <div
        style={{
            gridColumn: "1 / -1",
            padding: "90px 20px",
            textAlign: "center",
            borderRadius: 28,
            background: "rgba(255,255,255,0.55)",
            border: "2px dashed #cbd5e1",
        }}
    >
        <div
            style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 22px",
                fontSize: 36,
            }}
        >
            ✅
        </div>

        <div
            style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#0f172a",
            }}
        >
            Everything is reviewed
        </div>

        <div
            style={{
                marginTop: 10,
                color: "#64748b",
                fontSize: 15,
            }}
        >
            {message}
        </div>
    </div>
);

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function ResultsApprovalDashboard({
                                                     uploads = [],
                                                     results = [],
                                                 }) {
    const [tab, setTab] = useState("all");

    const [hovered, setHovered] = useState(null);

    const [localUploads, setLocalUploads] =
        useState(uploads);

    const [localResults, setLocalResults] =
        useState(results);

    const [loadingId, setLoadingId] =
        useState(null);

    // --------------------------------------------------
    // FILTERING
    // --------------------------------------------------

    const filteredUploads = useMemo(() => {
        if (tab === "results") return [];
        return localUploads;
    }, [tab, localUploads]);

    const filteredResults = useMemo(() => {
        if (tab === "uploads") return [];
        return localResults;
    }, [tab, localResults]);

    const isEmpty =
        filteredUploads.length === 0 &&
        filteredResults.length === 0;

    // --------------------------------------------------
    // RESULT ACTIONS
    // --------------------------------------------------

    const approveResult = async (result) => {
        try {
            setLoadingId(`approve-result-${result.id}`);

            const response = await patchRequest(
                result.approve_path
            );

            if (!response.ok) {
                throw new Error(
                    `Approve failed (${response.status})`
                );
            }

            setLocalResults((prev) =>
                prev.filter((r) => r.id !== result.id)
            );
        } catch (error) {
            console.error(error);
            alert(
                "Failed to approve result."
            );
        } finally {
            setLoadingId(null);
        }
    };

    const rejectResult = async (result) => {
        try {
            setLoadingId(`reject-result-${result.id}`);

            const response = await deleteRequest(
                result.reject_path
            );

            if (!response.ok) {
                throw new Error(
                    `Reject failed (${response.status})`
                );
            }

            setLocalResults((prev) =>
                prev.filter((r) => r.id !== result.id)
            );
        } catch (error) {
            console.error(error);
            alert(
                "Failed to reject result."
            );
        } finally {
            setLoadingId(null);
        }
    };

    // --------------------------------------------------
    // UPLOAD ACTIONS
    // --------------------------------------------------

    const approveUpload = async (upload) => {
        try {
            setLoadingId(`approve-upload-${upload.id}`);

            const response = await patchRequest(
                upload.approve_path
            );

            if (!response.ok) {
                throw new Error(
                    `Approve upload failed (${response.status})`
                );
            }

            setLocalUploads((prev) =>
                prev.filter((u) => u.id !== upload.id)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to approve upload.");
        } finally {
            setLoadingId(null);
        }
    };

    const rejectUpload = async (upload) => {
        try {
            setLoadingId(`reject-upload-${upload.id}`);

            const response = await deleteRequest(
                upload.reject_path
            );

            if (!response.ok) {
                throw new Error(
                    `Reject upload failed (${response.status})`
                );
            }

            setLocalUploads((prev) =>
                prev.filter((u) => u.id !== upload.id)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to reject upload.");
        } finally {
            setLoadingId(null);
        }
    };

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    return (
        <div
            style={{
                maxWidth: 1240,
                margin: "24px auto",
                padding: "0 20px 70px",
                fontFamily:
                    "'Inter', system-ui, sans-serif",
            }}
        >
            <style>
                {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-in {
            animation: slideUp .45s ease forwards;
          }

          button {
            transition: all .2s ease;
            border: none;
            cursor: pointer;
          }

          button:hover {
            transform: translateY(-2px);
          }

          button:disabled {
            opacity: .6;
            cursor: not-allowed;
            transform: none;
          }

          body {
            background: #f8fafc;
          }
        `}
            </style>

            {/* HERO */}

            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 34,
                    padding: "36px 40px",
                    marginBottom: 30,
                    background:
                        "linear-gradient(135deg, #ffffff 0%, #f1f5ff 45%, #bfdbfe 100%)",
                    color: "#0f172a",
                    boxShadow:
                        "0 28px 60px rgba(37,99,235,0.12)",
                    border:
                        "1px solid rgba(148,163,184,0.12)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: 260,
                        height: 260,
                        borderRadius: "50%",
                        background:
                            "rgba(191,219,254,0.55)",
                        top: -90,
                        right: -70,
                        filter: "blur(10px)",
                    }}
                />

                <div style={{ position: "relative", zIndex: 2 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 14px",
                            borderRadius: 999,
                            background:
                                "rgba(255,255,255,0.72)",
                            border:
                                "1px solid rgba(148,163,184,0.22)",
                            color: "#334155",
                            backdropFilter: "blur(10px)",
                            fontSize: 12,
                            fontWeight: 800,
                            letterSpacing: ".4px",
                            textTransform: "uppercase",
                        }}
                    >
                        ⚡ Admin Moderation Panel
                    </div>

                    <h1
                        style={{
                            marginTop: 18,
                            fontSize: 42,
                            fontWeight: 900,
                            letterSpacing: "-1.4px",
                            marginBottom: 0,
                            color: "#0f172a",
                            lineHeight: 1.05,
                        }}
                    >
                        Pending Result Approvals
                    </h1>

                    <p
                        style={{
                            marginTop: 14,
                            color: "#475569",
                            maxWidth: 620,
                            lineHeight: 1.7,
                            fontSize: 15,
                            fontWeight: 500,
                        }}
                    >
                        Review uploaded marks and approve
                        individual student results before they
                        become visible to students.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: 42,
                            marginTop: 28,
                            flexWrap: "wrap",
                        }}
                    >
                        <HeroStat
                            title="Pending Uploads"
                            value={localUploads.length}
                        />

                        <HeroStat
                            title="Pending Results"
                            value={localResults.length}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            marginTop: 30,
                            flexWrap: "wrap",
                        }}
                    >
                        {["all", "uploads", "results"].map(
                            (t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    style={{
                                        padding:
                                            "11px 18px",
                                        borderRadius: 14,
                                        fontWeight: 800,
                                        fontSize: 13,
                                        background:
                                            tab === t
                                                ? "#2563eb"
                                                : "rgba(255,255,255,0.72)",
                                        color:
                                            tab === t
                                                ? "#ffffff"
                                                : "#334155",
                                        border:
                                            tab === t
                                                ? "1px solid #2563eb"
                                                : "1px solid rgba(148,163,184,0.22)",
                                        backdropFilter:
                                            "blur(10px)",
                                    }}
                                >
                                    {t
                                            .charAt(0)
                                            .toUpperCase() +
                                        t.slice(1)}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENT */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 22,
                }}
            >
                {isEmpty ? (
                    <EmptyState
                        message={`No pending ${tab} found.`}
                    />
                ) : (
                    <>
                        {/* UPLOADS */}

                        {filteredUploads.map((upload, i) => (
                            <div
                                key={`upload-${upload.id}`}
                                className="animate-in"
                                onMouseEnter={() =>
                                    setHovered(
                                        `upload-${upload.id}`
                                    )
                                }
                                onMouseLeave={() =>
                                    setHovered(null)
                                }
                                style={{
                                    ...glassCard,
                                    borderRadius: 28,
                                    padding: 26,
                                    transition:
                                        "all .25s ease",
                                    transform:
                                        hovered ===
                                        `upload-${upload.id}`
                                            ? "translateY(-5px)"
                                            : "none",
                                    animationDelay: `${i * 0.05}s`,
                                }}
                            >
                                <div
                                    style={{
                                        width: 48,
                                        height: 5,
                                        borderRadius: 999,
                                        background:
                                            "#f59e0b",
                                        marginBottom: 18,
                                    }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 900,
                                                fontSize: 18,
                                                color: "#0f172a",
                                            }}
                                        >
                                            {
                                                upload.course_title
                                            }
                                        </div>

                                        <div
                                            style={{
                                                marginTop: 6,
                                                fontSize: 13,
                                                color: "#64748b",
                                            }}
                                        >
                                            {
                                                upload.teacher_email
                                            }
                                        </div>
                                    </div>

                                    <StatusBadge
                                        text="Bulk Upload"
                                        bg="#fef3c7"
                                        color="#92400e"
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1fr 1fr",
                                        gap: 12,
                                        marginTop: 18,
                                    }}
                                >
                                    <InfoCard
                                        label="Uploaded"
                                        value={
                                            upload.created_at
                                        }
                                    />

                                    <InfoCard
                                        label="Status"
                                        value="Awaiting Review"
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1fr 1fr 1fr",
                                        gap: 10,
                                        marginTop: 22,
                                    }}
                                >
                                    <a
                                        href={
                                            upload.view_path
                                        }
                                        style={
                                            secondaryButton
                                        }
                                    >
                                        View
                                    </a>

                                    <button
                                        disabled={
                                            loadingId ===
                                            `approve-upload-${upload.id}`
                                        }
                                        onClick={() =>
                                            approveUpload(
                                                upload
                                            )
                                        }
                                        style={
                                            approveButton
                                        }
                                    >
                                        Approve
                                    </button>

                                    <button
                                        disabled={
                                            loadingId ===
                                            `reject-upload-${upload.id}`
                                        }
                                        onClick={() =>
                                            rejectUpload(
                                                upload
                                            )
                                        }
                                        style={
                                            rejectButton
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* RESULTS */}

                        {filteredResults.map((result, i) => (
                            <div
                                key={`result-${result.id}`}
                                className="animate-in"
                                onMouseEnter={() =>
                                    setHovered(
                                        `result-${result.id}`
                                    )
                                }
                                onMouseLeave={() =>
                                    setHovered(null)
                                }
                                style={{
                                    ...glassCard,
                                    borderRadius: 28,
                                    padding: 26,
                                    transition:
                                        "all .25s ease",
                                    transform:
                                        hovered ===
                                        `result-${result.id}`
                                            ? "translateY(-5px)"
                                            : "none",
                                    animationDelay: `${i * 0.05}s`,
                                }}
                            >
                                <div
                                    style={{
                                        width: 48,
                                        height: 5,
                                        borderRadius: 999,
                                        background:
                                            "#2563eb",
                                        marginBottom: 18,
                                    }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 900,
                                                fontSize: 16,
                                                color: "#0f172a",
                                            }}
                                        >
                                            {
                                                result.student_email
                                            }
                                        </div>

                                        <div
                                            style={{
                                                marginTop: 5,
                                                color: "#64748b",
                                                fontSize: 13,
                                            }}
                                        >
                                            {
                                                result.course_title
                                            }
                                        </div>
                                    </div>

                                    <StatusBadge
                                        text="Pending"
                                        bg="#dbeafe"
                                        color="#1d4ed8"
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 14,
                                        marginTop: 20,
                                    }}
                                >
                                    <InfoCard
                                        label="Marks"
                                        value={
                                            result.marks
                                        }
                                    />

                                    <InfoCard
                                        label="GPA"
                                        value={result.gpa}
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                        marginTop: 24,
                                    }}
                                >
                                    <button
                                        disabled={
                                            loadingId ===
                                            `approve-result-${result.id}`
                                        }
                                        onClick={() =>
                                            approveResult(
                                                result
                                            )
                                        }
                                        style={
                                            approveButton
                                        }
                                    >
                                        {loadingId ===
                                        `approve-result-${result.id}`
                                            ? "Approving..."
                                            : "Approve"}
                                    </button>

                                    <button
                                        disabled={
                                            loadingId ===
                                            `reject-result-${result.id}`
                                        }
                                        onClick={() =>
                                            rejectResult(
                                                result
                                            )
                                        }
                                        style={
                                            rejectButton
                                        }
                                    >
                                        {loadingId ===
                                        `reject-result-${result.id}`
                                            ? "Rejecting..."
                                            : "Reject"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}