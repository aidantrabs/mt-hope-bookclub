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
      <section className="bg-bg-light py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>trinidad & tobago</SectionLabel>
            <h1 className="font-display text-5xl md:text-7xl text-text-primary mt-3 mb-6 leading-[1.05]">
              mt. hope<br />book club
            </h1>
            <p className="text-base text-text-secondary max-w-sm mb-10 leading-relaxed">
              a community of readers discovering one book at a time. we read, we discuss, we disagree — that's the best part.
            </p>
            <Link
              to="/discover"
              className="inline-block bg-accent text-white rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors"
            >
              discover our reads
            </Link>
          </div>

          <div className="flex justify-center">
            <HeroIllustration className="w-72 md:w-80 h-auto" />
          </div>
        </div>
      </section>

      {loadingCurrent ? (
        <LoadingSpinner />
      ) : currentBook ? (
        <section className="bg-bg-light pb-20">
          <div className="max-w-6xl mx-auto px-5">
            <Link
              to={`/discover/${currentBook.id}`}
              className="group block bg-bg-card rounded-2xl border border-border p-6 md:p-8 md:flex md:items-center md:gap-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-28 md:w-36 shrink-0 mb-4 md:mb-0">
                <img
                  src={currentBook.coverImageUrl || "https://placehold.co/200x300/e5e2dd/1a2332?text=no+cover"}
                  alt={`cover of ${currentBook.title}`}
                  className="w-full rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-highlight text-white text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full">
                    reading now
                  </span>
                </div>
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
