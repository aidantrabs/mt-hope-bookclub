import { useCallback, useEffect, useRef, useState } from "react";

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
            if (index === active) {
                return;
            }
            setDirection("enter");
            requestAnimationFrame(() => {
                setActive(index);
                requestAnimationFrame(() => setDirection("active"));
            });
        },
        [active],
    );

    const prev = useCallback(() => {
        goTo((active - 1 + quotes.length) % quotes.length);
    }, [active, quotes.length, goTo]);

    const next = useCallback(() => {
        goTo((active + 1) % quotes.length);
    }, [active, quotes.length, goTo]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (!hovered.current) {
                next();
            }
        }, 6000);
        return () => clearInterval(timerRef.current);
    }, [next]);

    if (quotes.length === 0) {
        return null;
    }

    return (
        <div onMouseEnter={() => (hovered.current = true)} onMouseLeave={() => (hovered.current = false)}>
            <div className="relative">
                <blockquote className="glass-light rounded-2xl p-6 md:p-8">
                    <span
                        className="absolute top-3 left-5 text-5xl text-accent/25 font-bold leading-none select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>
                    <p
                        className={`text-base md:text-lg italic text-text-primary leading-relaxed pt-6 carousel-slide ${
                            direction === "active" ? "carousel-slide-active" : "carousel-slide-enter"
                        }`}
                    >
                        {quotes[active]}
                    </p>
                </blockquote>
            </div>

            {quotes.length > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="previous quote"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2">
                        {quotes.map((_, i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`go to quote ${i + 1}`}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i === active ? "bg-accent w-6" : "bg-border hover:bg-text-secondary"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={next}
                        aria-label="next quote"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
