import { Outlet } from "react-router-dom";
import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";

export const PageWrapper = () => (
  <div className="min-h-screen flex flex-col bg-[#fdf6ec] text-[#3d2c2e]">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);
