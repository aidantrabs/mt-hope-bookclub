type QuoteBlockProps = {
  quote: string;
};

export const QuoteBlock = ({ quote }: QuoteBlockProps) => (
  <blockquote className="relative bg-bg-card rounded-lg p-6 border-l-4 border-accent shadow-sm">
    <span className="absolute -top-2 left-4 text-5xl text-accent-soft font-display leading-none select-none" aria-hidden="true">
      &ldquo;
    </span>
    <p className="font-display text-xl md:text-2xl italic text-text-primary leading-relaxed pt-4">
      {quote}
    </p>
  </blockquote>
);
