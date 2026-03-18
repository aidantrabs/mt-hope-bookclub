import { useState } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@lib/firebase.ts";
import { useBooks } from "@hooks/use-books.ts";
import { useAuth } from "@hooks/use-auth.ts";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { useToast } from "@/components/ui/toast.tsx";

const statusStyles: Record<string, string> = {
  "currently-reading": "bg-highlight/15 text-highlight",
  completed: "bg-border text-text-secondary",
  upcoming: "bg-accent-soft text-accent",
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
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-text-primary">dashboard</h1>
        <div className="flex items-center gap-4">
          <Link to="/admin/new" className="bg-accent text-white px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors">
            + add book
          </Link>
          <button onClick={() => signOut()} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200 mb-6">{error}</div>
      )}

      {books.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-text-secondary mb-6">no books yet — add your first one!</p>
          <Link to="/admin/new" className="inline-block bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors">
            + add book
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {[...currentlyReading, ...otherBooks].map((book) => (
            <div key={book.id} className="bg-bg-card rounded-xl border border-border p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-display text-text-primary truncate">{book.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-[0.1em] shrink-0 ${statusStyles[book.status] ?? "bg-border text-text-secondary"}`}>
                    {book.status === "currently-reading" ? "reading" : book.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary truncate">{book.author}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link to={`/admin/edit/${book.id}`} className="text-sm text-accent hover:text-accent-hover transition-colors px-3 py-1.5">
                  edit
                </Link>
                {confirmDelete === book.id ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => setConfirmDelete(null)} className="text-sm px-3 py-1.5 rounded-lg bg-border text-text-primary hover:bg-border/80 transition-colors font-medium">cancel</button>
                    <button onClick={() => handleDelete(book.id)} disabled={deleting === book.id} className="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50">
                      {deleting === book.id ? "deleting..." : "yes, delete"}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(book.id)} disabled={deleting !== null} className="text-sm text-text-secondary hover:text-red-600 transition-colors px-3 py-1.5 disabled:opacity-50">
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
