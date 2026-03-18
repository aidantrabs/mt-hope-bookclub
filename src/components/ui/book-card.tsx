import { Link } from "react-router-dom";
import { StarRating } from "./star-rating.tsx";

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverImageUrl: string;
  ratingClub: number;
  dateFinalDiscussion: Date;
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
  dateFinalDiscussion,
  status,
  variant = "light",
}: BookCardProps) => {
  const isDark = variant === "dark";

  return (
    <Link
      to={`/discover/${id}`}
      className={`group rounded-xl overflow-hidden flex flex-col transition-all duration-200 ${
        isDark
          ? "bg-bg-card-dark hover:brightness-110"
          : "bg-bg-card shadow-sm hover:-translate-y-1 hover:shadow-md"
      }`}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={coverImageUrl || fallbackCover}
          alt={`cover of ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackCover;
          }}
        />
      </div>
      <article className="p-4 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-[0.15em] font-medium text-text-secondary mb-1">
          {author}
        </span>
        <h3 className={`font-display text-lg font-semibold leading-tight ${
          isDark ? "text-text-on-dark" : "text-text-primary"
        }`}>
          {title}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <StarRating rating={ratingClub} />
          <span className={`rounded-full px-2.5 py-0.5 text-xs uppercase tracking-[0.1em] font-medium ${
            isDark
              ? "bg-highlight/20 text-highlight-soft"
              : "bg-highlight-soft text-highlight"
          }`}>
            {status === "currently-reading"
              ? "reading"
              : genre.split("/")[0]!.trim().toLowerCase()}
          </span>
        </div>
      </article>
    </Link>
  );
};
