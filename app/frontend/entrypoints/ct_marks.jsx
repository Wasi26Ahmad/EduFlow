import React from "react";
import ReactDOM from "react-dom/client";
import CTMarksPage from "../pages/CTMarksPage";

const rootElement = document.getElementById("ct-marks-root");
const dataElement = document.getElementById("ct-marks-data");

if (rootElement && dataElement) {
    const attempts = JSON.parse(dataElement.textContent);

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <CTMarksPage attempts={attempts} />
        </React.StrictMode>
    );
}