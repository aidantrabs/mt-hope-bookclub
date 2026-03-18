import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useBlocker } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@lib/firebase.ts";
import { bookFormSchema } from "@lib/schemas.ts";
import { useBook } from "@hooks/use-book.ts";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { StarPicker } from "@/components/ui/star-picker.tsx";
import { useToast } from "@/components/ui/toast.tsx";
import { searchBookCover } from "@lib/open-library.ts";

type FieldErrors = Record<string, string>;

const today = () => new Date().toISOString().split("T")[0]!;

const defaultForm = () => ({
  title: "",
  author: "",
  genre: "",
  coverImageUrl: "",
  dateStarted: today(),
  dateFinalDiscussion: today(),
  summary: "",
  ratingClub: 0,
  ratingGoodreads: 0,
  favoriteQuotes: [""],
  discussionHighlights: [""],
  funFact: "",
  wouldRecommend: true,
  nextRead: "",
  status: "completed" as "completed" | "currently-reading" | "upcoming",
});

type FormData = ReturnType<typeof defaultForm>;

export const BookForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { book, loading: bookLoading, error: bookError } = useBook(id);

  const [form, setForm] = useState<FormData>(defaultForm());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [fetchingCover, setFetchingCover] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isEdit || !book || prefilled) return;
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      coverImageUrl: book.coverImageUrl,
      dateStarted: book.dateStarted.toISOString().split("T")[0]!,
      dateFinalDiscussion: book.dateFinalDiscussion.toISOString().split("T")[0]!,
      summary: book.summary,
      ratingClub: book.ratingClub,
      ratingGoodreads: book.ratingGoodreads,
      favoriteQuotes: book.favoriteQuotes.length > 0 ? [...book.favoriteQuotes] : [""],
      discussionHighlights: book.discussionHighlights.length > 0 ? [...book.discussionHighlights] : [""],
      funFact: book.funFact,
      wouldRecommend: book.wouldRecommend,
      nextRead: book.nextRead,
      status: book.status,
    });
    setPrefilled(true);
  }, [isEdit, book, prefilled]);

  const blocker = useBlocker(dirty && !submitting);

  useEffect(() => {
    if (!dirty || submitting) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, submitting]);

  const update = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  }, []);

  const validateField = useCallback((key: string) => {
    setForm((current) => {
      const data = buildSubmitData(current);
      const result = bookFormSchema.safeParse(data);
      if (result.success) {
        setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
      } else {
        const fieldError = result.error.issues.find((issue) =>
          issue.path[0] === key || issue.path.join(".") === key
        );
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [key]: fieldError.message }));
        } else {
          setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
        }
      }
      return current;
    });
  }, []);

  const buildSubmitData = (f: FormData) => ({
    title: f.title, author: f.author, genre: f.genre, coverImageUrl: f.coverImageUrl,
    dateStarted: f.dateStarted, dateFinalDiscussion: f.dateFinalDiscussion,
    summary: f.summary, ratingClub: f.ratingClub, ratingGoodreads: f.ratingGoodreads,
    favoriteQuotes: f.favoriteQuotes.map((q) => q.trim()).filter(Boolean),
    discussionHighlights: f.discussionHighlights.map((h) => h.trim()).filter(Boolean),
    funFact: f.funFact, wouldRecommend: f.wouldRecommend, nextRead: f.nextRead, status: f.status,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const data = buildSubmitData(form);
    const result = bookFormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString() ?? "";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) {
        const el = document.querySelector(`[data-field="${firstKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        (el?.querySelector("input, textarea, select") as HTMLElement)?.focus();
      }
      return;
    }

    setSubmitting(true);
    try {
      const now = Timestamp.now();
      const firestoreData = {
        ...result.data,
        dateStarted: Timestamp.fromDate(new Date(result.data.dateStarted)),
        dateFinalDiscussion: Timestamp.fromDate(new Date(result.data.dateFinalDiscussion)),
        updatedAt: now,
      };
      if (isEdit && id) {
        await updateDoc(doc(db, "books", id), firestoreData);
      } else {
        await addDoc(collection(db, "books"), { ...firestoreData, createdAt: now });
      }
      setDirty(false);
      toast(isEdit ? "book updated!" : "book added!", "success");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const message = (err as Error).message ?? "";
      if (message.includes("network") || message.includes("unavailable")) {
        setSubmitError("couldn't save — check your internet connection and try again.");
      } else {
        setSubmitError("something went wrong — your data is still here, try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && bookLoading) return <LoadingSpinner />;

  if (isEdit && (bookError || !book) && !bookLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-accent mb-4">this book doesn't exist — it may have been deleted.</p>
        <button onClick={() => navigate("/admin/dashboard")} className="text-sm text-text-secondary hover:text-accent transition-colors">
          &larr; back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-2xl md:text-3xl text-text-primary mb-8">
        {isEdit ? "edit book" : "add book"}
      </h1>

      {submitError && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 mb-6">{submitError}</div>
      )}

      {blocker.state === "blocked" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card rounded-xl p-6 max-w-sm w-full shadow-lg">
            <p className="text-text-primary font-medium mb-4">you have unsaved changes — are you sure you want to leave?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => blocker.reset()} className="px-4 py-2 rounded-lg bg-border text-text-primary hover:bg-border/80 transition-colors font-medium text-sm">stay</button>
              <button onClick={() => blocker.proceed()} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium text-sm">leave</button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">basics</legend>
          <Field label="title" error={errors.title} field="title">
            <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} onBlur={() => validateField("title")} placeholder="the alchemist" className={inputClass(errors.title)} />
          </Field>
          <Field label="author" error={errors.author} field="author">
            <input type="text" value={form.author} onChange={(e) => update("author", e.target.value)} onBlur={() => validateField("author")} placeholder="paulo coelho" className={inputClass(errors.author)} />
          </Field>
          <Field label="genre" error={errors.genre} field="genre">
            <input type="text" value={form.genre} onChange={(e) => update("genre", e.target.value)} onBlur={() => validateField("genre")} placeholder="literary fiction" className={inputClass(errors.genre)} />
          </Field>
          <Field label="status" error={errors.status} field="status">
            <select value={form.status} onChange={(e) => update("status", e.target.value as FormData["status"])} className={inputClass(errors.status)}>
              <option value="completed">completed</option>
              <option value="currently-reading">currently reading</option>
              <option value="upcoming">upcoming</option>
            </select>
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">dates</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="date started" error={errors.dateStarted} field="dateStarted">
              <input type="date" value={form.dateStarted} onChange={(e) => update("dateStarted", e.target.value)} className={inputClass(errors.dateStarted)} />
            </Field>
            <Field label="final discussion" error={errors.dateFinalDiscussion} field="dateFinalDiscussion">
              <input type="date" value={form.dateFinalDiscussion} onChange={(e) => update("dateFinalDiscussion", e.target.value)}
                onBlur={() => { if (form.dateStarted && form.dateFinalDiscussion && form.dateFinalDiscussion < form.dateStarted) setErrors((prev) => ({ ...prev, dateFinalDiscussion: "must be on or after the start date" })); }}
                className={inputClass(errors.dateFinalDiscussion)} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">details</legend>
          <Field label="summary" error={errors.summary} field="summary">
            <textarea value={form.summary} onChange={(e) => update("summary", e.target.value)} onBlur={() => validateField("summary")}
              onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }}
              placeholder="a brief summary of the book and how the club felt about it..." rows={3} className={inputClass(errors.summary)} />
          </Field>
          <Field label="fun fact" error={errors.funFact} field="funFact">
            <textarea value={form.funFact} onChange={(e) => update("funFact", e.target.value)} onBlur={() => validateField("funFact")}
              onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }}
              placeholder="something interesting about the book or author..." rows={2} className={inputClass(errors.funFact)} />
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">ratings</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="club rating" error={errors.ratingClub} field="ratingClub">
              <StarPicker value={form.ratingClub} onChange={(v) => update("ratingClub", v)} />
            </Field>
            <Field label="goodreads rating" error={errors.ratingGoodreads} field="ratingGoodreads">
              <StarPicker value={form.ratingGoodreads} onChange={(v) => update("ratingGoodreads", v)} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">favourite quotes</legend>
          <ListField items={form.favoriteQuotes} onChange={(items) => update("favoriteQuotes", items)} placeholder="enter a quote..." error={errors.favoriteQuotes} field="favoriteQuotes" />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">discussion highlights</legend>
          <ListField items={form.discussionHighlights} onChange={(items) => update("discussionHighlights", items)} placeholder="enter a highlight..." error={errors.discussionHighlights} field="discussionHighlights" />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-lg text-text-primary mb-2">extras</legend>
          <Field label="would we recommend it?" error={errors.wouldRecommend} field="wouldRecommend">
            <div className="flex gap-3">
              <button type="button" onClick={() => update("wouldRecommend", true)}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors border ${form.wouldRecommend ? "bg-highlight text-white border-highlight" : "bg-bg-card text-text-secondary border-border hover:border-highlight"}`}>
                👍 yes
              </button>
              <button type="button" onClick={() => update("wouldRecommend", false)}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors border ${!form.wouldRecommend ? "bg-accent text-white border-accent" : "bg-bg-card text-text-secondary border-border hover:border-accent"}`}>
                👎 no
              </button>
            </div>
          </Field>
          <Field label="next read" error={errors.nextRead} field="nextRead">
            <input type="text" value={form.nextRead} onChange={(e) => update("nextRead", e.target.value)} placeholder="title of the next book (optional)" className={inputClass(errors.nextRead)} />
          </Field>
          <Field label="cover image url" error={errors.coverImageUrl} field="coverImageUrl">
            <div className="flex gap-2">
              <input type="text" value={form.coverImageUrl} onChange={(e) => update("coverImageUrl", e.target.value)} placeholder="https://covers.openlibrary.org/b/isbn/..." className={inputClass(errors.coverImageUrl)} />
              <button type="button" disabled={!form.title.trim() || fetchingCover}
                onClick={async () => { setFetchingCover(true); const r = await searchBookCover(form.title); if (r) { update("coverImageUrl", r.coverUrl); toast("cover found!", "success"); } else { toast("no cover found for that title.", "warning"); } setFetchingCover(false); }}
                className="shrink-0 text-xs px-3 py-2 rounded-lg bg-border text-text-primary hover:bg-border/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {fetchingCover ? "searching..." : "auto-fetch"}
              </button>
            </div>
            {form.coverImageUrl && (
              <div className="mt-3 w-24 aspect-[2/3] rounded-lg overflow-hidden bg-border">
                <img src={form.coverImageUrl} alt="cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
          </Field>
        </fieldset>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={submitting}
            className="bg-accent text-white px-8 py-2.5 rounded-full font-medium text-sm uppercase tracking-[0.1em] hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {submitting ? "saving..." : isEdit ? "update book" : "add book"}
          </button>
          <button type="button" onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2.5 rounded-full bg-border text-text-primary hover:bg-border/80 transition-colors font-medium text-sm">
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const inputClass = (error?: string) =>
  `w-full px-4 py-2.5 rounded-xl border bg-bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${error ? "border-red-400" : "border-border"}`;

type FieldProps = { label: string; error?: string; field: string; children: React.ReactNode };

const Field = ({ label, error, field, children }: FieldProps) => (
  <div data-field={field}>
    <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-text-secondary mb-2">{label}</label>
    {children}
    {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
  </div>
);

type ListFieldProps = { items: string[]; onChange: (items: string[]) => void; placeholder: string; error?: string; field: string };

const ListField = ({ items, onChange, placeholder, error, field }: ListFieldProps) => (
  <div data-field={field}>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input type="text" value={item} onChange={(e) => { const next = [...items]; next[i] = e.target.value; onChange(next); }} placeholder={placeholder} className={inputClass(error)} />
          {items.length > 1 && (
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-text-secondary hover:text-red-600 transition-colors px-2 shrink-0" aria-label="remove">✕</button>
          )}
        </div>
      ))}
    </div>
    <button type="button" onClick={() => onChange([...items, ""])} className="text-sm text-accent hover:underline mt-2">+ add another</button>
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);
