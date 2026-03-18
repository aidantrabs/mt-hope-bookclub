import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";

export const PageWrapper = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-text-primary">
      <Header />
      <main key={pathname} className="flex-1 page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
