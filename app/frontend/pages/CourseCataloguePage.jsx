import React, {
    useMemo,
    useState,
} from "react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

const currency = (value) =>
    `৳${Number(value || 0).toLocaleString()}`;

const statusColors = {
    approved: {
        bg: "#dcfce7",
        text: "#166534",
    },

    pending: {
        bg: "#fef3c7",
        text: "#92400e",
    },

    rejected: {
        bg: "#fee2e2",
        text: "#991b1b",
    },
};

function SlideToEnroll({
                           action,
                           csrfToken,
                       }) {
    const [dragX, setDragX] =
        useState(0);

    const [dragging, setDragging] =
        useState(false);

    const knobSize = 48;
    const wrapperPadding = 7;

    const submitEnrollment = () => {
        const form =
            document.createElement("form");

        form.method = "POST";
        form.action = action;

        const csrf =
            document.createElement("input");

        csrf.type = "hidden";
        csrf.name =
            "authenticity_token";

        csrf.value = csrfToken;

        form.appendChild(csrf);

        document.body.appendChild(form);

        form.submit();
    };

    const onPointerMove = (e) => {
        if (!dragging) return;

        const wrapper =
            e.currentTarget.getBoundingClientRect();

        const maxMove =
            wrapper.width -
            knobSize -
            wrapperPadding * 2;

        let next =
            e.clientX -
            wrapper.left -
            knobSize / 2 -
            wrapperPadding;

        if (next < 0) next = 0;

        if (next > maxMove) {
            next = maxMove;
        }

        setDragX(next);
    };

    const endDrag = (e) => {
        if (!dragging) return;

        setDragging(false);

        const wrapper =
            e.currentTarget.getBoundingClientRect();

        const maxMove =
            wrapper.width -
            knobSize -
            wrapperPadding * 2;

        if (dragX >= maxMove - 20) {
            setDragX(maxMove);

            setTimeout(() => {
                submitEnrollment();
            }, 150);
        } else {
            setDragX(0);
        }
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.01,
            }}

            onPointerMove={
                onPointerMove
            }
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            style={{
                position: "relative",
                width: "100%",
                height: 62,
                borderRadius: 999,
                overflow: "hidden",
                background:
                    "linear-gradient(135deg,#2563eb 0%, #1d4ed8 45%, #4f46e5 100%)",

                boxShadow:
                    "0 12px 28px rgba(37,99,235,0.22)",

                userSelect: "none",
                touchAction: "none",
            }}
        >
            <motion.div
                animate={{
                    x: [
                        "-100%",
                        "220%",
                    ],
                }}

                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                }}

                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.28), transparent)",

                    transform:
                        "skewX(-20deg)",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        "center",
                    color: "white",
                    fontWeight: 900,
                    fontSize: 13,
                    letterSpacing: 0.5,
                }}
            >
                🎓 Slide to Enroll
            </div>

            <motion.div
                animate={{
                    boxShadow: dragging
                        ? "0 18px 40px rgba(37,99,235,0.35)"
                        : "0 10px 25px rgba(0,0,0,0.14)",
                }}

                whileTap={{
                    scale: 1.08,
                }}

                onPointerDown={() =>
                    setDragging(true)
                }

                style={{
                    position: "absolute",
                    top: 7,
                    left: 7,
                    width: knobSize,
                    height: knobSize,
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        "center",
                    cursor: "grab",
                    fontWeight: 900,
                    fontSize: 20,
                    color: "#2563eb",
                    transform: `translateX(${dragX}px)`,

                    transition: dragging
                        ? "none"
                        : "transform .25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",

                    zIndex: 2,
                }}
            >
                →
            </motion.div>
        </motion.div>
    );
}

