import React from "react";
import ReactDOM from "react-dom/client";
import UserManagementDashboard from "../pages/UserManagementDashboard";

console.log("Admin Users Dashboard loaded");

function unmount() {
    const rootElement = document.getElementById(
        "user-management-dashboard"
    );

    if (rootElement?.__react_root__) {
        rootElement.__react_root__.unmount();
        delete rootElement.__react_root__;
    }
}

function mount() {
    const rootElement = document.getElementById(
        "user-management-dashboard"
    );

    if (!rootElement) return;

    unmount();

    const root = ReactDOM.createRoot(rootElement);

    rootElement.__react_root__ = root;

    root.render(
        <React.StrictMode>
            <UserManagementDashboard
                data={window.USER_MANAGEMENT_DATA}
            />
        </React.StrictMode>
    );
}

document.addEventListener("DOMContentLoaded", mount);
document.addEventListener("turbo:load", mount);
document.addEventListener("turbo:before-cache", unmount);