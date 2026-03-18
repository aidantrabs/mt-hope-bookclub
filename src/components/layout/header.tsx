import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "@/components/ui/logo.tsx";

const navLinks = [
  { to: "/", label: "home" },
  { to: "/discover", label: "discover" },
  { to: "/about", label: "about" },
  { to: "/contact", label: "contact" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-bg-light/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="font-semibold text-text-primary">mt. hope book club</span>
        </Link>

        <div className="hidden md:flex items-center gap-8" role="navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-medium transition-colors py-1 ${
                  isActive
                    ? "text-text-primary border-b border-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-primary p-2 -mr-2"
          aria-label={menuOpen ? "close menu" : "open menu"}
          aria-expanded={menuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

      {menuOpen && (
        <div className="md:hidden bg-bg-light border-t border-border px-5 py-3 space-y-1" role="navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-xs uppercase tracking-widest font-medium ${
                  isActive ? "text-text-primary" : "text-text-secondary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