function CourseCard({
                        course,
                        currentUser,
                        csrfToken,
                    }) {
    if (!course) return null;

    const existingEnrollment =
        course.existing_enrollment;

    const [selectedCoupon, setSelectedCoupon] =
        useState(null);

    const pricing = useMemo(() => {
        let discount = 0;

        if (selectedCoupon) {
            if (
                selectedCoupon.discount_type ===
                "percentage"
            ) {
                discount =
                    (course.price *
                        selectedCoupon.discount_value) /
                    100;
            } else {
                discount =
                    selectedCoupon.discount_value;
            }
        }

        let finalPrice =
            course.price - discount;

        if (finalPrice < 0) {
            finalPrice = 0;
        }

        return {
            discount:
                Math.round(discount),

            finalPrice:
                Math.round(finalPrice),
        };
    }, [selectedCoupon, course.price]);

    const isStudent =
        currentUser?.role ===
        "student";

    const canManage = [
        "teacher",
        "admin",
        "super_admin",
    ].includes(currentUser?.role);

    const canEnroll =
        currentUser?.current_semester ===
        course.semester;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
            }}

            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}

            viewport={{
                once: true,
                amount: 0.15,
            }}

            whileHover={{
                y: -8,
                scale: 1.01,
            }}

            transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 120,
            }}

            style={{
                position: "relative",
                overflow: "hidden",
                background:
                    "rgba(255,255,255,0.9)",

                backdropFilter:
                    "blur(18px)",

                borderRadius: 26,
                padding: 20,

                border:
                    "1px solid rgba(226,232,240,0.9)",

                boxShadow:
                    "0 14px 36px rgba(15,23,42,0.06)",

                height: "fit-content",
            }}
        >
            <motion.div
                animate={{
                    x: [
                        "-120%",
                        "220%",
                    ],
                }}

                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                }}

                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40%",
                    height: "100%",
                    background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)",

                    transform:
                        "skewX(-25deg)",

                    pointerEvents:
                        "none",
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
                        display: "flex",
                        justifyContent:
                            "space-between",
                        gap: 14,
                        alignItems:
                            "flex-start",
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
                                padding:
                                    "6px 12px",
                                borderRadius:
                                    999,
                                background:
                                    "#eef2ff",
                                color:
                                    "#4338ca",
                                fontWeight: 800,
                                fontSize: 10,
                                marginBottom: 12,
                            }}
                        >
                            📘 {course.code}
                        </motion.div>

                        <h3
                            style={{
                                margin: 0,
                                fontSize: 22,
                                fontWeight: 900,
                                color:
                                    "#111827",
                                lineHeight: 1.2,
                            }}
                        >
                            {course.title}
                        </h3>

                        <div
                            style={{
                                marginTop: 12,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                            }}
                        >
                            <motion.div
                                whileHover={{
                                    y: -2,
                                }}

                                style={{
                                    padding:
                                        "7px 12px",

                                    borderRadius: 12,

                                    background:
                                        "#f8fafc",

                                    border:
                                        "1px solid #e2e8f0",

                                    fontSize: 11,
                                    fontWeight: 800,
                                }}
                            >
                                🎓 Semester{" "}
                                {course.semester}
                            </motion.div>

                            {course.teacher_name && (
                                <motion.div
                                    whileHover={{
                                        y: -2,
                                    }}

                                    style={{
                                        padding:
                                            "7px 12px",

                                        borderRadius: 12,

                                        background:
                                            "#f8fafc",

                                        border:
                                            "1px solid #e2e8f0",

                                        fontSize: 11,
                                        fontWeight: 800,
                                    }}
                                >
                                    👨‍🏫{" "}
                                    {
                                        course.teacher_name
                                    }
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <motion.div
                        animate={{
                            y: [0, -3, 0],
                        }}

                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}

                        style={{
                            minWidth: 92,
                            borderRadius: 18,
                            padding:
                                "12px 14px",
                            background:
                                "#111827",
                            color: "white",
                            textAlign:
                                "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 10,
                                opacity: 0.7,
                                marginBottom: 3,
                                fontWeight: 800,
                            }}
                        >
                            FEE
                        </div>

                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 950,
                            }}
                        >
                            {currency(
                                course.price
                            )}
                        </div>
                    </motion.div>
                </div>

                <div
                    style={{
                        height: 1,
                        background:
                            "#f1f5f9",
                        margin: "18px 0",
                    }}
                />

                {isStudent && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: 14,
                        }}
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.01,
                            }}

                            style={{
                                background:
                                    "#f8fafc",
                                borderRadius: 18,
                                padding: 16,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 800,
                                    marginBottom: 12,
                                    color:
                                        "#64748b",
                                }}
                            >
                                Enrollment
                            </div>

                            {existingEnrollment ? (
                                <motion.div
                                    initial={{
                                        scale: 0.8,
                                        opacity: 0,
                                    }}

                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}

                                    style={{
                                        display:
                                            "inline-flex",

                                        padding:
                                            "9px 16px",

                                        borderRadius:
                                            999,

                                        background:
                                            statusColors[
                                                existingEnrollment
                                                    .status
                                                ]?.bg ||
                                            "#f1f5f9",

                                        color:
                                            statusColors[
                                                existingEnrollment
                                                    .status
                                                ]?.text ||
                                            "#64748b",

                                        fontWeight: 800,
                                        fontSize: 13,
                                    }}
                                >
                                    ●{" "}
                                    {existingEnrollment.status.toUpperCase()}
                                </motion.div>
                            ) : canEnroll ? (
                                <SlideToEnroll
                                    action={`/enrollments?course_id=${course.id}`}
                                    csrfToken={
                                        csrfToken
                                    }
                                />
                            ) : (
                                <div
                                    style={{
                                        color:
                                            "#94a3b8",
                                        fontWeight: 700,
                                        fontSize: 13,
                                    }}
                                >
                                    Not available for
                                    your semester
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{
                                scale: 1.01,
                            }}

                            style={{
                                background:
                                    "#f8fafc",
                                borderRadius: 18,
                                padding: 16,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 800,
                                    marginBottom: 12,
                                    color:
                                        "#64748b",
                                }}
                            >
                                Payment
                            </div>

                            {course.payment_completed ? (
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
                                        color:
                                            "#166534",
                                        fontWeight: 800,
                                        fontSize: 14,
                                    }}
                                >
                                    ✓ Completed
                                </motion.div>
                            ) : (
                                <>
                                    {course.coupons
                                            ?.length >
                                        0 && (
                                            <div
                                                style={{
                                                    marginBottom: 14,
                                                    display:
                                                        "flex",
                                                    flexDirection:
                                                        "column",
                                                    gap: 10,
                                                }}
                                            >
                                                {course.coupons.map(
                                                    (
                                                        coupon
                                                    ) => (
                                                        <motion.div
                                                            key={
                                                                coupon.id
                                                            }

                                                            whileHover={{
                                                                scale: 1.02,
                                                                y: -2,
                                                            }}

                                                            whileTap={{
                                                                scale: 0.98,
                                                            }}

                                                            onClick={() =>
                                                                setSelectedCoupon(
                                                                    coupon
                                                                )
                                                            }

                                                            style={{
                                                                cursor:
                                                                    "pointer",

                                                                padding: 12,

                                                                borderRadius: 14,

                                                                background:
                                                                    selectedCoupon?.id ===
                                                                    coupon.id
                                                                        ? "#dbeafe"
                                                                        : "white",

                                                                border:
                                                                    selectedCoupon?.id ===
                                                                    coupon.id
                                                                        ? "1px solid #2563eb"
                                                                        : "1px solid #dbeafe",
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
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            fontWeight: 900,
                                                                            color:
                                                                                "#111827",
                                                                            fontSize: 13,
                                                                        }}
                                                                    >
                                                                        {
                                                                            coupon.code
                                                                        }
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            marginTop: 4,
                                                                            fontSize: 12,
                                                                            color:
                                                                                "#64748b",
                                                                        }}
                                                                    >
                                                                        {coupon.discount_type ===
                                                                        "percentage"
                                                                            ? `${coupon.discount_value}% OFF`
                                                                            : `${currency(
                                                                                coupon.discount_value
                                                                            )} OFF`}
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        padding:
                                                                            "6px 10px",

                                                                        borderRadius: 10,

                                                                        background:
                                                                            "#4f46e5",

                                                                        color:
                                                                            "white",

                                                                        fontSize: 10,

                                                                        fontWeight: 800,
                                                                    }}
                                                                >
                                                                    APPLY
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                    <form
                                        action={`/payments?course_id=${course.id}`}
                                        method="POST"
                                    >
                                        <input
                                            type="hidden"
                                            name="authenticity_token"
                                            value={
                                                csrfToken
                                            }
                                        />

                                        <input
                                            type="hidden"
                                            name="coupon_code"
                                            value={
                                                selectedCoupon?.code ||
                                                ""
                                            }
                                        />

                                        <div
                                            style={{
                                                background:
                                                    "white",

                                                borderRadius: 14,

                                                padding: 14,

                                                marginBottom: 14,

                                                border:
                                                    "1px solid #e2e8f0",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display:
                                                        "flex",

                                                    justifyContent:
                                                        "space-between",

                                                    marginBottom: 8,

                                                    fontSize: 13,
                                                }}
                                            >
                                                <span>
                                                    Original
                                                </span>

                                                <strong>
                                                    {currency(
                                                        course.price
                                                    )}
                                                </strong>
                                            </div>

                                            <div
                                                style={{
                                                    display:
                                                        "flex",

                                                    justifyContent:
                                                        "space-between",

                                                    marginBottom: 8,

                                                    fontSize: 13,
                                                }}
                                            >
                                                <span>
                                                    Discount
                                                </span>

                                                <strong
                                                    style={{
                                                        color:
                                                            "#059669",
                                                    }}
                                                >
                                                    -
                                                    {currency(
                                                        pricing.discount
                                                    )}
                                                </strong>
                                            </div>

                                            <div
                                                style={{
                                                    height: 1,
                                                    background:
                                                        "#e2e8f0",
                                                    margin:
                                                        "10px 0",
                                                }}
                                            />

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
                                                <span
                                                    style={{
                                                        fontWeight: 900,
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Final Amount
                                                </span>

                                                <motion.strong
                                                    key={
                                                        pricing.finalPrice
                                                    }

                                                    initial={{
                                                        scale: 1.15,
                                                        opacity: 0.5,
                                                    }}

                                                    animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                    }}

                                                    style={{
                                                        fontSize: 20,

                                                        color:
                                                            "#ea580c",
                                                    }}
                                                >
                                                    {currency(
                                                        pricing.finalPrice
                                                    )}
                                                </motion.strong>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{
                                                scale: 1.02,
                                            }}

                                            whileTap={{
                                                scale: 0.96,
                                            }}

                                            type="submit"

                                            style={{
                                                width: "100%",

                                                padding:
                                                    "13px 14px",

                                                borderRadius: 14,

                                                border: "none",

                                                background:
                                                    "#111827",

                                                color:
                                                    "white",

                                                fontWeight: 900,

                                                cursor:
                                                    "pointer",

                                                fontSize: 14,
                                            }}
                                        >
                                            💳 Pay{" "}
                                            {currency(
                                                pricing.finalPrice
                                            )}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}

                {canManage && (
                    <motion.a
                        whileHover={{
                            scale: 1.02,
                        }}

                        whileTap={{
                            scale: 0.98,
                        }}

                        href={`/courses/${course.id}/edit`}
                        style={{
                            display: "block",
                            textAlign: "center",
                            textDecoration:
                                "none",
                            padding: 13,
                            borderRadius: 14,
                            background:
                                "#f1f5f9",
                            color: "#1e293b",
                            fontWeight: 800,
                            marginTop: 16,
                            fontSize: 14,
                        }}
                    >
                        Edit Course Details
                    </motion.a>
                )}
            </div>
        </motion.div>
    );
}

