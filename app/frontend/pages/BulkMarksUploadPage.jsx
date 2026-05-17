import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export default function BulkMarksUploadPage({
                                                courses = [],
                                            }) {
    const [selectedCourse, setSelectedCourse] =
        useState("");

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [dragging, setDragging] =
        useState(false);

    const fileInputRef = useRef(null);

    const fileName = useMemo(() => {
        if (!selectedFile) return null;
        return selectedFile.name;
    }, [selectedFile]);

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (file) {
            setSelectedFile(file);

            if (fileInputRef.current) {
                fileInputRef.current.files =
                    e.dataTransfer.files;
            }
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "34px 16px 50px",
                background:
                    "radial-gradient(circle at top, #dbeafe 0%, transparent 40%), radial-gradient(circle at bottom right, #cffafe 0%, transparent 45%), linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
                position: "relative",
                overflow: "hidden",
                fontFamily:
                    "Inter, system-ui, sans-serif",
            }}
        >
            {/* BACKGROUND GLOW */}
            <motion.div
                {...floatingAnimation}
                style={{
                    width: 260,
                    height: 260,
                    borderRadius: "999px",
                    background:
                        "rgba(99,102,241,0.16)",
                    filter: "blur(80px)",
                    position: "absolute",
                    top: -100,
                    left: -80,
                }}
            />

            <motion.div
                animate={{
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                }}
                style={{
                    width: 220,
                    height: 220,
                    borderRadius: "999px",
                    background:
                        "rgba(16,185,129,0.16)",
                    filter: "blur(80px)",
                    position: "absolute",
                    bottom: -40,
                    right: -40,
                }}
            />

            <div
                style={{
                    maxWidth: 860,
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* HERO */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    whileHover={{
                        y: -2,
                    }}
                    style={{
                        borderRadius: 28,
                        padding: 28,
                        marginBottom: 24,
                        background:
                            "rgba(255,255,255,0.68)",
                        backdropFilter: "blur(20px)",
                        border:
                            "1px solid rgba(255,255,255,0.6)",
                        boxShadow:
                            "0 18px 50px rgba(15,23,42,0.07)",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.05))",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            gap: 22,
                            flexWrap: "wrap",
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <motion.div
                                whileHover={{
                                    scale: 1.03,
                                }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "7px 12px",
                                    borderRadius: 999,
                                    background:
                                        "rgba(16,185,129,0.12)",
                                    color: "#059669",
                                    fontSize: 11,
                                    fontWeight: 900,
                                    letterSpacing: 0.4,
                                    marginBottom: 14,
                                }}
                            >
                                ✨ BULK EXCEL UPLOAD
                            </motion.div>

                            <h1
                                style={{
                                    fontSize:
                                        "clamp(30px, 5vw, 46px)",
                                    lineHeight: 1.05,
                                    fontWeight: 900,
                                    letterSpacing: "-1.5px",
                                    margin: 0,
                                    color: "#0f172a",
                                }}
                            >
                                Upload Excel
                                <br />
                                Marks Instantly
                            </h1>

                            <p
                                style={{
                                    marginTop: 14,
                                    maxWidth: 580,
                                    fontSize: 14,
                                    color: "#475569",
                                    lineHeight: 1.7,
                                }}
                            >
                                Upload marks for an entire
                                course with a modern approval
                                workflow and rich validation.
                            </p>
                        </div>

                        {/* SIDE CARD */}
                        <motion.div
                            whileHover={{
                                rotate: -1,
                                scale: 1.015,
                            }}
                            style={{
                                width: 240,
                                borderRadius: 22,
                                padding: 18,
                                background:
                                    "rgba(255,255,255,0.72)",
                                border:
                                    "1px solid rgba(255,255,255,0.7)",
                                boxShadow:
                                    "0 14px 30px rgba(15,23,42,0.06)",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    color: "#94a3b8",
                                    marginBottom: 14,
                                }}
                            >
                                REQUIRED FORMAT
                            </div>

                            {[
                                {
                                    emoji: "📧",
                                    title: "Column A",
                                    desc: "Student Email",
                                },
                                {
                                    emoji: "📊",
                                    title: "Column B",
                                    desc: "Marks",
                                },
                            ].map((item) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{
                                        x: 3,
                                    }}
                                    style={{
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "center",
                                        marginBottom: 12,
                                        padding: 12,
                                        borderRadius: 14,
                                        background: "#f8fafc",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 14,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent:
                                                "center",
                                            fontSize: 18,
                                            background:
                                                "linear-gradient(135deg,#dbeafe,#e0f2fe)",
                                        }}
                                    >
                                        {item.emoji}
                                    </div>

                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 800,
                                                fontSize: 13,
                                                color: "#0f172a",
                                            }}
                                        >
                                            {item.title}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#64748b",
                                                marginTop: 3,
                                            }}
                                        >
                                            {item.desc}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* FORM */}
                <motion.form
                    method="post"
                    action="/teacher/bulk_marks_uploads"
                    encType="multipart/form-data"
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.15,
                    }}
                    style={{
                        borderRadius: 28,
                        padding: 26,
                        background:
                            "rgba(255,255,255,0.68)",
                        backdropFilter: "blur(18px)",
                        border:
                            "1px solid rgba(255,255,255,0.7)",
                        boxShadow:
                            "0 16px 40px rgba(15,23,42,0.05)",
                    }}
                >
                    {/* CSRF */}
                    <input
                        type="hidden"
                        name="authenticity_token"
                        value={
                            document
                                .querySelector(
                                    'meta[name="csrf-token"]'
                                )
                                ?.getAttribute("content") ||
                            ""
                        }
                    />

                    {/* COURSE */}
                    <div
                        style={{
                            marginBottom: 22,
                        }}
                    >
                        <label
                            style={{
                                display: "block",
                                marginBottom: 10,
                                fontWeight: 800,
                                fontSize: 12,
                                color: "#334155",
                            }}
                        >
                            Select Course
                        </label>

                        <motion.select
                            whileFocus={{
                                scale: 1.005,
                            }}
                            name="bulk_marks_upload[course_id]"
                            value={selectedCourse}
                            onChange={(e) =>
                                setSelectedCourse(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding:
                                    "14px 16px",
                                borderRadius: 14,
                                border:
                                    "1px solid #dbe2ea",
                                background: "#f8fafc",
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#0f172a",
                                outline: "none",
                            }}
                        >
                            <option value="">
                                Choose a course
                            </option>

                            {courses.map((course) => (
                                <option
                                    key={course.id}
                                    value={course.id}
                                >
                                    {course.title}
                                </option>
                            ))}
                        </motion.select>
                    </div>

                    {/* FILE */}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <label
                            style={{
                                display: "block",
                                marginBottom: 10,
                                fontWeight: 800,
                                fontSize: 12,
                                color: "#334155",
                            }}
                        >
                            Upload Excel File
                        </label>

                        <motion.div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() =>
                                setDragging(false)
                            }
                            onDrop={handleDrop}
                            animate={{
                                scale: dragging
                                    ? 1.01
                                    : 1,
                                borderColor: dragging
                                    ? "#2563eb"
                                    : "#cbd5e1",
                            }}
                            style={{
                                border:
                                    "2px dashed #cbd5e1",
                                borderRadius: 22,
                                padding:
                                    "30px 18px",
                                textAlign: "center",
                                background:
                                    "linear-gradient(135deg,#f8fafc,#eff6ff)",
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: dragging
                                        ? [0, -6, 6, 0]
                                        : 0,
                                }}
                                style={{
                                    fontSize: 48,
                                    marginBottom: 12,
                                }}
                            >
                                📄
                            </motion.div>

                            <div
                                style={{
                                    fontSize: 16,
                                    fontWeight: 900,
                                    color: "#0f172a",
                                    marginBottom: 6,
                                }}
                            >
                                Drag & Drop Excel
                            </div>

                            <div
                                style={{
                                    fontSize: 13,
                                    color: "#64748b",
                                    marginBottom: 18,
                                }}
                            >
                                Supports .xlsx and .xls
                            </div>

                            <motion.label
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                style={{
                                    display:
                                        "inline-flex",
                                    alignItems:
                                        "center",
                                    gap: 8,
                                    padding:
                                        "12px 18px",
                                    borderRadius: 14,
                                    cursor: "pointer",
                                    background:
                                        "linear-gradient(135deg,#2563eb,#4f46e5)",
                                    color: "white",
                                    fontWeight: 800,
                                    fontSize: 13,
                                    boxShadow:
                                        "0 12px 24px rgba(37,99,235,0.22)",
                                }}
                            >
                                📁 Choose File

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="bulk_marks_upload[excel_file]"
                                    accept=".xlsx,.xls"
                                    onChange={(e) =>
                                        setSelectedFile(
                                            e.target
                                                .files?.[0] ||
                                            null
                                        )
                                    }
                                    style={{
                                        display: "none",
                                    }}
                                />
                            </motion.label>

                            {fileName && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    style={{
                                        marginTop: 18,
                                        padding:
                                            "10px 14px",
                                        borderRadius: 14,
                                        display:
                                            "inline-flex",
                                        alignItems:
                                            "center",
                                        gap: 8,
                                        background:
                                            "white",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#0f172a",
                                        boxShadow:
                                            "0 8px 18px rgba(15,23,42,0.05)",
                                    }}
                                >
                                    ✅ {fileName}
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* SUBMIT */}
                    <motion.button
                        whileHover={{
                            scale: 1.03,
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        type="submit"
                        style={{
                            border: "none",
                            background:
                                "linear-gradient(135deg,#2563eb,#4f46e5)",
                            color: "white",
                            padding:
                                "14px 22px",
                            borderRadius: 16,
                            fontWeight: 900,
                            fontSize: 13,
                            cursor: "pointer",
                            boxShadow:
                                "0 14px 28px rgba(37,99,235,0.22)",
                        }}
                    >
                        🚀 Upload Marks
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
}