import React from "react";
import ReactDOM from "react-dom/client";
import { TeacherDashboard } from "../pages/TeacherDashboard";

console.log("Teacher Dashboard Loaded");

function unmount() {
    const root = document.getElementById("teacher-dashboard");

    if (root?.__react_root__) {
        root.__react_root__.unmount();

        delete root.__react_root__;
    }
}

function mount() {
    const root = document.getElementById("teacher-dashboard");

    if (root && !root.__react_root__) {

        const currentUserEmail =
            root.dataset.currentUserEmail || "";

        const uploadMarksPath =
            root.dataset.uploadMarksPath || "#";

        const coursesPath =
            root.dataset.coursesPath || "#";

        const testsPath =
            root.dataset.testsPath || "#";

        root.__react_root__ =
            ReactDOM.createRoot(root);

        root.__react_root__.render(
            <React.StrictMode>
                <TeacherDashboard
                    currentUserEmail={currentUserEmail}
                    uploadMarksPath={uploadMarksPath}
                    coursesPath={coursesPath}
                    testsPath={testsPath}
                />
            </React.StrictMode>
        );
    }
}

document.addEventListener(
    "turbo:before-render",
    (event) => {

        if (
            !event.detail.newBody.querySelector(
                "#teacher-dashboard"
            )
        ) {
            unmount();
        }
    }
);

mount();

document.addEventListener(
    "turbo:load",
    mount
);