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
};

const fallbackCover = "https://placehold.co/200x300/e8dcc8/3d2c2e?text=no+cover";

export const BookCard = ({
  id,
  title,
  author,
  genre,
  coverImageUrl,
  ratingClub,
  dateFinalDiscussion,
  status,
}: BookCardProps) => (
  <Link
    to={`/books/${id}`}
    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
  >
    <div className="aspect-[2/3] bg-sand overflow-hidden">
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
      <span className="text-xs font-medium text-green bg-green/10 px-2 py-0.5 rounded-full self-start mb-2">
        {genre}
      </span>
      <h3 className="font-serif font-bold text-brown group-hover:text-terracotta transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-sm text-brown-light mt-1">{author}</p>
      <div className="mt-auto pt-3 flex items-center justify-between">
        <StarRating rating={ratingClub} />
        <span className="text-xs text-brown-muted">
          {status === "currently-reading"
            ? "reading now"
            : dateFinalDiscussion.toLocaleDateString("en-TT", {
                month: "short",
                year: "numeric",
              })}
        </span>
      </div>
    </article>
  </Link>
);
