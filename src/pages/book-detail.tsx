import { useParams, Link } from "react-router-dom";
import { useBook } from "@hooks/use-book.ts";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { QuoteBlock } from "@/components/ui/quote-block.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

const fallbackCover = "https://placehold.co/300x450/e8dcc8/3d2c2e?text=no+cover";

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-TT", { month: "long", day: "numeric", year: "numeric" });

export const BookDetail = () => {
  const { id } = useParams();
  const { book, loading, error } = useBook(id);

  if (loading) return <LoadingSpinner />;

  if (error || !book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-terracotta mb-4">{error ?? "book not found"}</p>
        <Link to="/books" className="text-sm text-brown-light hover:text-terracotta transition-colors">
          &larr; back to books
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/books"
        className="inline-flex items-center text-sm text-brown-light hover:text-terracotta transition-colors mb-8"
      >
        &larr; back to books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 mb-12">
        <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-md bg-sand">
          <img
            src={book.coverImageUrl || fallbackCover}
            alt={`cover of ${book.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackCover;
            }}
          />
        </div>

        <div>
          {book.status === "currently-reading" && (
            <span className="inline-block text-xs font-medium text-white bg-green px-3 py-1 rounded-full mb-3">
              currently reading
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown mb-1">
            {book.title}
          </h1>
          <p className="text-lg text-brown-light mb-3">by {book.author}</p>
          <span className="inline-block text-xs font-medium text-green bg-green/10 px-3 py-1 rounded-full mb-4">
            {book.genre}
          </span>
          <div className="text-sm text-brown-light mb-6">
            <p>{formatDate(book.dateStarted)} &mdash; {formatDate(book.dateFinalDiscussion)}</p>
          </div>
          <p className="text-brown leading-relaxed">{book.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <h3 className="text-xs font-medium uppercase tracking-wider text-brown-muted mb-2">our rating</h3>
          <div className="text-2xl">
            <StarRating rating={book.ratingClub} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <h3 className="text-xs font-medium uppercase tracking-wider text-brown-muted mb-2">goodreads</h3>
          <div className="text-2xl">
            <StarRating rating={book.ratingGoodreads} />
          </div>
        </div>
      </div>

      {book.favoriteQuotes.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-brown mb-6">favourite quotes</h2>
          <div className="space-y-4">
            {book.favoriteQuotes.map((quote, i) => (
              <QuoteBlock key={i} quote={quote} />
            ))}
          </div>
        </section>
      )}

      {book.discussionHighlights.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-brown mb-6">discussion highlights</h2>
          <ul className="space-y-3">
            {book.discussionHighlights.map((highlight, i) => (
              <li
                key={i}
                className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green text-brown"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-warm-white rounded-xl p-6 border border-sand">
          <h3 className="text-xs font-medium uppercase tracking-wider text-brown-muted mb-2">fun fact</h3>
          <p className="text-brown">{book.funFact}</p>
        </div>
        <div className="bg-warm-white rounded-xl p-6 border border-sand flex flex-col items-center justify-center">
          <h3 className="text-xs font-medium uppercase tracking-wider text-brown-muted mb-3">
            would we recommend it?
          </h3>
          <span className={`text-4xl ${book.wouldRecommend ? "text-green" : "text-terracotta"}`}>
            {book.wouldRecommend ? "\uD83D\uDC4D" : "\uD83D\uDC4E"}
          </span>
          <span className="text-sm font-medium text-brown mt-2">
            {book.wouldRecommend ? "yes!" : "not really"}
          </span>
        </div>
      </div>

      {book.nextRead && (
        <div className="text-center py-6 border-t border-sand">
          <p className="text-sm text-brown-muted">next read</p>
          <p className="font-serif text-lg font-bold text-brown">{book.nextRead}</p>
        </div>
      )}
    </article>
  );
};
