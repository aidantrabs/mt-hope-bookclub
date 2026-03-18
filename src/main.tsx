import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Router } from "@utils/router.tsx";
import { ToastProvider } from "@/components/ui/toast.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ToastProvider>
            <Router />
        </ToastProvider>
    </StrictMode>,
);
