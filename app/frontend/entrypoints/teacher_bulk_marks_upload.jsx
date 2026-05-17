import React from "react";
import ReactDOM from "react-dom/client";
import BulkMarksUploadPage from "../pages/BulkMarksUploadPage";

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById(
        "teacher-marks-upload-root"
    );

    if (!rootElement) return;

    const dataElement = document.getElementById(
        "teacher-marks-upload-data"
    );

    let parsedData = {
        courses: [],
    };

    try {
        parsedData = JSON.parse(
            dataElement?.textContent || "{}"
        );
    } catch (error) {
        console.error(
            "Failed to parse upload page JSON:",
            error
        );
    }

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BulkMarksUploadPage
                courses={parsedData.courses || []}
            />
        </React.StrictMode>
    );
});