import React from "react";
import { createRoot } from "react-dom/client";
import EnrollmentRequestsPage from "../pages/EnrollmentRequestsPage";

const components = {
    EnrollmentRequestsPage,
};

document.addEventListener("DOMContentLoaded", () => {
    const nodes = document.querySelectorAll("[data-react-class]");

    nodes.forEach((node) => {
        const componentName = node.dataset.reactClass;
        const props = JSON.parse(node.dataset.reactProps || "{}");

        const Component = components[componentName];

        if (Component) {
            createRoot(node).render(<Component {...props} />);
        }
    });
});