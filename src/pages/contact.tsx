export const Contact = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown mb-2">
      get in touch
    </h1>
    <p className="text-brown-light mb-10">
      have a question, want to join, or just want to talk books? reach out.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
        <h2 className="font-serif text-lg font-bold text-brown mb-1">dominique</h2>
        <a href="tel:+18683477243" className="text-terracotta hover:underline">
          (868) 347-7243
        </a>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
        <h2 className="font-serif text-lg font-bold text-brown mb-1">mohith</h2>
        <a href="tel:+18687322157" className="text-terracotta hover:underline">
          (868) 732-2157
        </a>
      </div>
    </div>

    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
        <h2 className="text-xs font-medium uppercase tracking-wider text-brown-muted mb-2">email</h2>
        <a href="mailto:mt.hopebookclub@gmail.com" className="text-terracotta hover:underline text-lg">
          mt.hopebookclub@gmail.com
        </a>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand">
        <h2 className="text-xs font-medium uppercase tracking-wider text-brown-muted mb-2">instagram</h2>
        <a
          href="https://www.instagram.com/mt.hopebookclub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terracotta hover:underline text-lg"
        >
          @mt.hopebookclub
        </a>
      </div>
    </div>
  </div>
);
