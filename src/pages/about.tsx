export const About = () => (
  <div>
    <section className="bg-bg-light py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-8">
          about the club
        </h1>

        <div className="space-y-6 text-text-primary leading-relaxed">
          <p>
            mt. hope book club is a small community of readers based in trinidad & tobago.
            we come together to explore stories across every genre — from fantasy and literary
            fiction to romance and thrillers — and have honest, sometimes heated, always fun
            conversations about the books we read.
          </p>

          <p>
            we started as a group of friends who wanted to read more intentionally and hold
            each other accountable. what we didn't expect was how much the discussions would
            change the way we see the books — and each other.
          </p>

          <p>
            we typically pick a new book every few weeks, read at our own pace, and meet up
            to talk it through. sometimes we agree. sometimes we don't. that's the best part.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-bg-dark py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-text-muted-dark mb-4">
          find us on instagram
        </h2>
        <p className="text-text-muted-dark mb-8 max-w-md mx-auto">
          we post recaps, reading updates, and the occasional hot take. come say hi.
        </p>
        <a
          href="https://www.instagram.com/mt.hopebookclub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white rounded-full px-8 py-3 font-medium text-sm uppercase tracking-[0.15em] hover:bg-accent-hover hover:scale-[1.02] transition-all"
        >
          @mt.hopebookclub
        </a>
      </div>
    </section>
  </div>
);
