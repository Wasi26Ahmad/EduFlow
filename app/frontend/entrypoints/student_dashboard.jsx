import React from "react";
import ReactDOM from "react-dom/client";
import StudentDashboard from "../pages/StudentDashboard";

const rootElement = document.getElementById("student-dashboard-root");

if (rootElement) {
    const approvedCount = Number(
        rootElement.dataset.approvedCount || 0
    );

    const totalCount = Number(
        rootElement.dataset.totalCount || 0
    );

    const progress =
        totalCount > 0
            ? Math.round((approvedCount / totalCount) * 100)
            : 0;

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <StudentDashboard
                userEmail={rootElement.dataset.userEmail}
                approvedCount={approvedCount}
                totalCount={totalCount}
                cgpa={rootElement.dataset.cgpa}
                progress={progress}
                paths={{
                    profile: rootElement.dataset.profilePath,
                    courses: rootElement.dataset.coursesPath,
                    results: rootElement.dataset.resultsPath,
                    enrollments: rootElement.dataset.enrollmentsPath,
                }}
            />
        </React.StrictMode>
    );
}