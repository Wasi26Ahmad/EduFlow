import React from "react";
import ReactDOM from "react-dom/client";
import EnrollmentsDashboard from "../pages/EnrollmentsDashboard";

const container = document.getElementById("enrollments-dashboard");

if (container) {
    const props = JSON.parse(container.dataset.props);

    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <EnrollmentsDashboard {...props} />
        </React.StrictMode>
    );
}