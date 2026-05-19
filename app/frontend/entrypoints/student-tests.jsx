import React from "react";
import { createRoot } from "react-dom/client";
import StudentTestsPage from "../pages/StudentTestsPage";

const container = document.getElementById("student-tests-root");

if (container) {
    let props = {};

    try {
        props = JSON.parse(container.dataset.props || "{}");
    } catch (error) {
        console.error("Failed to parse props:", error);
    }

    createRoot(container).render(
        <React.StrictMode>
            <StudentTestsPage {...props} />
        </React.StrictMode>
    );
}