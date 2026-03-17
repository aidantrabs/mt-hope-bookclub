type StarRatingProps = {
  rating: number;
  max?: number;
};

export const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = rating >= i + 1;
    const half = !filled && rating >= i + 0.5;
    return (
      <span key={i} className="text-gold">
        {filled ? "\u2605" : half ? "\u00BD" : "\u2606"}
      </span>
    );
  });

  return (
    <span className="inline-flex items-center gap-0.5 text-sm" aria-label={`${rating} out of ${max} stars`}>
      {stars}
      <span className="ml-1 text-brown-light text-xs">({rating})</span>
    </span>
  );
};
