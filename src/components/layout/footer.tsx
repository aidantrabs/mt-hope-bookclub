import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/logo.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";

export const Footer = () => (
  <footer>
    <div className="bg-bg-dark noise-overlay">
      <WaveDivider fill="var(--color-bg-footer)" className="h-10 md:h-16 relative z-[2]" />
    </div>

    <div className="bg-bg-footer">
      <div className="max-w-6xl mx-auto px-5 pt-10 md:pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-10 md:gap-8 pb-10 border-b border-border-dark">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Logo className="w-7 h-7" />
              <span className="text-lg font-bold text-text-on-dark">
                mt. hope book <em className="italic text-accent">club</em>
              </span>
            </Link>
            <p className="text-sm text-text-muted-dark leading-relaxed max-w-xs">
              turning pages. exploring worlds. a community of readers in trinidad & tobago.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-medium text-text-muted-dark mb-4">navigate</p>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-text-muted-dark hover:text-text-on-dark transition-colors">home</Link>
              <Link to="/discover" className="text-sm text-text-muted-dark hover:text-text-on-dark transition-colors">discover</Link>
              <Link to="/about" className="text-sm text-text-muted-dark hover:text-text-on-dark transition-colors">about</Link>
              <Link to="/contact" className="text-sm text-text-muted-dark hover:text-text-on-dark transition-colors">contact</Link>
              <a href="https://www.instagram.com/mt.hopebookclub" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted-dark hover:text-text-on-dark transition-colors">
                instagram
              </a>
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-medium text-text-muted-dark mb-4">contact</p>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted-dark">
              <li>
                <span className="text-text-on-dark">dominique</span> —{" "}
                <a href="tel:+18683477243" className="hover:text-text-on-dark transition-colors">(868) 347-7243</a>
              </li>
              <li>
                <span className="text-text-on-dark">mohith</span> —{" "}
                <a href="tel:+18687322157" className="hover:text-text-on-dark transition-colors">(868) 732-2157</a>
              </li>
              <li>
                <a href="mailto:mt.hopebookclub@gmail.com" className="hover:text-text-on-dark transition-colors">
                  mt.hopebookclub@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-5">
          <p className="text-xs text-text-muted-dark/50">
            &copy; {new Date().getFullYear()} mt. hope book club
          </p>
          <Link to="/admin" className="text-xs text-text-muted-dark/40 hover:text-text-muted-dark transition-colors">
            admin
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
