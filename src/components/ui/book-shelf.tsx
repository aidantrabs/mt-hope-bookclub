import { Link } from "react-router-dom";
import { BookCover } from "./book-cover.tsx";

type ShelfBook = {
    id: string;
    title: string;
    coverImageUrl: string;
};

type BookShelfProps = {
    books: ShelfBook[];
};

export const BookShelf = ({ books }: BookShelfProps) => {
    if (books.length === 0) return null;

    const doubled = [...books, ...books];

    return (
        <div className="w-full overflow-x-clip overflow-y-visible mask-fade-x pt-4">
            <div className="book-shelf-track">
                {doubled.map((book, i) => (
                    <Link key={`${book.id}-${i}`} to={`/discover/${book.id}`} className="book-shelf-item">
                        <BookCover
                            src={book.coverImageUrl}
                            alt={`cover of ${book.title}`}
                            className="w-full aspect-[2/3] rounded-lg shadow-md"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};
