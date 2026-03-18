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
      <section className="relative bg-bg-light overflow-hidden pb-0 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="max-w-6xl mx-auto px-5 pt-4 md:pt-6 pb-36 md:pb-44 flex-1 flex flex-col justify-start">
          <div className="flex flex-col items-center text-center">
            <HeroIllustration className="w-72 md:w-96 h-auto mb-4" />

            <SectionLabel>trinidad & tobago · est. 2025</SectionLabel>
            <h1 className="font-display text-4xl md:text-6xl text-text-primary mt-3 mb-4 leading-[1.08]">
              mt. hope book club
            </h1>
            <p className="text-base text-text-secondary max-w-md mb-6 leading-relaxed">
              turning pages. exploring worlds. a community of readers discovering one book at a time.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/discover"
                className="bg-accent text-white rounded-full px-7 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors"
              >
                discover our reads
              </Link>
              <Link
                to="/about"
                className="border border-text-primary text-text-primary rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-text-primary hover:text-bg-light transition-colors"
              >
                about us
              </Link>
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-28 md:h-40"
          aria-hidden="true"
        >
          <path
            d="M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
            fill="var(--color-bg-dark)"
          />
        </svg>
      </section>

      <section className="bg-bg-dark pt-6 md:pt-8 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-5">
          {loadingCurrent ? (
            <LoadingSpinner />
          ) : currentBook ? (
            <div className="mb-14">
              <SectionLabel dark>currently reading</SectionLabel>
              <Link
                to={`/discover/${currentBook.id}`}
                className="group block bg-bg-card-dark rounded-2xl border border-border-dark p-5 md:p-6 md:flex md:items-center md:gap-6 mt-4 hover:bg-bg-card-dark/80 transition-colors duration-300"
              >
                <div className="w-20 md:w-28 shrink-0 mb-3 md:mb-0">
                  <img
                    src={currentBook.coverImageUrl || "https://placehold.co/200x300/e5e2dd/1a2332?text=no+cover"}
                    alt={`cover of ${currentBook.title}`}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <span className="inline-block bg-highlight text-white text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full mb-2">
                    reading now
                  </span>
                  <h2 className="font-display text-xl text-text-on-dark mb-0.5 group-hover:text-accent transition-colors">
                    {currentBook.title}
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-text-muted-dark mb-2">
                    {currentBook.author}
                  </p>
                  <p className="text-sm text-text-muted-dark leading-relaxed line-clamp-2 max-w-lg">
                    {currentBook.summary}
                  </p>
                </div>
              </Link>
            </div>
          ) : null}

          <div className="flex items-center justify-between mb-8">
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
