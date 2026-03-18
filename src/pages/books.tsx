import { useState } from "react";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";

export const Books = () => {
  const { books, loading, error } = useBooks();
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const genres = [...new Set(books.map((b) => b.genre))];
  const filtered = genreFilter ? books.filter((b) => b.genre === genreFilter) : books;

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-16 text-center">
        <p className="text-accent">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-bg-light py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 hero-fade-in">
            discover
          </h1>

          {genres.length > 1 && (
            <div className="hero-fade-in-delay-1">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-text-secondary mb-3"
              >
                <span>filter by genre</span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {genreFilter && (
                  <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-full normal-case tracking-normal">
                    {genreFilter.split("/")[0]!.trim().toLowerCase()}
                  </span>
                )}
              </button>

              <div className={`flex-wrap gap-2 ${filtersOpen ? "flex" : "hidden md:flex"}`}>
                <button
                  onClick={() => setGenreFilter(null)}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                    !genreFilter
                      ? "bg-text-primary text-bg-light"
                      : "border border-border text-text-secondary hover:text-text-primary hover:border-text-primary"
                  }`}
                >
                  all
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => { setGenreFilter(genre); setFiltersOpen(false); }}
                    className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                      genreFilter === genre
                        ? "bg-text-primary text-bg-light"
                        : "border border-border text-text-secondary hover:text-text-primary hover:border-text-primary"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <WaveDivider className="h-12 md:h-20" />
      <section className="bg-bg-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((book, i) => (
                <Animate key={book.id} delay={i * 80}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    coverImageUrl={book.coverImageUrl}
                    ratingClub={book.ratingClub}
                    status={book.status}
                    variant="dark"
                  />
                </Animate>
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
