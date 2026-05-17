import React from "react";
import ReactDOM from "react-dom/client";
import TeacherTestDashboard from "../pages/TeacherTestDashboard";

const rootElement = document.getElementById("teacher-tests-root");

if (rootElement) {
    const courses = JSON.parse(
        rootElement.dataset.courses || "[]"
    );

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <TeacherTestDashboard courses={courses} />
        </React.StrictMode>
    );
}