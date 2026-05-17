import React from "react";
import ReactDOM from "react-dom/client";
import CourseCataloguePage from "../pages/CourseCataloguePage";

console.log("Course Catalogue entrypoint loaded");

function mount() {
    const rootElement = document.getElementById(
        "course-catalogue-root"
    );

    if (!rootElement) return;

    const props = JSON.parse(
        rootElement.dataset.props || "{}"
    );

    if (!rootElement.__reactRoot__) {
        rootElement.__reactRoot__ =
            ReactDOM.createRoot(rootElement);
    }

    rootElement.__reactRoot__.render(
        <React.StrictMode>
            <CourseCataloguePage {...props} />
        </React.StrictMode>
    );
}

function unmount() {
    const rootElement = document.getElementById(
        "course-catalogue-root"
    );

    if (
        rootElement &&
        rootElement.__reactRoot__
    ) {
        rootElement.__reactRoot__.unmount();
        delete rootElement.__reactRoot__;
    }
}

document.addEventListener(
    "turbo:before-render",
    unmount
);

document.addEventListener(
    "turbo:load",
    mount
);

mount();