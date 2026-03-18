type StarPickerProps = {
    value: number;
    onChange: (value: number) => void;
};

const StarIcon = ({ filled, size = 28 }: { filled: boolean; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={filled ? "var(--color-star)" : "var(--color-border)"}
            className="transition-colors duration-100"
        />
    </svg>
);

export const StarPicker = ({ value, onChange }: StarPickerProps) => (
    <div className="flex items-center gap-1">
        <div className="flex">
            {Array.from({ length: 10 }, (_, i) => {
                const starValue = (i + 1) * 0.5;
                const isLeft = i % 2 === 0;

                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onChange(starValue)}
                        className={`cursor-pointer hover:scale-110 transition-transform ${isLeft ? "w-3.5 overflow-hidden -mr-[2px]" : "w-3.5 overflow-hidden direction-rtl"}`}
                        style={isLeft ? {} : { direction: "rtl" }}
                        aria-label={`${starValue} stars`}
                    >
                        <StarIcon filled={value >= starValue} />
                    </button>
                );
            })}
        </div>
        <span className="ml-2 text-sm font-medium text-text-primary tabular-nums min-w-[2ch]">{value || "\u2014"}</span>
    </div>
);
