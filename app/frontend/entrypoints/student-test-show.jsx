import React from "react";
import { createRoot } from "react-dom/client";
import StudentTestShow from "../pages/StudentTestShow";

const container = document.getElementById("student-test-show-root");

if (container) {
    const rawData = container.getAttribute("data-test");

    const test = rawData ? JSON.parse(rawData) : {};

    createRoot(container).render(
        <React.StrictMode>
            <StudentTestShow test={test} />
        </React.StrictMode>
    );
}