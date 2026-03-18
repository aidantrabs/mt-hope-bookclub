import { useState, useEffect, useRef, useCallback } from "react";

type QuoteCarouselProps = {
  quotes: string[];
};

export const QuoteCarousel = ({ quotes }: QuoteCarouselProps) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"enter" | "active">("active");
  const hovered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const goTo = useCallback(
    (index: number) => {
      if (index === active) return;
      setDirection("enter");
      requestAnimationFrame(() => {
        setActive(index);
        requestAnimationFrame(() => setDirection("active"));
      });
    },
    [active],
  );

  const next = useCallback(() => {
    goTo((active + 1) % quotes.length);
  }, [active, quotes.length, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!hovered.current) next();
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  if (quotes.length === 0) return null;

  return (
    <div
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <div className="relative min-h-[120px]">
        <blockquote className="glass-light rounded-2xl p-6 md:p-8">
          <span
            className="absolute top-3 left-5 text-5xl text-accent/15 font-bold leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p
            className={`text-base md:text-lg italic text-text-primary leading-relaxed pt-6 carousel-slide ${
              direction === "active"
                ? "carousel-slide-active"
                : "carousel-slide-enter"
            }`}
          >
            {quotes[active]}
          </p>
        </blockquote>
      </div>

      {quotes.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`go to quote ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "bg-accent w-6"
                  : "bg-border hover:bg-text-secondary"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
