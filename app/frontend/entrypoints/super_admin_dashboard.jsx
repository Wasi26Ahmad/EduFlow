import React from "react";
import ReactDOM from "react-dom/client";
import { SuperAdminDashboard } from "../pages/SuperAdminDashboard";

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
        const currentUserEmail =
            root.dataset.currentUserEmail || "";

        const activeUsers =
            Number(root.dataset.activeUsers || 0);

        root.__react_root__ = ReactDOM.createRoot(root);

        root.__react_root__.render(
            <React.StrictMode>
                <SuperAdminDashboard
                    currentUserEmail={currentUserEmail}
                    activeUsers={activeUsers}
                />
            </React.StrictMode>
        );
    }
}

document.addEventListener("turbo:before-render", (event) => {
    if (!event.detail.newBody.querySelector("#super-admin-dashboard")) {
        unmount();
    }
});

mount();

document.addEventListener("turbo:load", mount);