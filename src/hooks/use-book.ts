import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@lib/firebase.ts";
import { bookSchema, type Book } from "@lib/schemas.ts";

type BookWithId = Book & { id: string };

export const useBook = (id: string | undefined) => {
  const [book, setBook] = useState<BookWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("no book id provided");
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "books", id),
      (snapshot) => {
        if (!snapshot.exists()) {
          setBook(null);
          setError("book not found");
          setLoading(false);
          return;
        }

        const data = snapshot.data();
        const parsed = bookSchema.safeParse({
          ...data,
          dateStarted: data.dateStarted?.toDate?.() ?? data.dateStarted,
          dateFinalDiscussion: data.dateFinalDiscussion?.toDate?.() ?? data.dateFinalDiscussion,
          createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() ?? data.updatedAt,
        });

        if (parsed.success) {
          setBook({ ...parsed.data, id: snapshot.id });
          setError(null);
        } else {
          console.warn("invalid book data:", parsed.error);
          setBook(null);
          setError("invalid book data");
        }

        setLoading(false);
      },
      (err) => {
        console.error("firestore error:", err);
        setError("failed to load book");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [id]);

  return { book, loading, error };
};
