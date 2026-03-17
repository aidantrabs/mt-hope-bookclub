type StarPickerProps = {
  value: number;
  onChange: (value: number) => void;
};

export const StarPicker = ({ value, onChange }: StarPickerProps) => {
  const stars = Array.from({ length: 10 }, (_, i) => {
    const starValue = (i + 1) * 0.5;
    const isHalf = i % 2 === 0;
    const filled = value >= starValue;

    return (
      <button
        key={i}
        type="button"
        onClick={() => onChange(starValue)}
        className={`text-2xl transition-colors cursor-pointer ${
          filled ? "text-gold" : "text-sand"
        } ${isHalf ? "-mr-1.5" : "mr-1"}`}
        aria-label={`${starValue} stars`}
      >
        {isHalf ? (
          <span className="inline-block w-3 overflow-hidden">{"\u2605"}</span>
        ) : (
          <span className="inline-block">{"\u2605"}</span>
        )}
      </button>
    );
  });

  return (
    <div className="flex items-center">
      <div className="flex items-center">{stars}</div>
      <span className="ml-3 text-sm font-medium text-brown">{value || "\u2014"}</span>
    </div>
  );
};
