export const Contact = () => (
  <div className="bg-bg-light py-12 md:py-16">
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
        get in touch
      </h1>
      <p className="text-text-secondary mb-10">
        have a question, want to join, or just want to talk books? reach out.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-2">dominique</p>
          <a href="tel:+18683477243" className="text-accent hover:text-accent-hover text-lg transition-colors">
            (868) 347-7243
          </a>
        </div>

        <div className="bg-bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-2">mohith</p>
          <a href="tel:+18687322157" className="text-accent hover:text-accent-hover text-lg transition-colors">
            (868) 732-2157
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-2">email</p>
          <a href="mailto:mt.hopebookclub@gmail.com" className="text-accent hover:text-accent-hover text-lg transition-colors">
            mt.hopebookclub@gmail.com
          </a>
        </div>

        <div className="bg-bg-card rounded-xl p-6 shadow-sm border border-border">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-2">instagram</p>
          <a
            href="https://www.instagram.com/mt.hopebookclub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover text-lg transition-colors"
          >
            @mt.hopebookclub
          </a>
        </div>
      </div>
    </div>
  </div>
);
