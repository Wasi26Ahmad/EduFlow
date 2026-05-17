import React from "react";
import ReactDOM from "react-dom/client";
import ResultsApprovalDashboard from "../pages/ResultsApprovalDashboard";

console.log("Results Approval Dashboard loaded");

function unmount() {
    const rootElement = document.getElementById(
        "admin-results-approval-dashboard"
    );

    if (rootElement?.__react_root__) {
        rootElement.__react_root__.unmount();
        delete rootElement.__react_root__;
    }
}

function mount() {
    const rootElement = document.getElementById(
        "admin-results-approval-dashboard"
    );

    if (!rootElement) return;

    unmount();

    const root = ReactDOM.createRoot(rootElement);

    rootElement.__react_root__ = root;

    root.render(
        <React.StrictMode>
            <ResultsApprovalDashboard
                uploads={
                    window.RESULTS_APPROVAL_DATA
                        ?.uploads || []
                }
                results={
                    window.RESULTS_APPROVAL_DATA
                        ?.results || []
                }
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