import { db } from "@lib/firebase.ts";
import { type Book, bookSchema } from "@lib/schemas.ts";
import { collection, onSnapshot, orderBy, type QueryConstraint, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

type BookWithId = Book & { id: string };

type UseBooksOptions = {
    status?: "completed" | "currently-reading" | "upcoming";
    limit?: number;
};

export const useBooks = (options?: UseBooksOptions) => {
    const [books, setBooks] = useState<BookWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const constraints: QueryConstraint[] = [orderBy("dateFinalDiscussion", "desc")];

        if (options?.status) {
            constraints.unshift(where("status", "==", options.status));
        }

        const q = query(collection(db, "books"), ...constraints);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const results: BookWithId[] = [];

                for (const doc of snapshot.docs) {
                    const data = doc.data();
                    const parsed = bookSchema.safeParse({
                        ...data,
                        dateStarted: data.dateStarted?.toDate?.() ?? data.dateStarted,
                        dateFinalDiscussion: data.dateFinalDiscussion?.toDate?.() ?? data.dateFinalDiscussion,
                        createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
                        updatedAt: data.updatedAt?.toDate?.() ?? data.updatedAt,
                    });

                    if (parsed.success) {
                        results.push({ ...parsed.data, id: doc.id });
                    } else {
                        console.warn(`skipping invalid book ${doc.id}:`, parsed.error);
                    }
                }

                setBooks(options?.limit ? results.slice(0, options.limit) : results);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error("firestore error:", err);
                setError("failed to load books");
                setLoading(false);
            },
        );

        return unsubscribe;
    }, [options?.status, options?.limit]);

    return { books, loading, error };
};
