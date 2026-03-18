import { Link } from "react-router-dom";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { SectionLabel } from "@/components/ui/section-label.tsx";
import { HeroIllustration } from "@/components/ui/hero-illustration.tsx";

export const Home = () => {
  const { books: currentlyReading, loading: loadingCurrent } = useBooks({ status: "currently-reading" });
  const { books: completed, loading: loadingCompleted } = useBooks({ status: "completed", limit: 4 });

  const currentBook = currentlyReading[0];

  return (
    <div>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-bg-light overflow-hidden">
        <HeroIllustration className="absolute w-[480px] md:w-[560px] h-auto opacity-[0.07] pointer-events-none select-none" />

        <div className="relative z-10 text-center px-5 py-20 max-w-2xl mx-auto">
          <SectionLabel>trinidad & tobago</SectionLabel>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary mt-4 mb-6 leading-[1.02]">
            mt. hope<br />book club
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            turning pages. exploring worlds. a community of readers discovering one book at a time.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/discover"
              className="bg-accent text-white rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors"
            >
              discover our reads
            </Link>
            <Link
              to="/about"
              className="border border-text-primary text-text-primary rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-text-primary hover:text-bg-light transition-colors"
            >
              about us
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-40">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {loadingCurrent ? (
        <LoadingSpinner />
      ) : currentBook ? (
        <section className="bg-bg-light py-16">
          <div className="max-w-6xl mx-auto px-5">
            <SectionLabel>currently reading</SectionLabel>
            <Link
              to={`/discover/${currentBook.id}`}
              className="group block bg-bg-card rounded-2xl border border-border p-6 md:p-8 md:flex md:items-center md:gap-8 mt-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-28 md:w-36 shrink-0 mb-4 md:mb-0">
                <img
                  src={currentBook.coverImageUrl || "https://placehold.co/200x300/e5e2dd/1a2332?text=no+cover"}
                  alt={`cover of ${currentBook.title}`}
                  className="w-full rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                />
              </div>
              <div>
                <span className="inline-block bg-highlight text-white text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full mb-3">
                  reading now
                </span>
                <h2 className="font-display text-2xl text-text-primary mb-1 group-hover:text-accent transition-colors">
                  {currentBook.title}
                </h2>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-text-secondary mb-3">
                  {currentBook.author}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-lg">
                  {currentBook.summary}
                </p>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-bg-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between mb-10">
            <SectionLabel dark>recent reads</SectionLabel>
            <Link
              to="/discover"
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              see all &rarr;
            </Link>
          </div>

          {loadingCompleted ? (
            <LoadingSpinner />
          ) : completed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {completed.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  coverImageUrl={book.coverImageUrl}
                  ratingClub={book.ratingClub}
                  status={book.status}
                  variant="dark"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted-dark py-12">no completed books yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};
