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
        <p className="text-terracotta">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown mb-2">
        our books
      </h1>
      <p className="text-brown-light mb-8">
        every book we've read, discussed, and debated.
      </p>

      {genres.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setGenreFilter(null)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              !genreFilter
                ? "bg-brown text-white"
                : "bg-white text-brown-light border border-sand hover:border-terracotta"
            }`}
          >
            all
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setGenreFilter(genre)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                genreFilter === genre
                  ? "bg-brown text-white"
                  : "bg-white text-brown-light border border-sand hover:border-terracotta"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

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
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-brown-light py-16">no books found.</p>
      )}
    </div>
  );
};
