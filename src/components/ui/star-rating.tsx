type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
};

const Star = ({ fill, size = 14 }: { fill: "full" | "half" | "empty"; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
    <defs>
      <clipPath id="half-clip">
        <rect x="0" y="0" width="12" height="24" />
      </clipPath>
    </defs>
    {fill === "full" && (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-star)" />
    )}
    {fill === "half" && (
      <>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-border)" />
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-star)" clipPath="url(#half-clip)" />
      </>
    )}
    {fill === "empty" && (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--color-border)" />
    )}
  </svg>
);

export const StarRating = ({ rating, max = 5, size = 14 }: StarRatingProps) => {
  const stars = Array.from({ length: max }, (_, i) => {
    const fill = rating >= i + 1 ? "full" : rating >= i + 0.5 ? "half" : "empty";
    return <Star key={i} fill={fill} size={size} />;
  });

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {stars}
      <span className="ml-1.5 text-xs text-text-secondary tabular-nums">{rating}</span>
    </span>
  );
};
