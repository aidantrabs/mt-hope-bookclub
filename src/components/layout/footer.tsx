import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-brown text-cream mt-auto">
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-serif text-lg font-bold mb-3">mt. hope book club</h3>
        <p className="text-sm text-sand leading-relaxed">
          a community of readers in trinidad & tobago.
        </p>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-3 uppercase tracking-wider text-gold">contact</h4>
        <ul className="space-y-2 text-sm text-sand">
          <li>
            dominique —{" "}
            <a href="tel:+18683477243" className="hover:text-white transition-colors">
              (868) 347-7243
            </a>
          </li>
          <li>
            mohith —{" "}
            <a href="tel:+18687322157" className="hover:text-white transition-colors">
              (868) 732-2157
            </a>
          </li>
          <li>
            <a href="mailto:mt.hopebookclub@gmail.com" className="hover:text-white transition-colors">
              mt.hopebookclub@gmail.com
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-3 uppercase tracking-wider text-gold">links</h4>
        <ul className="space-y-2 text-sm text-sand">
          <li>
            <a
              href="https://www.instagram.com/mt.hopebookclub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              instagram
            </a>
          </li>
          <li>
            <Link to="/admin" className="hover:text-white transition-colors">
              admin
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-brown-light/30 text-center py-4 text-xs text-brown-muted">
      &copy; {new Date().getFullYear()} mt. hope book club. all rights reserved.
    </div>
  </footer>
);
