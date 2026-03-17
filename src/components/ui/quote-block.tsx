type QuoteBlockProps = {
  quote: string;
};

export const QuoteBlock = ({ quote }: QuoteBlockProps) => (
  <blockquote className="bg-white rounded-lg p-5 border-l-4 border-[#d4a853] shadow-sm">
    <p className="text-[#3d2c2e] italic leading-relaxed">{quote}</p>
  </blockquote>
);
