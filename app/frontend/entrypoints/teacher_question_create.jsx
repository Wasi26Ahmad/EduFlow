import React from "react";
import ReactDOM from "react-dom/client";
import TeacherQuestionCreate from "../pages/TeacherQuestionCreate";

const container = document.getElementById(
    "teacher-question-create-root"
);

if (container) {
    let props = {};

    try {
        props = JSON.parse(
            container.dataset.props || "{}"
        );
    } catch (error) {
        console.error("Failed to parse props:", error);
    }

    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <TeacherQuestionCreate {...props} />
        </React.StrictMode>
    );
}