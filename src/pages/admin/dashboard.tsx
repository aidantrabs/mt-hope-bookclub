import { useState } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@lib/firebase.ts";
import { useBooks } from "@hooks/use-books.ts";
import { useAuth } from "@hooks/use-auth.ts";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { useToast } from "@/components/ui/toast.tsx";

const statusColors: Record<string, string> = {
  "currently-reading": "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-700",
  upcoming: "bg-blue-100 text-blue-800",
};

const statusLabels: Record<string, string> = {
  "currently-reading": "reading",
  completed: "completed",
  upcoming: "upcoming",
};

export const Dashboard = () => {
  const { books, loading, error } = useBooks();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "books", id));
      setConfirmDelete(null);
      toast("book deleted.", "success");
    } catch {
      toast("failed to delete. try again.", "error");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  const currentlyReading = books.filter((b) => b.status === "currently-reading");
  const otherBooks = books.filter((b) => b.status !== "currently-reading");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#3d2c2e]">dashboard</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/new"
            className="bg-[#c26a4a] text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-[#a8583d] transition-colors"
          >
            + add book
          </Link>
          <button
            onClick={() => signOut()}
            className="text-sm text-[#8a7a6c] hover:text-[#3d2c2e] transition-colors"
          >
            sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 mb-6">
          {error}
        </div>
      )}

      {books.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6b5658] mb-4">no books yet — add your first one!</p>
          <Link
            to="/admin/new"
            className="inline-block bg-[#c26a4a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#a8583d] transition-colors"
          >
            + add book
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {[...currentlyReading, ...otherBooks].map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg border border-[#e8dcc8] p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif font-bold text-[#3d2c2e] truncate">{book.title}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                      statusColors[book.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusLabels[book.status] ?? book.status}
                  </span>
                </div>
                <p className="text-sm text-[#6b5658] truncate">{book.author}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin/edit/${book.id}`}
                  className="text-sm text-[#c26a4a] hover:underline px-3 py-1.5"
                >
                  edit
                </Link>

                {confirmDelete === book.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 text-[#3d2c2e] hover:bg-gray-200 transition-colors font-medium"
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      disabled={deleting === book.id}
                      className="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                    >
                      {deleting === book.id ? "deleting..." : "yes, delete"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(book.id)}
                    disabled={deleting !== null}
                    className="text-sm text-[#8a7a6c] hover:text-red-600 transition-colors px-3 py-1.5 disabled:opacity-50"
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
