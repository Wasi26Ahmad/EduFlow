import React, { useMemo, useState } from "react";

// Utility for currency formatting
const currency = (value) => `৳ ${Number(value || 0).toLocaleString()}`;

// Vibrant Badge Component
const Badge = ({ children, color = "blue" }) => {
    const colors = {
        blue: { bg: "#eff6ff", text: "#2563eb", border: "#dbeafe" },
        green: { bg: "#ecfdf5", text: "#10b981", border: "#d1fae5" },
        gray: { bg: "#f8fafc", text: "#64748b", border: "#f1f5f9" },
        indigo: { bg: "#eef2ff", text: "#4f46e5", border: "#e0e7ff" },
    };
    const style = colors[color] || colors.blue;
    return (
        <span style={{
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: "600",
            backgroundColor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
            display: "inline-block"
        }}>
      {children}
    </span>
    );
};

function CouponCard({ coupon, courseId }) {
    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
        }}>
            <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "monospace", fontWeight: "700", color: "#1e293b", fontSize: "14px" }}>
            {coupon.code}
          </span>
                    <Badge color="green">
                        {coupon.discount_type === "percentage" ? `${coupon.discount_value}% OFF` : `${currency(coupon.discount_value)} OFF`}
                    </Badge>
                </div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
                    Used: <span style={{ color: "#475569", fontWeight: "600" }}>{coupon.used_count || 0} times</span>
                </div>
            </div>
            <a href={`/admin/courses/${courseId}/coupons/${coupon.id}/edit`} style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#1e293b",
                textDecoration: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}>
                Edit
            </a>
        </div>
    );
}

function CourseCard({ course, currentUserRole }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
            transition: "transform 0.2s ease",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            {/* Top Section */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Badge color="indigo">{course.code}</Badge>
                    <h3 style={{ margin: "12px 0 4px", fontSize: "18px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>
                        {course.title}
                    </h3>
                    <span style={{ fontSize: "13px", color: "#64748b" }}>{course.teacher_email}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>{currency(course.price)}</div>
                    <div style={{ fontSize: "12px", color: "#10b981", fontWeight: "600" }}>Active Course</div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                    { label: "Total Students", value: course.total_students, color: "#f8fafc" },
                    { label: "Revenue", value: currency(course.total_earned), color: "#f8fafc" },
                    { label: "Approved", value: course.approved_students, color: "#f8fafc" },
                    { label: "Collection", value: `${course.collection_rate}%`, color: "#f8fafc" }
                ].map((stat, i) => (
                    <div key={i} style={{ backgroundColor: stat.color, padding: "12px", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                        <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase" }}>{stat.label}</div>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", marginTop: "2px" }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Admin Section */}
            {(currentUserRole === "admin" || currentUserRole === "super_admin") && (
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            background: expanded ? "#0f172a" : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                            transition: "all 0.2s"
                        }}
                    >
                        {expanded ? "Hide Promotions" : `Manage Coupons (${course.active_coupons})`}
                    </button>

                    {expanded && (
                        <div style={{
                            marginTop: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            background: "#f8fafc",
                            padding: "12px",
                            borderRadius: "16px"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
                                <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>ACTIVE PROMOS</span>
                                <a href={`/admin/courses/${course.id}/coupons/new`} style={{ fontSize: "12px", color: "#4f46e5", fontWeight: "700", textDecoration: "none" }}>+ Add New</a>
                            </div>

                            {course.active_coupon_list?.length > 0 ? (
                                course.active_coupon_list.map((c) => (
                                    <CouponCard key={c.id} coupon={c} courseId={course.id} />
                                ))
                            ) : (
                                <div style={{ textAlign: "center", padding: "20px", color: "#94a3b8", fontSize: "13px" }}>
                                    No coupons found for this course.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function CourseAnalyticsDashboard({ courses = [], currentUserRole = "admin" }) {
    const [search, setSearch] = useState("");

    const filteredCourses = useMemo(() => {
        return courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
    }, [courses, search]);

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#fbfcfd",
            padding: "60px 20px",
            fontFamily: "'Inter', -apple-system, sans-serif"
        }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
                    <div>
                        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a", letterSpacing: "-0.04em", margin: 0 }}>
                            Course Analytics
                        </h1>
                        <p style={{ color: "#64748b", marginTop: "8px", fontSize: "16px" }}>
                            Real-time performance tracking and discount management.
                        </p>
                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            placeholder="Search by course name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: "14px 20px",
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                width: "320px",
                                fontSize: "14px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                                outline: "none"
                            }}
                        />
                    </div>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                    gap: "30px"
                }}>
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} currentUserRole={currentUserRole} />
                    ))}
                </div>
            </div>
        </div>
    );
}