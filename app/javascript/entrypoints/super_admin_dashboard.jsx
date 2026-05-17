import React from "react";
import ReactDOM from "react-dom/client";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";

console.log("Super Admin entrypoint loaded");

function unmount() {
    const root = document.getElementById("super-admin-dashboard");
    if (root?.__react_root__) {
        root.__react_root__.unmount();
        delete root.__react_root__;
    }
}

function mount() {
    const root = document.getElementById("super-admin-dashboard");
    if (root && !root.__react_root__) {
        root.__react_root__ = ReactDOM.createRoot(root);
        root.__react_root__.render(
            <React.StrictMode>
                <SuperAdminDashboard
                    currentUserEmail={root.dataset.currentUserEmail}
                />
            </React.StrictMode>
        );
    }
}

document.addEventListener("turbo:before-render", (event) => {
    // Only unmount if the next page does NOT have the dashboard
    if (!event.detail.newBody.querySelector("#super-admin-dashboard")) {
        unmount();
    }
});

mount();

document.addEventListener("turbo:load", mount);