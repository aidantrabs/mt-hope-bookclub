type QuoteBlockProps = {
  quote: string;
};

export const QuoteBlock = ({ quote }: QuoteBlockProps) => (
  <blockquote className="relative bg-bg-card rounded-2xl p-6 md:p-8 border border-border">
    <span className="absolute top-3 left-5 text-5xl text-accent/15 font-bold leading-none select-none pointer-events-none" aria-hidden="true">
      &ldquo;
    </span>
    <p className="text-base md:text-lg italic text-text-primary leading-relaxed pt-6">
      {quote}
    </p>
  </blockquote>
);
