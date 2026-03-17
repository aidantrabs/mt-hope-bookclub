import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Router } from "@utils/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
