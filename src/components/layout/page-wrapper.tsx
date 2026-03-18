import { InitialLoadContext, useInitialLoadProvider } from "@hooks/use-initial-load.ts";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/logo.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";

export const PageWrapper = () => {
    const { pathname } = useLocation();
    const ctx = useInitialLoadProvider();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (showLoader) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showLoader]);

    useEffect(() => {
        if (!ctx.ready) return;
        const timer = setTimeout(() => setShowLoader(false), 400);
        return () => clearTimeout(timer);
    }, [ctx.ready]);

    return (
        <InitialLoadContext.Provider value={ctx}>
            <div className="min-h-screen flex flex-col bg-bg-light text-text-primary">
                {showLoader && (
                    <div className={`loading-screen ${ctx.ready ? "loading-screen-exit" : ""}`}>
                        <Logo className="w-16 h-16 loading-logo" />
                        <p className="text-xs uppercase tracking-widest font-medium text-text-secondary mt-4">
                            loading
                        </p>
                    </div>
                )}
                <Header />
                <main key={pathname} className="flex-1 page-transition">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </InitialLoadContext.Provider>
    );
};
