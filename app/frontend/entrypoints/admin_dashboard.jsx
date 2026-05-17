import React from "react";
import ReactDOM from "react-dom/client";
import AdminDashboardPage from "../pages/AdminDashboardPage";

const rootElement = document.getElementById("admin-dashboard-root");

if (rootElement) {
    const dashboardData = JSON.parse(
        rootElement.dataset.dashboard || "{}"
    );

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <AdminDashboardPage {...dashboardData} />
        </React.StrictMode>
    );
}