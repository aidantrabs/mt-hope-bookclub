import { Link } from "react-router-dom";

export const Home = () => (
  <div>
    <section className="py-20 md:py-32 px-4 text-center">
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#3d2c2e] mb-4">
        mt. hope book club
      </h1>
      <p className="text-lg md:text-xl text-[#6b5658] max-w-xl mx-auto mb-8">
        a community of readers in trinidad & tobago — one book at a time.
      </p>
      <Link
        to="/books"
        className="inline-block bg-[#c26a4a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#a8583d] transition-colors"
      >
        explore our books
      </Link>
    </section>

    <section className="max-w-6xl mx-auto px-4 pb-16">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3d2c2e] mb-8 text-center">
        what we've been reading
      </h2>
      <p className="text-center text-[#6b5658]">
        books coming soon — we're still setting things up!
      </p>
    </section>
  </div>
);
