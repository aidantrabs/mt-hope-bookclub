import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { SectionLabel } from "@/components/ui/section-label.tsx";
import { HeroIllustration } from "@/components/ui/hero-illustration.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { StatCounter } from "@/components/ui/stat-counter.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";

export const Home = () => {
  const { books: currentlyReading, loading: loadingCurrent } = useBooks({ status: "currently-reading" });
  const { books: completed, loading: loadingCompleted } = useBooks({ status: "completed", limit: 4 });
  const { books: allCompleted } = useBooks({ status: "completed" });

  const currentBook = currentlyReading[0];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (heroRef.current) {
          heroRef.current.style.setProperty("--scroll-y", String(window.scrollY));
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const avgRating =
    allCompleted.length > 0
      ? allCompleted.reduce((sum, b) => sum + b.ratingClub, 0) / allCompleted.length
      : 0;

  const totalQuotes = allCompleted.reduce((sum, b) => sum + (b.favoriteQuotes?.length ?? 0), 0);

  return (
    <div>
      <section
        ref={heroRef}
        className="parallax-hero gradient-mesh-light noise-overlay relative overflow-hidden pb-0 min-h-[calc(100vh-4rem)] flex flex-col"
      >
        <div className="max-w-6xl mx-auto px-5 pt-4 md:pt-6 pb-36 md:pb-44 flex-1 flex flex-col justify-start relative z-[2]">
          <div className="flex flex-col items-center text-center">
            <div className="hero-fade-in parallax-layer-slow">
              <HeroIllustration className="w-72 md:w-96 h-auto mb-4" />
            </div>

            <div className="hero-fade-in-delay-1 parallax-layer-fast">
              <SectionLabel>trinidad & tobago · est. 2025</SectionLabel>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mt-3 mb-4 leading-tight">
                mt. hope book club
              </h1>
            </div>

            <p className="text-base text-text-secondary max-w-md mb-6 leading-relaxed hero-fade-in-delay-2 parallax-layer-fast">
              turning pages. exploring worlds. a community of readers discovering one book at a time.
            </p>

            <div className="flex items-center gap-3 hero-fade-in-delay-3">
              <Link
                to="/discover"
                className="bg-accent text-white rounded-full px-7 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors"
              >
                discover our reads
              </Link>
              <Link
                to="/about"
                className="border border-text-primary text-text-primary rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-text-primary hover:text-bg-light transition-colors"
              >
                about us
              </Link>
            </div>
          </div>
        </div>

      </section>

      <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-14 md:pb-20">
        <WaveDivider fill="var(--color-bg-light)" flip className="h-28 md:h-40" />
        <AmbientDots />
        <div className="max-w-6xl mx-auto px-5 relative z-[2]">
          {allCompleted.length > 0 && (
            <Animate className="mb-14">
              <div className="max-w-4xl mx-auto py-8 md:py-12">
                <div className="grid grid-cols-3 gap-6">
                  <StatCounter value={allCompleted.length} label="books read" />
                  <StatCounter value={avgRating} label="avg club rating" suffix="★" decimals={1} />
                  <StatCounter value={totalQuotes} label="favourite quotes" />
                </div>
              </div>
            </Animate>
          )}
          {loadingCurrent ? (
            <LoadingSpinner />
          ) : currentBook ? (
            <Animate className="mb-14">
              <SectionLabel dark>currently reading</SectionLabel>
              <Link
                to={`/discover/${currentBook.id}`}
                className="glow-border group block bg-bg-card-dark/60 backdrop-blur-sm rounded-2xl p-5 md:p-6 md:flex md:items-center md:gap-6 mt-4 hover:bg-bg-card-dark/80 transition-colors duration-300"
              >
                <div className="w-20 md:w-28 shrink-0 mb-3 md:mb-0">
                  <img
                    src={currentBook.coverImageUrl || "https://placehold.co/200x300/e5e2dd/1a2332?text=no+cover"}
                    alt={`cover of ${currentBook.title}`}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <span className="inline-block bg-highlight text-white text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full mb-2">
                    reading now
                  </span>
                  <h2 className="text-xl font-semibold text-text-on-dark mb-0.5 group-hover:text-accent transition-colors">
                    {currentBook.title}
                  </h2>
                  <p className="text-xs uppercase tracking-widest font-medium text-text-muted-dark mb-2">
                    {currentBook.author}
                  </p>
                  <p className="text-sm text-text-muted-dark leading-relaxed line-clamp-2 max-w-lg">
                    {currentBook.summary}
                  </p>
                </div>
              </Link>
            </Animate>
          ) : null}

          <Animate>
            <div className="flex items-center justify-between mb-8">
              <SectionLabel dark>recent reads</SectionLabel>
              <Link
                to="/discover"
                className="text-xs uppercase tracking-widest font-medium text-accent hover:text-accent-hover transition-colors"
              >
                see all &rarr;
              </Link>
            </div>
          </Animate>

          {loadingCompleted ? (
            <LoadingSpinner />
          ) : completed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {completed.map((book, i) => (
                <Animate key={book.id} delay={i * 100}>
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
            <p className="text-center text-text-muted-dark py-12">no completed books yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};
