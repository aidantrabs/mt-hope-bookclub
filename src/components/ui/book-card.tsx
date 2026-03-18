import { Link } from "react-router-dom";
import { StarRating } from "./star-rating.tsx";

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverImageUrl: string;
  ratingClub: number;
  status: string;
  variant?: "light" | "dark";
};

const fallbackCover = "https://placehold.co/200x300/e5e2dd/1a2332?text=no+cover";

export const BookCard = ({
  id,
  title,
  author,
  genre,
  coverImageUrl,
  ratingClub,
  status,
  variant = "light",
}: BookCardProps) => {
  const isDark = variant === "dark";

  return (
    <Link
      to={`/discover/${id}`}
      className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-200 ${
        isDark
          ? "bg-bg-card-dark hover:bg-bg-card-dark/80"
          : "bg-bg-card border border-border hover:-translate-y-1 hover:shadow-lg"
      }`}
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={coverImageUrl || fallbackCover}
          alt={`cover of ${title}`}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackCover; }}
        />
        {status === "currently-reading" && (
          <span className="absolute top-3 left-3 bg-highlight text-white text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full">
            reading
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-1">
        <p className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${
          isDark ? "text-text-muted-dark" : "text-text-secondary"
        }`}>
          {author}
        </p>
        <h3 className={`font-display text-base leading-snug ${
          isDark ? "text-text-on-dark" : "text-text-primary"
        }`}>
          {title}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <StarRating rating={ratingClub} size={12} />
          <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-semibold ${
            isDark ? "bg-highlight/15 text-highlight-soft" : "bg-highlight-soft text-highlight"
          }`}>
            {genre.split("/")[0]!.trim().toLowerCase()}
          </span>
        </div>
      </div>
    </Link>
  );
};
