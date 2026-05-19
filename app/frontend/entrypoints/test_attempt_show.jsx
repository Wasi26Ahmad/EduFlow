import React from "react";
import { createRoot } from "react-dom/client";
import TestAttemptPage from "../pages/TestAttemptPage";

const container = document.getElementById("test-attempt-root");

if (container) {
    const data = JSON.parse(container.dataset.attempt);

    createRoot(container).render(
        <React.StrictMode>
            <TestAttemptPage data={data} />
        </React.StrictMode>
    );
}