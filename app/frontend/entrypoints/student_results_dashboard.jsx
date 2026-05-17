import React from "react";
import { createRoot } from "react-dom/client";
import StudentResultsDashboard from "../pages/StudentResultsDashboard";

const container = document.getElementById(
    "student-results-dashboard"
);

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <StudentResultsDashboard
                results={window.studentResultsData.results}
                downloadUrl={window.studentResultsData.downloadUrl}
                pagination={window.studentResultsData.pagination}
            />
        </React.StrictMode>
    );
}