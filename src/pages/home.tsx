import { Link } from "react-router-dom";
import { useBooks } from "@hooks/use-books.ts";
import { BookCard } from "@/components/ui/book-card.tsx";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";

export const Home = () => {
  const { books: currentlyReading, loading: loadingCurrent } = useBooks({ status: "currently-reading" });
  const { books: completed, loading: loadingCompleted } = useBooks({ status: "completed", limit: 4 });

  const currentBook = currentlyReading[0];

  return (
    <div>
      <section className="py-20 md:py-32 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#3d2c2e] mb-4">
          mt. hope book club
        </h1>
        <p className="text-lg md:text-xl text-[#6b5658] max-w-xl mx-auto mb-8">
          a community of readers in trinidad & tobago — one book at a time.
        </p>
        <Link
          to="/books"
          className="inline-block bg-[#c26a4a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#a8583d] transition-colors"
        >
          explore our books
        </Link>
      </section>

      {loadingCurrent ? (
        <LoadingSpinner />
      ) : currentBook ? (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3d2c2e] mb-8 text-center">
            we're currently reading
          </h2>
          <Link
            to={`/books/${currentBook.id}`}
            className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden md:flex"
          >
            <div className="md:w-48 aspect-[2/3] md:aspect-auto bg-[#e8dcc8] overflow-hidden shrink-0">
              <img
                src={currentBook.coverImageUrl || "https://placehold.co/200x300/e8dcc8/3d2c2e?text=no+cover"}
                alt={`cover of ${currentBook.title}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <span className="inline-block text-xs font-medium text-white bg-[#2d5a3d] px-3 py-1 rounded-full self-start mb-3">
                reading now
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3d2c2e] group-hover:text-[#c26a4a] transition-colors">
                {currentBook.title}
              </h3>
              <p className="text-[#6b5658] mt-1">by {currentBook.author}</p>
              <p className="text-sm text-[#8a7a6c] mt-3 line-clamp-2">{currentBook.summary}</p>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3d2c2e] mb-8 text-center">
          recently completed
        </h2>
        {loadingCompleted ? (
          <LoadingSpinner />
        ) : completed.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {completed.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                genre={book.genre}
                coverImageUrl={book.coverImageUrl}
                ratingClub={book.ratingClub}
                dateFinalDiscussion={book.dateFinalDiscussion}
                status={book.status}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#6b5658]">no completed books yet.</p>
        )}
      </section>
    </div>
  );
};
