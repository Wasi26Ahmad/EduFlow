import React from "react";
import ReactDOM from "react-dom/client";
import TeacherEvaluateAttempt from "../pages/TeacherEvaluateAttempt";

const container = document.getElementById(
    "teacher-evaluate-attempt-root"
);

if (container) {
    const props = JSON.parse(
        container.dataset.props || "{}"
    );

    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <TeacherEvaluateAttempt {...props} />
        </React.StrictMode>
    );
}