type QuoteBlockProps = {
  quote: string;
};

export const QuoteBlock = ({ quote }: QuoteBlockProps) => (
  <blockquote className="bg-white rounded-lg p-5 border-l-4 border-gold shadow-sm">
    <p className="text-brown italic leading-relaxed">{quote}</p>
  </blockquote>
);
