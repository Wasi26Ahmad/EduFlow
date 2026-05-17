import React from "react";
import ReactDOM from "react-dom/client";
import TeacherMarksUploadPage from "../pages/TeacherMarksUploadPage";

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById(
        "teacher-marks-upload-root"
    );

    if (!rootElement) return;

    const pageData = JSON.parse(
        rootElement.dataset.page || "{}"
    );

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <TeacherMarksUploadPage {...pageData} />
        </React.StrictMode>
    );
});