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
      className={`group rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 ${
        isDark
          ? "bg-bg-card-dark hover:bg-bg-card-dark/80"
          : "bg-bg-card border border-border hover:-translate-y-1 hover:shadow-lg"
      }`}
    >
      <div className="aspect-[2/3] overflow-hidden relative shrink-0">
        <img
          src={coverImageUrl || fallbackCover}
          alt={`cover of ${title}`}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackCover; }}
        />
        {status === "currently-reading" && (
          <span className="absolute top-3 left-3 bg-highlight text-white text-xs uppercase tracking-wider font-medium px-2.5 py-1 rounded-full">
            reading
          </span>
        )}
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <p className={`text-xs uppercase tracking-wider font-medium truncate ${
          isDark ? "text-text-muted-dark" : "text-text-secondary"
        }`}>
          {author}
        </p>
        <h3 className={`text-sm font-semibold leading-snug line-clamp-2 mt-0.5 ${
          isDark ? "text-text-on-dark" : "text-text-primary"
        }`}>
          {title}
        </h3>
        <div className="mt-auto pt-2.5 flex flex-col gap-1.5">
          <StarRating rating={ratingClub} size={11} />
          <span className={`self-start rounded-full px-2 py-0.5 text-xs uppercase tracking-wider font-medium truncate max-w-full ${
            isDark ? "bg-highlight/15 text-highlight-soft" : "bg-highlight-soft text-highlight"
          }`}>
            {genre.split("/")[0]!.trim().toLowerCase()}
          </span>
        </div>
      </div>
    </Link>
  );
};
