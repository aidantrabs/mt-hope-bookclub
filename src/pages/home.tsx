import { Link } from "react-router-dom";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { SectionLabel } from "@/components/ui/section-label.tsx";

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

          {loadingCurrent ? (
            <LoadingSpinner />
          ) : currentBook ? (
            <Link to={`/discover/${currentBook.id}`} className="group flex justify-center">
              <div className="relative w-56 md:w-64">
                <img
                  src={currentBook.coverImageUrl || "https://placehold.co/300x450/e5e2dd/1a2332?text=no+cover"}
                  alt={`cover of ${currentBook.title}`}
                  className="w-full rounded-2xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-out"
                />
                <span className="absolute -bottom-3 -right-3 bg-highlight text-white text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-2 rounded-full shadow-lg">
                  reading now
                </span>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      {currentBook && (
        <section className="bg-bg-light pb-16">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-lg border-t border-border pt-8">
              <SectionLabel>currently reading</SectionLabel>
              <h2 className="font-display text-2xl text-text-primary mt-2 mb-1">{currentBook.title}</h2>
              <p className="text-sm text-text-secondary mb-3">{currentBook.author}</p>
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{currentBook.summary}</p>
            </div>
          </div>
        </section>
      )}

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
