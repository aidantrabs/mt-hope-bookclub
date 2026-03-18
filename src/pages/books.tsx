import { useState, useEffect } from "react";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { useSignalReady } from "@hooks/use-initial-load.ts";
import { SectionLabel } from "@/components/ui/section-label.tsx";

const genres = [
  "fantasy",
  "thriller",
  "romance",
  "mystery",
  "sci-fi",
  "contemporary",
  "horror",
  "non-fiction",
];

export const Books = () => {
  const { books, loading, error } = useBooks();
  const signalReady = useSignalReady();

  useEffect(() => {
    if (!loading) signalReady();
  }, [loading, signalReady]);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = genreFilter
    ? books.filter((b) => b.genre.toLowerCase().includes(genreFilter))
    : books;

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
      <section className="gradient-mesh-light noise-overlay py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-5 relative z-[2]">
          <div className="hero-fade-in mb-8 md:mb-12">
            <SectionLabel>our library</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mt-3 leading-tight">
              every book we've <em className="italic text-accent">read.</em>
            </h1>
            <p className="text-text-secondary leading-relaxed md:text-lg mt-4 max-w-lg">
              rated, discussed, and documented — from first page to final
              verdict. pick a genre or browse them all.
            </p>
          </div>

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
                  {genreFilter}
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
        </div>
      </section>

      <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-16 md:pb-24">
        <WaveDivider fill="var(--color-bg-light)" flip className="h-12 md:h-20" />
        <AmbientDots />
        <div className="max-w-6xl mx-auto px-5 relative z-[2] pt-10 md:pt-16">
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
            <p className="text-center text-text-muted-dark py-16">no books match this filter.</p>
          )}
        </div>
      </section>
    </div>
  );
};
