import React from "react";
import { createRoot } from "react-dom/client";

import StudentResultsDashboard
    from "../pages/StudentResultsDashboard";

const container = document.getElementById(
    "student-results-dashboard"
);

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <StudentResultsDashboard
                results={
                    window.studentResultsData.results
                }
                generatePdfUrl={
                    window.studentResultsData.generatePdfUrl
                }
                latestExport={
                    window.studentResultsData.latestExport
                }
                pagination={
                    window.studentResultsData.pagination
                }
            />
        </React.StrictMode>
    );
}