import { useBook } from "@hooks/use-book.ts";
import { useSignalReady } from "@hooks/use-initial-load.ts";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { BookCover } from "@/components/ui/book-cover.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { Pill } from "@/components/ui/pill.tsx";
import { QuoteCarousel } from "@/components/ui/quote-carousel.tsx";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";

const formatDate = (d: Date) => d.toLocaleDateString("en-TT", { month: "short", day: "numeric", year: "numeric" });

export const BookDetail = () => {
    const { id } = useParams();
    const { book, loading, error } = useBook(id);
    const signalReady = useSignalReady();

    useEffect(() => {
        if (!loading) {
            signalReady();
        }
    }, [loading, signalReady]);

    if (loading) {
        return <LoadingSpinner />;
    }

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
            <section className="gradient-mesh-light noise-overlay pt-12 md:pt-20 pb-4 md:pb-6">
                <div className="max-w-4xl mx-auto px-5 relative z-[2]">
                    <nav className="text-xs uppercase tracking-widest font-medium text-text-secondary mb-10 flex items-center gap-2 hero-fade-in">
                        <Link to="/" className="hover:text-text-primary transition-colors">
                            home
                        </Link>
                        <span className="text-text-secondary">/</span>
                        <Link to="/discover" className="hover:text-text-primary transition-colors">
                            discover
                        </Link>
                        <span className="text-text-secondary">/</span>
                        <span className="text-text-primary truncate">{book.title.toLowerCase()}</span>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 mb-16 md:mb-20">
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

                            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-3 leading-tight hero-fade-in-delay-1">
                                {book.title}
                            </h1>
                            <p className="text-xs uppercase tracking-widest font-medium text-text-secondary mb-1 hero-fade-in-delay-2">
                                {book.author}
                            </p>
                            <p className="text-sm text-text-secondary mb-6 hero-fade-in-delay-2">
                                {formatDate(book.dateStarted)} - {formatDate(book.dateFinalDiscussion)}
                            </p>
                            <p className="text-text-primary leading-relaxed hero-fade-in-delay-3">{book.summary}</p>
                        </div>
                    </div>

                    <Animate>
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-16 md:mb-20">
                            <div>
                                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                                    our rating
                                </span>
                                <div className="mt-1.5">
                                    <StarRating rating={book.ratingClub} size={18} />
                                </div>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                                    goodreads
                                </span>
                                <div className="mt-1.5">
                                    <StarRating rating={book.ratingGoodreads} size={18} />
                                </div>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                                    recommend
                                </span>
                                <p className="text-text-primary font-semibold mt-1.5">
                                    {book.wouldRecommend ? "yes, read this!" : "not our favorite"}
                                </p>
                            </div>
                        </div>
                    </Animate>

                    {book.favoriteQuotes.length > 0 && (
                        <Animate>
                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
                                    favourite <em className="italic text-accent">quotes</em>
                                </h2>
                                <QuoteCarousel quotes={book.favoriteQuotes} />
                            </div>
                        </Animate>
                    )}
                </div>
            </section>

            <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-16 md:pb-24">
                <WaveDivider fill="var(--color-bg-light)" flip className="h-8 md:h-14" />
                <AmbientDots />
                <div className="max-w-4xl mx-auto px-5 relative z-[2] pt-6 md:pt-10">
                    {book.discussionHighlights.length > 0 && (
                        <Animate className="mb-14">
                            <h2 className="text-2xl md:text-3xl font-bold text-text-on-dark mb-6">
                                discussion <em className="italic text-accent">highlights</em>
                            </h2>
                            <ul className="mt-5 space-y-3">
                                {book.discussionHighlights.map((highlight, i) => (
                                    <Animate
                                        key={i}
                                        as="li"
                                        delay={i * 80}
                                        className="bg-bg-card-dark/80 rounded-xl p-5 border-l-3 border-accent text-text-on-dark leading-relaxed"
                                    >
                                        {highlight}
                                    </Animate>
                                ))}
                            </ul>
                        </Animate>
                    )}

                    <Animate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                            <div>
                                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                                    fun fact
                                </span>
                                <p className="text-text-on-dark leading-relaxed mt-2">{book.funFact}</p>
                            </div>
                            {book.nextRead && (
                                <div>
                                    <span className="text-xs uppercase tracking-widest font-medium text-accent">
                                        up next
                                    </span>
                                    <p className="text-xl font-bold text-text-on-dark mt-2">{book.nextRead}</p>
                                </div>
                            )}
                        </div>
                    </Animate>
                </div>
            </section>
        </div>
    );
};
