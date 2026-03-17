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
    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
  >
    <div className="aspect-[2/3] bg-[#e8dcc8] overflow-hidden">
      <img
        src={coverImageUrl || fallbackCover}
        alt={`cover of ${title}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackCover;
        }}
      />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <span className="text-xs font-medium text-[#2d5a3d] bg-[#e8f0eb] px-2 py-0.5 rounded-full self-start mb-2">
        {genre}
      </span>
      <h3 className="font-serif font-bold text-[#3d2c2e] group-hover:text-[#c26a4a] transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-sm text-[#6b5658] mt-1">{author}</p>
      <div className="mt-auto pt-3 flex items-center justify-between">
        <StarRating rating={ratingClub} />
        <span className="text-xs text-[#8a7a6c]">
          {status === "currently-reading"
            ? "reading now"
            : dateFinalDiscussion.toLocaleDateString("en-TT", {
                month: "short",
                year: "numeric",
              })}
        </span>
      </div>
    </div>
  </Link>
);
