import React, { useMemo, useState } from "react";

const roleColors = {
    student: "#3b82f6",
    teacher: "#22c55e",
    admin: "#f59e0b",
    super_admin: "#a855f7",
};

const roleLabels = {
    student: "Student",
    teacher: "Teacher",
    admin: "Admin",
    super_admin: "Super Admin",
};

export default function UserManagementDashboard({ data }) {
    const {
        users = [],
        pagination = {
            current_page: 1,
            total_pages: 1,
            total_count: 0,
        },
        currentUser = {},
        roles = [],
        csrfToken,
    } = data;

    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [loadingUserId, setLoadingUserId] = useState(null);

    const injectStyles = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.08);
                opacity: 0.7;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .user-card {
            animation: fadeIn 0.45s ease forwards;
        }

        .user-card:hover {
            transform: translateY(-6px);
            border-color: #3b82f6 !important;
            box-shadow: 0 18px 35px -18px rgba(15,23,42,0.18) !important;
        }

        .btn-hover:hover {
            transform: scale(1.02);
            filter: brightness(1.05);
        }

        .input-focus:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 4px rgba(59,130,246,0.12) !important;
            width: 260px !important;
        }
    `;

    // FULL CLIENT SIDE FILTERING
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch = user.email
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesRole =
                selectedRole === "all"
                    ? true
                    : user.role === selectedRole;

            return matchesSearch && matchesRole;
        });
    }, [users, search, selectedRole]);

    const handlePageChange = (page) => {
        const url = new URL(window.location.href);

        url.searchParams.set("page", page);
        url.searchParams.set("per_page", "12");

        window.location.href = url.toString();
    };

    const approveUser = async (user) => {
        try {
            setLoadingUserId(user.id);

            const response = await fetch(
                `/admin/users/${user.id}/approve`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        "X-CSRF-Token": csrfToken,
                        Accept: "application/json",
                    },
                }
            );

            if (response.ok) {
                window.location.reload();
            } else {
                alert("Failed to approve user.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoadingUserId(null);
        }
    };

    const updateRole = async (
        user,
        newRole
    ) => {
        try {
            setLoadingUserId(user.id);

            const response = await fetch(
                `/admin/users/${user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        "X-CSRF-Token": csrfToken,
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            role: newRole,
                        },
                    }),
                }
            );

            if (response.ok) {
                window.location.reload();
            } else {
                alert("Failed to update role.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoadingUserId(null);
        }
    };

    return (
        <div
            style={{
                maxWidth: "1280px",
                margin: "40px auto",
                padding: "0 24px 80px",
                fontFamily:
                    "'Inter', system-ui, sans-serif",
                color: "#1e293b",
                background: "#f8fafc",
            }}
        >
            <style>{injectStyles}</style>

            {/* HERO */}
            <header
                style={{
                    marginBottom: 42,
                    animation:
                        "fadeIn 0.45s ease",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "7px 14px",
                        borderRadius: 999,
                        background: "#dbeafe",
                        color: "#1d4ed8",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 18,
                    }}
                >
                    🛡️ Admin Console
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "flex-end",
                        flexWrap: "wrap",
                        gap: 24,
                    }}
                >
                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: 40,
                                fontWeight: 900,
                                letterSpacing:
                                    "-0.05em",
                                color: "#0f172a",
                            }}
                        >
                            User Directory
                        </h1>

                        <p
                            style={{
                                marginTop: 10,
                                color: "#64748b",
                                fontSize: 16,
                                maxWidth: 650,
                                lineHeight: 1.6,
                            }}
                        >
                            Search, filter and
                            manage users across
                            the platform.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            flexWrap: "wrap",
                        }}
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="input-focus"
                            placeholder="Search users..."
                            style={{
                                width: 220,
                                padding:
                                    "12px 18px",
                                borderRadius: 14,
                                border:
                                    "1px solid #e2e8f0",
                                background:
                                    "white",
                                fontSize: 14,
                                outline: "none",
                                transition:
                                    "all 0.3s ease",
                            }}
                        />

                        {/* FIXED FILTER */}
                        <select
                            value={selectedRole}
                            onChange={(e) =>
                                setSelectedRole(
                                    e.target.value
                                )
                            }
                            style={{
                                padding:
                                    "12px 18px",
                                borderRadius: 14,
                                border:
                                    "1px solid #e2e8f0",
                                background:
                                    "white",
                                fontWeight: 700,
                                fontSize: 14,
                                outline: "none",
                                cursor: "pointer",
                            }}
                        >
                            <option value="all">
                                All Roles
                            </option>

                            {roles.map((role) => (
                                <option
                                    key={role}
                                    value={role}
                                >
                                    {
                                        roleLabels[
                                            role
                                            ]
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            {/* ONLY TOTAL USER COUNT */}
            <div
                style={{
                    marginBottom: 48,
                }}
            >
                <div
                    style={{
                        background: "white",
                        border:
                            "1px solid #e2e8f0",
                        borderRadius: 24,
                        padding: 28,
                        boxShadow:
                            "0 12px 24px -18px rgba(15,23,42,0.15)",
                        maxWidth: 320,
                    }}
                >
                    <div
                        style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#94a3b8",
                            textTransform:
                                "uppercase",
                            letterSpacing:
                                "0.08em",
                        }}
                    >
                        Total Users
                    </div>

                    <div
                        style={{
                            marginTop: 12,
                            display: "flex",
                            alignItems:
                                "center",
                            gap: 12,
                            color: "#3b82f6",
                            fontWeight: 900,
                            fontSize: 38,
                        }}
                    >
                        {pagination.total_count ||
                            users.length}

                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius:
                                    "50%",
                                background:
                                    "#3b82f6",
                                animation:
                                    "pulse 2s infinite",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* USER GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 24,
                }}
            >
                {filteredUsers.map(
                    (user, idx) => (
                        <div
                            key={user.id}
                            className="user-card"
                            style={{
                                background:
                                    "white",
                                borderRadius: 24,
                                padding: 28,
                                border:
                                    "1px solid #e2e8f0",
                                transition:
                                    "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                                animationDelay: `${idx * 0.05}s`,
                                opacity: 0,
                            }}
                        >
                            <div
                                style={{
                                    display:
                                        "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 18,
                                        background: `linear-gradient(135deg, ${roleColors[user.role]} 0%, #0f172a 140%)`,
                                        color: "white",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",
                                        fontSize: 20,
                                        fontWeight: 900,
                                        boxShadow: `0 12px 24px -10px ${roleColors[user.role]}90`,
                                    }}
                                >
                                    {user.email
                                        .charAt(
                                            0
                                        )
                                        .toUpperCase()}
                                </div>

                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        padding:
                                            "6px 12px",
                                        borderRadius: 999,
                                        background:
                                            user.approved
                                                ? "#dcfce7"
                                                : "#fee2e2",
                                        color:
                                            user.approved
                                                ? "#15803d"
                                                : "#b91c1c",
                                        letterSpacing:
                                            "0.04em",
                                    }}
                                >
                                    {user.approved
                                        ? "✓ VERIFIED"
                                        : "⚠ PENDING"}
                                </span>
                            </div>

                            <div
                                style={{
                                    marginTop: 22,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 800,
                                        color:
                                            "#0f172a",
                                        wordBreak:
                                            "break-all",
                                    }}
                                >
                                    {
                                        user.email
                                    }
                                </div>

                                <div
                                    style={{
                                        marginTop: 7,
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 8,
                                        color:
                                            "#64748b",
                                        fontWeight: 600,
                                        fontSize: 14,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius:
                                                "50%",
                                            background:
                                                roleColors[
                                                    user
                                                        .role
                                                    ],
                                        }}
                                    />

                                    {
                                        roleLabels[
                                            user
                                                .role
                                            ]
                                    }
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: 28,
                                    paddingTop: 20,
                                    borderTop:
                                        "1px solid #f1f5f9",
                                }}
                            >
                                {user.role ===
                                    "student" &&
                                    !user.approved && (
                                        <button
                                            onClick={() =>
                                                approveUser(
                                                    user
                                                )
                                            }
                                            disabled={
                                                loadingUserId ===
                                                user.id
                                            }
                                            className="btn-hover"
                                            style={{
                                                width: "100%",
                                                padding:
                                                    "12px",
                                                borderRadius: 14,
                                                border:
                                                    "none",
                                                background:
                                                    "#0f172a",
                                                color: "white",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                marginBottom: 16,
                                                opacity:
                                                    loadingUserId ===
                                                    user.id
                                                        ? 0.7
                                                        : 1,
                                            }}
                                        >
                                            {loadingUserId ===
                                            user.id
                                                ? "Processing..."
                                                : "Approve Membership"}
                                        </button>
                                    )}

                                {currentUser.super_admin && (
                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            gap: 8,
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color:
                                                    "#94a3b8",
                                                textTransform:
                                                    "uppercase",
                                                letterSpacing:
                                                    "0.05em",
                                            }}
                                        >
                                            Modify
                                            Access
                                            Level
                                        </label>

                                        <select
                                            defaultValue={
                                                user.role
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                updateRole(
                                                    user,
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            style={{
                                                width: "100%",
                                                padding:
                                                    "11px 12px",
                                                borderRadius: 12,
                                                border:
                                                    "1px solid #e2e8f0",
                                                background:
                                                    "#f8fafc",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                            }}
                                        >
                                            {roles.map(
                                                (
                                                    role
                                                ) => (
                                                    <option
                                                        key={
                                                            role
                                                        }
                                                        value={
                                                            role
                                                        }
                                                    >
                                                        {
                                                            roleLabels[
                                                                role
                                                                ]
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* PAGINATION */}
            {pagination.total_pages >
                1 && (
                    <div
                        style={{
                            marginTop: 64,
                            display: "flex",
                            justifyContent:
                                "center",
                            alignItems:
                                "center",
                            gap: 12,
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            disabled={
                                pagination.current_page ===
                                1
                            }
                            onClick={() =>
                                handlePageChange(
                                    pagination.current_page -
                                    1
                                )
                            }
                            style={paginationBtnStyle(
                                false,
                                pagination.current_page ===
                                1
                            )}
                        >
                            ← Previous
                        </button>

                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                background:
                                    "#f1f5f9",
                                padding: 6,
                                borderRadius: 14,
                                flexWrap: "wrap",
                            }}
                        >
                            {[...Array(
                                pagination.total_pages
                            )].map(
                                (_, i) => {
                                    const pageNum =
                                        i + 1;

                                    const isActive =
                                        pagination.current_page ===
                                        pageNum;

                                    return (
                                        <button
                                            key={
                                                pageNum
                                            }
                                            onClick={() =>
                                                handlePageChange(
                                                    pageNum
                                                )
                                            }
                                            style={paginationBtnStyle(
                                                isActive
                                            )}
                                        >
                                            {
                                                pageNum
                                            }
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <button
                            disabled={
                                pagination.current_page ===
                                pagination.total_pages
                            }
                            onClick={() =>
                                handlePageChange(
                                    pagination.current_page +
                                    1
                                )
                            }
                            style={paginationBtnStyle(
                                false,
                                pagination.current_page ===
                                pagination.total_pages
                            )}
                        >
                            Next →
                        </button>
                    </div>
                )}
        </div>
    );
}

const paginationBtnStyle = (
    isActive,
    isDisabled
) => ({
    padding: "10px 18px",
    borderRadius: 12,
    border: "none",
    background: isActive
        ? "#3b82f6"
        : "white",
    color: isActive
        ? "white"
        : isDisabled
            ? "#cbd5e1"
            : "#475569",
    fontSize: 14,
    fontWeight: 800,
    cursor: isDisabled
        ? "not-allowed"
        : "pointer",
    transition: "all 0.2s ease",
    boxShadow: isActive
        ? "0 10px 18px -10px rgba(59,130,246,0.5)"
        : "0 2px 6px rgba(15,23,42,0.05)",
});