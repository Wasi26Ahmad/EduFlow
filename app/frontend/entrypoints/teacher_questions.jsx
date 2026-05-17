import React from "react";
import { createRoot } from "react-dom/client";
import TeacherQuestionsPage from "../pages/TeacherQuestionsPage";

const container = document.getElementById("teacher-questions-root");

if (container) {
    const props = JSON.parse(
        container.getAttribute("data-props") || "{}"
    );

    createRoot(container).render(
        <React.StrictMode>
            <TeacherQuestionsPage {...props} />
        </React.StrictMode>
    );
}