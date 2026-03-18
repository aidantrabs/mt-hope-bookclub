import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-bg-dark text-text-on-dark">
    <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <p className="font-display text-lg mb-3">mt. hope book club</p>
        <p className="text-sm text-text-muted-dark leading-relaxed">
          a community of readers in trinidad & tobago.
        </p>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-text-muted-dark mb-4">contact</p>
        <ul className="space-y-2.5 text-sm text-text-muted-dark">
          <li>dominique — <a href="tel:+18683477243" className="hover:text-text-on-dark transition-colors">(868) 347-7243</a></li>
          <li>mohith — <a href="tel:+18687322157" className="hover:text-text-on-dark transition-colors">(868) 732-2157</a></li>
          <li><a href="mailto:mt.hopebookclub@gmail.com" className="hover:text-text-on-dark transition-colors">mt.hopebookclub@gmail.com</a></li>
        </ul>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-text-muted-dark mb-4">links</p>
        <ul className="space-y-2.5 text-sm text-text-muted-dark">
          <li><a href="https://www.instagram.com/mt.hopebookclub" target="_blank" rel="noopener noreferrer" className="hover:text-text-on-dark transition-colors">instagram</a></li>
          <li><Link to="/admin" className="hover:text-text-on-dark transition-colors">admin</Link></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border-dark text-center py-5 text-[11px] tracking-wide text-text-muted-dark/60">
      &copy; {new Date().getFullYear()} mt. hope book club
    </div>
  </footer>
);
