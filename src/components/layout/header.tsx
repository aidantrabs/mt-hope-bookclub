import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/logo.tsx";

const navLinks = [
  { to: "/", label: "home" },
  { to: "/discover", label: "discover" },
  { to: "/about", label: "about" },
  { to: "/contact", label: "contact" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`bg-bg-light/90 backdrop-blur-md border-b border-border sticky top-0 ${menuOpen ? "z-[60]" : "z-50"}`}>
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-bold text-text-primary">
              mt. hope book <em className="italic text-accent">club</em>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8" role="navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest font-medium transition-colors py-1 underline decoration-1 underline-offset-4 ${
                    isActive
                      ? "text-accent decoration-accent"
                      : "text-text-secondary decoration-transparent hover:text-text-primary hover:decoration-text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-text-primary p-2 -mr-2 relative z-[60]"
            aria-label={menuOpen ? "close menu" : "open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-bg-light flex flex-col items-start justify-center px-8 transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        role="navigation"
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-4xl font-bold transition-all duration-300 underline decoration-2 underline-offset-4 ${
                  isActive ? "text-accent decoration-accent" : "text-text-primary decoration-transparent hover:text-accent hover:decoration-accent"
                }`
              }
              style={{
                transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};
