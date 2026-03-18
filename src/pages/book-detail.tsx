import { useParams, Link } from "react-router-dom";
import { useBook } from "@hooks/use-book.ts";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { QuoteCarousel } from "@/components/ui/quote-carousel.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Pill } from "@/components/ui/pill.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { BookCover } from "@/components/ui/book-cover.tsx";

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-TT", { month: "short", day: "numeric", year: "numeric" });

export const BookDetail = () => {
  const { id } = useParams();
  const { book, loading, error } = useBook(id);

  if (loading) return <LoadingSpinner />;

  if (error || !book) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-16 text-center">
        <p className="text-accent mb-4">{error ?? "book not found"}</p>
        <Link to="/discover" className="text-sm text-text-secondary hover:text-accent transition-colors">
          &larr; back to discover
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="gradient-mesh-light noise-overlay py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 relative z-[2]">
          <nav className="text-xs uppercase tracking-widest font-medium text-text-secondary mb-10 flex items-center gap-2 hero-fade-in">
            <Link to="/" className="hover:text-text-primary transition-colors">home</Link>
            <span className="text-border">/</span>
            <Link to="/discover" className="hover:text-text-primary transition-colors">discover</Link>
            <span className="text-border">/</span>
            <span className="text-text-primary truncate">{book.title.toLowerCase()}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 mb-16">
            <BookCover
              src={book.coverImageUrl}
              alt={`cover of ${book.title}`}
              className="aspect-[2/3] rounded-2xl shadow-lg hero-fade-in"
            />

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-4 hero-fade-in-delay-1">
                <Pill>{book.genre}</Pill>
                {book.status === "currently-reading" && (
                  <span className="rounded-full px-3 py-1 text-xs uppercase tracking-wider font-medium bg-highlight text-white">
                    reading now
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 leading-tight hero-fade-in-delay-1">
                {book.title}
              </h1>
              <p className="text-xs uppercase tracking-widest font-medium text-text-secondary mb-1 hero-fade-in-delay-2">
                {book.author}
              </p>
              <p className="text-sm text-text-secondary mb-6 hero-fade-in-delay-2">
                {formatDate(book.dateStarted)} &mdash; {formatDate(book.dateFinalDiscussion)}
              </p>
              <p className="text-text-primary leading-relaxed hero-fade-in-delay-3">{book.summary}</p>
            </div>
          </div>

          <Animate>
            <div className="grid grid-cols-2 gap-5 mb-16">
              <div className="glass-light rounded-2xl p-6 md:p-8 text-center">
                <SectionLabel>our rating</SectionLabel>
                <div className="mt-3">
                  <StarRating rating={book.ratingClub} size={18} />
                </div>
              </div>
              <div className="glass-light rounded-2xl p-6 md:p-8 text-center">
                <SectionLabel>goodreads</SectionLabel>
                <div className="mt-3">
                  <StarRating rating={book.ratingGoodreads} size={18} />
                </div>
              </div>
            </div>
          </Animate>

          {book.favoriteQuotes.length > 0 && (
            <Animate>
              <div className="mb-16">
                <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
                  favourite quotes
                </h2>
                <QuoteCarousel quotes={book.favoriteQuotes} />
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-16 md:pb-24">
        <WaveDivider fill="var(--color-bg-light)" flip className="h-12 md:h-20" />
        <AmbientDots />
        <div className="max-w-4xl mx-auto px-5 relative z-[2] pt-10 md:pt-16">
          {book.discussionHighlights.length > 0 && (
            <Animate className="mb-14">
              <SectionLabel dark>discussion highlights</SectionLabel>
              <ul className="mt-5 space-y-3">
                {book.discussionHighlights.map((highlight, i) => (
                  <Animate key={i} as="li" delay={i * 80}
                    className="bg-bg-card-dark rounded-xl p-5 border-l-3 border-accent text-text-on-dark leading-relaxed text-sm"
                  >
                    {highlight}
                  </Animate>
                ))}
              </ul>
            </Animate>
          )}

          <Animate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              <div className="bg-bg-card-dark rounded-2xl p-6 border border-border-dark">
                <SectionLabel dark>fun fact</SectionLabel>
                <p className="text-text-on-dark leading-relaxed mt-3 text-sm">{book.funFact}</p>
              </div>
              <div className="bg-bg-card-dark rounded-2xl p-6 border border-border-dark flex flex-col items-center justify-center text-center">
                <SectionLabel dark>would we recommend it?</SectionLabel>
                <span className="text-5xl my-4">
                  {book.wouldRecommend ? "\uD83D\uDC4D" : "\uD83D\uDC4E"}
                </span>
                <span className={`text-sm font-semibold rounded-full px-5 py-1.5 ${
                  book.wouldRecommend
                    ? "bg-recommend-yes/15 text-highlight-soft"
                    : "bg-recommend-no/15 text-accent-soft"
                }`}>
                  {book.wouldRecommend ? "yes, read this!" : "not our favorite"}
                </span>
              </div>
            </div>
          </Animate>

          {book.nextRead && (
            <Animate>
              <div className="text-center pt-8 border-t border-border-dark">
                <SectionLabel dark>up next</SectionLabel>
                <p className="text-xl font-semibold text-text-on-dark mt-2">{book.nextRead}</p>
              </div>
            </Animate>
          )}
        </div>
      </section>
    </div>
  );
};
