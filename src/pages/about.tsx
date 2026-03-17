export const About = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown mb-6">
      about us
    </h1>

    <div className="space-y-6 text-brown leading-relaxed">
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

      <section className="bg-white rounded-xl p-6 shadow-sm border border-sand mt-8">
        <h2 className="font-serif text-xl font-bold text-brown mb-3">want to join?</h2>
        <p className="text-brown-light mb-4">
          we're always open to new members. reach out to us on instagram or get in touch
          through our contact page.
        </p>
        <a
          href="https://www.instagram.com/mt.hopebookclub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-terracotta text-white px-6 py-2.5 rounded-lg font-medium hover:bg-terracotta-dark transition-colors"
        >
          follow us on instagram
        </a>
      </section>
    </div>
  </div>
);
