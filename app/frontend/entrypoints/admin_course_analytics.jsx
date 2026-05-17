import React from "react";
import ReactDOM from "react-dom/client";
import CourseAnalyticsDashboard from "../pages/CourseAnalyticsDashboard";

console.log("Course Analytics entrypoint loaded");

function unmount() {
    const root = document.getElementById(
        "course-analytics-dashboard"
    );

    if (root?.__react_root__) {
        root.__react_root__.unmount();
        delete root.__react_root__;
    }
}

function mount() {
    const root = document.getElementById(
        "course-analytics-dashboard"
    );

    if (root && !root.__react_root__) {
        const courses = JSON.parse(
            root.dataset.courses || "[]"
        );

        const totalCourses = Number(
            root.dataset.totalCourses || 0
        );

        const currentUserRole =
            root.dataset.currentUserRole || "user";

        root.__react_root__ =
            ReactDOM.createRoot(root);

        root.__react_root__.render(
            <React.StrictMode>
                <CourseAnalyticsDashboard
                    courses={courses}
                    totalCourses={totalCourses}
                    currentUserRole={currentUserRole}
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
                "#course-analytics-dashboard"
            )
        ) {
            unmount();
        }
    }
);

mount();

document.addEventListener("turbo:load", mount);