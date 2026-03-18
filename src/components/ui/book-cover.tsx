import { useCallback, useState } from "react";

type BookCoverProps = {
    src?: string;
    alt: string;
    className?: string;
};

const BookIcon = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-border/30">
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="text-text-secondary/40"
            aria-hidden="true"
        >
            <path
                d="M8 6C8 4.89543 8.89543 4 10 4H32L40 12V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path d="M32 4V12H40" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 24H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 30H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 36H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </div>
);

export const BookCover = ({ src, alt, className = "" }: BookCoverProps) => {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">(src ? "loading" : "error");

    const onLoad = useCallback(() => setStatus("loaded"), []);
    const onError = useCallback(() => setStatus("error"), []);

    return (
        <div className={`relative overflow-hidden bg-bg-light ${className}`}>
            {status === "loading" && <div className="absolute inset-0 bg-border/20 animate-pulse" />}

            {status === "error" && <BookIcon />}

            {src && status !== "error" && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={onLoad}
                    onError={onError}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                        status === "loaded" ? "opacity-100" : "opacity-0"
                    }`}
                />
            )}
        </div>
    );
};
