import { createState, useState } from "./state.js";

const theme = createState({
    properties: {
        dark: {
            "nav-background-color": "#434543",
            "background-color": "#2b2e2c",
            "nav-color": "#f2eded",
            "color": "#d6d6d6"
        },
        light: {
            "nav-background-color": "#f2eded",
            "background-color": "#d6d6d6",
            "nav-color": "#434543",
            "color": "#2b2e2c"
        }
    },

    active: "dark"
});

useState(theme, document.body, null, function(element) {
    for (const property in this.properties[this.active]) {
        element.style.setProperty(`--theme-${property}`, this.properties[this.active][property]);
    }
});

document.querySelector(".toggle-theme").addEventListener("click", function() {
    theme.active = theme.active === "light" ? "dark" : "light";
});