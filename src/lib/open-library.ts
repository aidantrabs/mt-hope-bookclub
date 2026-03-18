type SearchResult = {
    coverUrl: string;
    isbn: string;
};

export const searchBookCover = async (title: string): Promise<SearchResult | null> => {
    const encoded = encodeURIComponent(title.trim());
    const res = await fetch(`https://openlibrary.org/search.json?title=${encoded}&limit=5`);

    if (!res.ok) return null;

    const data = await res.json();
    const docs = data.docs as Array<{ cover_i?: number; isbn?: string[] }>;

    for (const doc of docs) {
        if (doc.cover_i) {
            return {
                coverUrl: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
                isbn: doc.isbn?.[0] ?? "",
            };
        }
    }

    return null;
};
