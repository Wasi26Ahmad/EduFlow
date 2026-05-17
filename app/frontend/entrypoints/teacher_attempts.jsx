import React from "react";
import { createRoot } from "react-dom/client";
import TeacherAttemptsPage from "../pages/TeacherAttemptsPage";

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("teacher-attempts-root");

    if (!rootElement) return;

    const props = JSON.parse(rootElement.dataset.props);

    createRoot(rootElement).render(
        <React.StrictMode>
            <TeacherAttemptsPage {...props} />
        </React.StrictMode>
    );
});