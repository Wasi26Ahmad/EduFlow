import React from "react";
import ReactDOM from "react-dom/client";
import CreateTestPage from "../pages/CreateTestPage";

const rootElement = document.getElementById("create-test-root");

const dataElement = document.getElementById("create-test-data");

if (rootElement && dataElement) {
    const props = JSON.parse(dataElement.textContent);

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <CreateTestPage {...props} />
        </React.StrictMode>
    );
}