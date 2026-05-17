import React from "react";
import ReactDOM from "react-dom/client";
import PendingEnrollmentsDashboard from "../pages/PendingEnrollmentsDashboard";

console.log("Pending Enrollments Dashboard loaded");

function unmount() {
    const rootElement = document.getElementById(
        "pending-enrollments-dashboard"
    );

    if (rootElement?.__react_root__) {
        rootElement.__react_root__.unmount();
        delete rootElement.__react_root__;
    }
}

function mount() {
    const rootElement = document.getElementById(
        "pending-enrollments-dashboard"
    );

    if (!rootElement) return;

    unmount();

    const root = ReactDOM.createRoot(rootElement);

    rootElement.__react_root__ = root;
    const data =
        window.PENDING_ENROLLMENTS_DATA || {
            enrollments: [],
            count: 0,
            empty: true,
            pagy: "",
        };

    root.render(
        <React.StrictMode>
            <PendingEnrollmentsDashboard
                data={data}
            />
        </React.StrictMode>
    );
}

document.addEventListener(
    "DOMContentLoaded",
    mount
);

document.addEventListener(
    "turbo:load",
    mount
);

document.addEventListener(
    "turbo:before-cache",
    unmount
);