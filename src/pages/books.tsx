import { useState } from "react";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

export const Books = () => {
  const { books, loading, error } = useBooks();
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  const genres = [...new Set(books.map((b) => b.genre))];
  const filtered = genreFilter ? books.filter((b) => b.genre === genreFilter) : books;

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-accent">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-bg-light py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
            discover
          </h1>

          {genres.length > 1 && (
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mb-2">
              <button
                onClick={() => setGenreFilter(null)}
                className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] font-medium transition-colors whitespace-nowrap ${
                  !genreFilter
                    ? "bg-accent text-white"
                    : "border border-border text-text-secondary hover:border-accent hover:text-accent"
                }`}
              >
                all
              </button>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] font-medium transition-colors whitespace-nowrap ${
                    genreFilter === genre
                      ? "bg-accent text-white"
                      : "border border-border text-text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-bg-dark py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((book) => (
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
            <p className="text-center text-text-muted-dark py-16">no books found.</p>
          )}
        </div>
      </section>
    </div>
  );
};
