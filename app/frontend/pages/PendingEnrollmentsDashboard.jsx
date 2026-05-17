import React, { useMemo } from "react";
import { motion } from "framer-motion";

const PendingEnrollmentsDashboard = ({
                                         data,
                                     }) => {
    const {
        enrollments = [],
        count = 0,
        empty = false,
        pagy = "",
    } = data || {};

    const stats = useMemo(() => {
        return {
            total: count,
        };
    }, [count]);

    return (
        <div
            style={{
                maxWidth: "1180px",
                margin: "28px auto",
                padding: "0 18px",
                fontFamily:
                    "Inter, system-ui, sans-serif",
            }}
        >
            {/* HERO */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                }}
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "26px",
                    padding: "28px",
                    background: `
            radial-gradient(circle at top right, rgba(16,185,129,0.14), transparent 32%),
            radial-gradient(circle at bottom left, rgba(59,130,246,0.12), transparent 35%),
            linear-gradient(135deg, #ffffff, #f8fafc)
          `,
                    border:
                        "1px solid rgba(255,255,255,0.9)",
                    boxShadow:
                        "0 10px 32px rgba(15,23,42,0.06)",
                    marginBottom: "28px",
                }}
            >
                {/* FLOATING GLOW */}
                <motion.div
                    animate={{
                        x: [0, 12, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 7,
                    }}
                    style={{
                        position: "absolute",
                        top: "-60px",
                        right: "-60px",
                        width: "180px",
                        height: "180px",
                        borderRadius: "999px",
                        background:
                            "radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "flex-start",
                        gap: "18px",
                        flexWrap: "wrap",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <div>
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                            }}
                            style={{
                                display:
                                    "inline-flex",
                                alignItems:
                                    "center",
                                gap: "8px",
                                padding:
                                    "6px 12px",
                                borderRadius:
                                    "999px",
                                background:
                                    "rgba(16,185,129,0.08)",
                                color: "#059669",
                                fontSize: "11px",
                                fontWeight: 800,
                                marginBottom:
                                    "14px",
                                letterSpacing:
                                    "0.5px",
                            }}
                        >
                            📚 ENROLLMENT CONTROL
                        </motion.div>

                        <h1
                            style={{
                                fontSize:
                                    "34px",
                                lineHeight: 1.05,
                                fontWeight: 900,
                                color: "#0f172a",
                                margin: 0,
                                letterSpacing:
                                    "-1.4px",
                            }}
                        >
                            Pending Enrollments
                        </h1>

                        <p
                            style={{
                                marginTop:
                                    "12px",
                                fontSize:
                                    "14px",
                                color: "#64748b",
                                maxWidth:
                                    "620px",
                                lineHeight: 1.7,
                            }}
                        >
                            Review student
                            enrollment
                            requests,
                            approve eligible
                            candidates,
                            and manage course
                            access in real
                            time.
                        </p>
                    </div>

                    {/* STATS */}
                    <motion.div
                        whileHover={{
                            scale: 1.03,
                        }}
                        style={{
                            minWidth: "200px",
                            background:
                                "rgba(255,255,255,0.72)",
                            backdropFilter:
                                "blur(14px)",
                            border:
                                "1px solid rgba(255,255,255,0.9)",
                            borderRadius:
                                "22px",
                            padding: "18px",
                            boxShadow:
                                "0 8px 24px rgba(15,23,42,0.05)",
                        }}
                    >
                        <div
                            style={{
                                fontSize:
                                    "11px",
                                color: "#94a3b8",
                                fontWeight: 800,
                                textTransform:
                                    "uppercase",
                                letterSpacing:
                                    "0.6px",
                                marginBottom:
                                    "8px",
                            }}
                        >
                            Pending Requests
                        </div>

                        <div
                            style={{
                                fontSize:
                                    "30px",
                                fontWeight: 900,
                                color: "#0f172a",
                                lineHeight: 1,
                            }}
                        >
                            {stats.total}
                        </div>

                        <div
                            style={{
                                marginTop:
                                    "12px",
                                display:
                                    "inline-flex",
                                alignItems:
                                    "center",
                                gap: "6px",
                                padding:
                                    "6px 11px",
                                borderRadius:
                                    "999px",
                                background:
                                    "#ecfdf5",
                                color: "#047857",
                                fontSize:
                                    "11px",
                                fontWeight: 800,
                            }}
                        >
                            ● Awaiting Review
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(310px, 1fr))",
                    gap: "18px",
                }}
            >
                {enrollments.map(
                    (e, index) => (
                        <motion.div
                            key={e.id}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay:
                                    index *
                                    0.05,
                            }}
                            whileHover={{
                                y: -5,
                                scale: 1.01,
                            }}
                            style={{
                                position:
                                    "relative",
                                overflow:
                                    "hidden",
                                borderRadius:
                                    "24px",
                                padding:
                                    "20px",
                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.96))",
                                border:
                                    "1px solid #e2e8f0",
                                boxShadow:
                                    "0 8px 24px rgba(15,23,42,0.05)",
                            }}
                        >
                            {/* GLOW */}
                            <motion.div
                                animate={{
                                    scale: [
                                        1,
                                        1.1,
                                        1,
                                    ],
                                }}
                                transition={{
                                    repeat:
                                    Infinity,
                                    duration: 5,
                                }}
                                style={{
                                    position:
                                        "absolute",
                                    top: "-80px",
                                    right:
                                        "-80px",
                                    width:
                                        "180px",
                                    height:
                                        "180px",
                                    background:
                                        "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)",
                                    pointerEvents:
                                        "none",
                                }}
                            />

                            {/* HEADER */}
                            <div
                                style={{
                                    display:
                                        "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "flex-start",
                                    gap: "14px",
                                    position:
                                        "relative",
                                    zIndex: 2,
                                }}
                            >
                                <div>
                                    {/* AVATAR */}
                                    <motion.div
                                        whileHover={{
                                            rotate:
                                                -6,
                                            scale:
                                                1.05,
                                        }}
                                        style={{
                                            width:
                                                "50px",
                                            height:
                                                "50px",
                                            borderRadius:
                                                "16px",
                                            background:
                                                "linear-gradient(135deg, #10b981, #22c55e)",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            color:
                                                "white",
                                            fontSize:
                                                "18px",
                                            fontWeight: 900,
                                            marginBottom:
                                                "14px",
                                            boxShadow:
                                                "0 10px 20px rgba(16,185,129,0.22)",
                                        }}
                                    >
                                        {
                                            e.initial
                                        }
                                    </motion.div>

                                    {/* EMAIL */}
                                    <div
                                        style={{
                                            fontSize:
                                                "15px",
                                            fontWeight: 800,
                                            color:
                                                "#0f172a",
                                            lineHeight: 1.45,
                                            wordBreak:
                                                "break-word",
                                        }}
                                    >
                                        {
                                            e.email
                                        }
                                    </div>

                                    {/* COURSE */}
                                    <motion.div
                                        whileHover={{
                                            x: 4,
                                        }}
                                        style={{
                                            marginTop:
                                                "12px",
                                            display:
                                                "inline-flex",
                                            alignItems:
                                                "center",
                                            gap: "8px",
                                            padding:
                                                "7px 12px",
                                            borderRadius:
                                                "999px",
                                            background:
                                                "#f8fafc",
                                            border:
                                                "1px solid #e2e8f0",
                                            color:
                                                "#334155",
                                            fontSize:
                                                "12px",
                                            fontWeight: 800,
                                        }}
                                    >
                                        📘{" "}
                                        {
                                            e.course_title
                                        }
                                    </motion.div>
                                </div>

                                {/* STATUS */}
                                <motion.div
                                    whileHover={{
                                        scale:
                                            1.05,
                                    }}
                                    style={{
                                        padding:
                                            "7px 12px",
                                        borderRadius:
                                            "999px",
                                        background:
                                            "#fef3c7",
                                        color:
                                            "#92400e",
                                        fontSize:
                                            "11px",
                                        fontWeight: 900,
                                        textTransform:
                                            "uppercase",
                                        letterSpacing:
                                            "0.5px",
                                        whiteSpace:
                                            "nowrap",
                                    }}
                                >
                                    {
                                        e.status
                                    }
                                </motion.div>
                            </div>

                            {/* DIVIDER */}
                            <div
                                style={{
                                    height:
                                        "1px",
                                    background:
                                        "linear-gradient(to right, transparent, #e2e8f0, transparent)",
                                    margin:
                                        "18px 0",
                                }}
                            />

                            {/* ACTIONS */}
                            <div
                                style={{
                                    display:
                                        "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "10px",
                                    position:
                                        "relative",
                                    zIndex: 2,
                                }}
                            >
                                <motion.form
                                    action={
                                        e.approve_path
                                    }
                                    method="post"
                                    whileHover={{
                                        scale:
                                            1.02,
                                    }}
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="patch"
                                    />

                                    <button
                                        type="submit"
                                        style={{
                                            width:
                                                "100%",
                                            padding:
                                                "11px",
                                            border:
                                                "none",
                                            borderRadius:
                                                "13px",
                                            background:
                                                "linear-gradient(135deg, #10b981, #22c55e)",
                                            color:
                                                "white",
                                            fontSize:
                                                "13px",
                                            fontWeight: 800,
                                            cursor:
                                                "pointer",
                                            boxShadow:
                                                "0 10px 18px rgba(16,185,129,0.18)",
                                        }}
                                    >
                                        Approve
                                    </button>
                                </motion.form>

                                <motion.form
                                    action={
                                        e.reject_path
                                    }
                                    method="post"
                                    whileHover={{
                                        scale:
                                            1.02,
                                    }}
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="patch"
                                    />

                                    <button
                                        type="submit"
                                        style={{
                                            width:
                                                "100%",
                                            padding:
                                                "11px",
                                            border:
                                                "none",
                                            borderRadius:
                                                "13px",
                                            background:
                                                "linear-gradient(135deg, #ef4444, #dc2626)",
                                            color:
                                                "white",
                                            fontSize:
                                                "13px",
                                            fontWeight: 800,
                                            cursor:
                                                "pointer",
                                            boxShadow:
                                                "0 10px 18px rgba(239,68,68,0.18)",
                                        }}
                                    >
                                        Reject
                                    </button>
                                </motion.form>
                            </div>
                        </motion.div>
                    )
                )}
            </div>

            {/* EMPTY */}
            {empty && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    style={{
                        marginTop: "18px",
                        textAlign:
                            "center",
                        padding:
                            "56px 24px",
                        borderRadius:
                            "28px",
                        border:
                            "1px dashed #dbe4ee",
                        background:
                            "#ffffff",
                    }}
                >
                    <motion.div
                        animate={{
                            y: [
                                0,
                                -6,
                                0,
                            ],
                        }}
                        transition={{
                            repeat:
                            Infinity,
                            duration: 3,
                        }}
                        style={{
                            width: "72px",
                            height: "72px",
                            margin:
                                "0 auto 18px",
                            borderRadius:
                                "22px",
                            background:
                                "linear-gradient(135deg, #10b981, #34d399)",
                            display:
                                "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            fontSize:
                                "30px",
                            color:
                                "white",
                        }}
                    >
                        ✓
                    </motion.div>

                    <h2
                        style={{
                            fontSize:
                                "22px",
                            fontWeight: 900,
                            color: "#0f172a",
                            marginBottom:
                                "10px",
                        }}
                    >
                        All caught up
                    </h2>

                    <p
                        style={{
                            color: "#64748b",
                            fontSize:
                                "14px",
                            maxWidth:
                                "480px",
                            margin:
                                "0 auto",
                            lineHeight: 1.7,
                        }}
                    >
                        There are
                        currently no
                        pending enrollment
                        requests waiting
                        for approval.
                    </p>
                </motion.div>
            )}

            {/* PAGINATION */}
            <div
                style={{
                    marginTop: "34px",
                    display: "flex",
                    justifyContent:
                        "center",
                }}
                dangerouslySetInnerHTML={{
                    __html: pagy,
                }}
            />
        </div>
    );
};

export default PendingEnrollmentsDashboard;