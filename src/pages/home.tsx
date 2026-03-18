import { Link } from "react-router-dom";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

export const Home = () => {
  const { books: currentlyReading, loading: loadingCurrent } = useBooks({ status: "currently-reading" });
  const { books: completed, loading: loadingCompleted } = useBooks({ status: "completed", limit: 4 });

  const currentBook = currentlyReading[0];

  return (
    <div>
      <section className="bg-bg-light">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-[1.1]">
              mt. hope<br />book club
            </h1>
            <p className="text-lg text-text-secondary max-w-md mb-8 leading-relaxed">
              readers in trinidad & tobago discovering one book at a time.
            </p>
            <Link
              to="/discover"
              className="inline-block bg-accent text-white rounded-full px-8 py-3 font-medium text-sm uppercase tracking-[0.15em] hover:bg-accent-hover hover:scale-[1.02] transition-all"
            >
              discover our reads
            </Link>
          </div>

          {loadingCurrent ? (
            <LoadingSpinner />
          ) : currentBook ? (
            <Link to={`/discover/${currentBook.id}`} className="group relative flex justify-center">
              <div className="relative w-64 md:w-72">
                <img
                  src={currentBook.coverImageUrl || "https://placehold.co/300x450/e5e2dd/1a2332?text=no+cover"}
                  alt={`cover of ${currentBook.title}`}
                  className="w-full rounded-lg shadow-2xl rotate-3 group-hover:rotate-1 transition-transform duration-300"
                />
                <span className="absolute -bottom-3 -right-3 bg-highlight text-white text-xs uppercase tracking-[0.15em] font-medium px-4 py-2 rounded-full shadow-md">
                  reading now
                </span>
              </div>
            </Link>
          ) : null}
        </div>

        {currentBook && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-2">
                currently reading
              </p>
              <h2 className="font-display text-2xl text-text-primary mb-1">{currentBook.title}</h2>
              <p className="text-sm text-text-secondary mb-3">by {currentBook.author}</p>
              <p className="text-text-secondary leading-relaxed line-clamp-2">{currentBook.summary}</p>
            </div>
          </div>
        )}
      </section>

      <section className="bg-bg-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-text-muted-dark">
              recent reads
            </h2>
            <Link
              to="/discover"
              className="text-xs uppercase tracking-[0.15em] font-medium text-accent hover:text-accent-hover transition-colors"
            >
              see all &rarr;
            </Link>
          </div>

          {loadingCompleted ? (
            <LoadingSpinner />
          ) : completed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {completed.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  coverImageUrl={book.coverImageUrl}
                  ratingClub={book.ratingClub}
                  dateFinalDiscussion={book.dateFinalDiscussion}
                  status={book.status}
                  variant="dark"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted-dark">no completed books yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};
