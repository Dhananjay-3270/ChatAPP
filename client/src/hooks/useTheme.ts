import { useState, useEffect } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // Retrieve the theme from local storage or default to 'light'
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        // Update the theme in local storage whenever it changes
        localStorage.setItem("theme", theme);
        // Apply the theme class to the document body
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        // Toggle between 'light' and 'dark' themes
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
};