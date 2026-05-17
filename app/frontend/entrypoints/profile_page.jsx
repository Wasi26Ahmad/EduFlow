import React from "react";
import { createRoot } from "react-dom/client";
import ProfilePage from "../pages/ProfilePage";

const container = document.getElementById("profile-page-root");

if (container) {
    const user = JSON.parse(container.dataset.user);

    createRoot(container).render(
        <React.StrictMode>
            <ProfilePage user={user} />
        </React.StrictMode>
    );
}