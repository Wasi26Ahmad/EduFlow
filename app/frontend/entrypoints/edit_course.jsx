import React from "react";
import ReactDOM from "react-dom/client";
import EditCoursePage from "../pages/EditCoursePage";

const root = document.getElementById("edit-course-root");

const data = window.EDIT_COURSE_DATA || {};

console.log("EDIT_COURSE_DATA:", data);

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <EditCoursePage
            initialCourse={data.course || {}}
            teachers={data.teachers || []}
            isAdmin={Boolean(data.isAdmin)}
            formAction={data.formAction}
        />
    </React.StrictMode>
);