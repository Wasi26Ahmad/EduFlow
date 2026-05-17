import React from "react";
import { createRoot } from "react-dom/client";
import EditProfilePage from "../pages/EditProfilePage";

const container = document.getElementById("edit-profile-root");

if (container) {
    const user = JSON.parse(container.dataset.user || "{}");
    const profilePath = container.dataset.profilePath;

    createRoot(container).render(
        <React.StrictMode>
            <EditProfilePage
                user={user}
                profilePath={profilePath}
            />
        </React.StrictMode>
    );
}