export default function CourseCataloguePage({
                                                courses = [],
                                                current_user,
                                                csrf_token,
                                            }) {
    const [search, setSearch] =
        useState("");

    const filteredCourses =
        useMemo(() => {
            return courses.filter(
                (course) => {
                    if (!search)
                        return true;

                    const query =
                        search.toLowerCase();

                    return (
                        course.title
                            ?.toLowerCase()
                            .includes(query) ||
                        course.code
                            ?.toLowerCase()
                            .includes(query)
                    );
                }
            );
        }, [courses, search]);

    return (
        <div
            style={{
                maxWidth: 1280,
                margin: "30px auto",
                padding: 18,
                fontFamily:
                    "Inter, system-ui, sans-serif",

                background:
                    "linear-gradient(to bottom,#f8fafc,#eef2ff)",

                minHeight: "100vh",
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: -30,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: 0.6,
                }}

                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 32,
                    padding: 34,

                    background:
                        "linear-gradient(135deg,#0f172a 0%, #1e293b 45%, #312e81 100%)",

                    marginBottom: 28,
                    color: "white",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,

                        display: "flex",
                        justifyContent:
                            "space-between",
                        gap: 24,
                        flexWrap: "wrap",
                        alignItems:
                            "flex-end",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display:
                                    "inline-flex",
                                padding:
                                    "8px 14px",
                                borderRadius:
                                    999,
                                background:
                                    "rgba(255,255,255,0.08)",

                                fontSize: 11,
                                fontWeight: 800,
                                marginBottom: 18,
                            }}
                        >
                            🎓 UNIVERSITY COURSE
                            SYSTEM
                        </div>

                        <h1
                            style={{
                                fontSize: 42,
                                lineHeight: 1,
                                fontWeight: 950,
                                margin:
                                    "0 0 14px",
                            }}
                        >
                            Course Catalogue
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                maxWidth: 620,

                                color:
                                    "rgba(255,255,255,0.74)",

                                fontSize: 14,
                                lineHeight: 1.7,
                            }}
                        >
                            Browse and enroll in
                            available academic
                            courses.
                        </p>
                    </div>

                    <div
                        style={{
                            minWidth: 240,
                        }}
                    >
                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                            placeholder="Search courses..."

                            style={{
                                width: "100%",

                                padding:
                                    "14px 18px",

                                borderRadius: 16,

                                border: "none",

                                outline: "none",

                                fontSize: 13,

                                background:
                                    "rgba(255,255,255,0.1)",

                                color: "white",

                                backdropFilter:
                                    "blur(10px)",
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(320px,1fr))",

                    gap: 20,
                }}
            >
                <AnimatePresence>
                    {filteredCourses.map(
                        (course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                currentUser={
                                    current_user
                                }
                                csrfToken={
                                    csrf_token
                                }
                            />
                        )
                    )}
                </AnimatePresence>
            </div>

            {filteredCourses.length ===
                0 && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        style={{
                            marginTop: 60,
                            textAlign: "center",
                            color: "#64748b",
                            fontWeight: 700,
                            fontSize: 18,
                        }}
                    >
                        No courses found.
                    </motion.div>
                )}
        </div>
    );
}