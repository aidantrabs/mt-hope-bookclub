import { useParams, Link } from "react-router-dom";
import { useBook } from "@hooks/use-book.ts";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { QuoteBlock } from "@/components/ui/quote-block.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

const fallbackCover = "https://placehold.co/300x450/e5e2dd/1a2332?text=no+cover";

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-TT", { month: "long", day: "numeric", year: "numeric" });

export const BookDetail = () => {
  const { id } = useParams();
  const { book, loading, error } = useBook(id);

  if (loading) return <LoadingSpinner />;

  if (error || !book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-accent mb-4">{error ?? "book not found"}</p>
        <Link to="/discover" className="text-sm text-text-secondary hover:text-accent transition-colors">
          &larr; back to discover
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-bg-light py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-8">
            <Link to="/" className="hover:text-accent transition-colors">home</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/discover" className="hover:text-accent transition-colors">discover</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-text-primary">{book.title.toLowerCase()}</span>
          </div>

          <article className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 mb-16">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
              <img
                src={book.coverImageUrl || fallbackCover}
                alt={`cover of ${book.title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackCover;
                }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.1em] font-medium bg-highlight-soft text-highlight">
                  {book.genre}
                </span>
                {book.status === "currently-reading" && (
                  <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.1em] font-medium bg-highlight text-white">
                    reading now
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {book.title}
              </h1>
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-4">
                {book.author}
              </p>
              <p className="text-sm text-text-secondary mb-6">
                {formatDate(book.dateStarted)} &mdash; {formatDate(book.dateFinalDiscussion)}
              </p>
              <p className="text-text-primary leading-relaxed">{book.summary}</p>
            </div>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-3">our rating</h3>
              <div className="text-2xl">
                <StarRating rating={book.ratingClub} />
              </div>
            </div>
            <div className="bg-bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-3">goodreads</h3>
              <div className="text-2xl">
                <StarRating rating={book.ratingGoodreads} />
              </div>
            </div>
          </div>

          {book.favoriteQuotes.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-8">
                favourite quotes
              </h2>
              <div className="space-y-6">
                {book.favoriteQuotes.map((quote, i) => (
                  <QuoteBlock key={i} quote={quote} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          {book.discussionHighlights.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-text-muted-dark mb-6">
                discussion highlights
              </h2>
              <ul className="space-y-3">
                {book.discussionHighlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="bg-bg-card-dark rounded-lg p-5 border-l-4 border-accent text-text-on-dark leading-relaxed"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-bg-card-dark rounded-xl p-6 border border-border-dark">
              <span className="text-xs uppercase tracking-[0.15em] font-medium text-text-muted-dark block mb-2">
                fun fact
              </span>
              <p className="text-text-on-dark leading-relaxed">{book.funFact}</p>
            </div>
            <div className="bg-bg-card-dark rounded-xl p-6 border border-border-dark flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-[0.15em] font-medium text-text-muted-dark block mb-4">
                would we recommend it?
              </span>
              <span className="text-5xl mb-2">
                {book.wouldRecommend ? "\uD83D\uDC4D" : "\uD83D\uDC4E"}
              </span>
              <span className={`text-sm font-medium rounded-full px-4 py-1.5 ${
                book.wouldRecommend
                  ? "bg-recommend-yes/20 text-highlight-soft"
                  : "bg-recommend-no/20 text-accent-soft"
              }`}>
                {book.wouldRecommend ? "yes, read this!" : "not our favorite"}
              </span>
            </div>
          </div>

          {book.nextRead && (
            <div className="text-center pt-6 border-t border-border-dark">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-muted-dark mb-1">up next</p>
              <p className="font-display text-xl text-text-on-dark">{book.nextRead}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
