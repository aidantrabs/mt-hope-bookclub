import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@utils": resolve(__dirname, "./src/utils"),
            "@lib": resolve(__dirname, "./src/lib"),
            "@hooks": resolve(__dirname, "./src/hooks"),
        },
    },
    build: {
        rolldownOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules/firebase")) {
                        return "firebase";
                    }
                    if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router")) {
                        return "react";
                    }
                },
            },
        },
    },
});
