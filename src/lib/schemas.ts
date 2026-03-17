import { z } from "zod/v4";

const halfStepRating = z
  .number()
  .min(0.5)
  .max(5)
  .refine((n) => n % 0.5 === 0, "must be in 0.5 increments");

const nonEmptyString = z.string().trim().min(1, "required");

const bookStatus = z.enum(["completed", "currently-reading", "upcoming"]);

export const bookSchema = z.object({
  title: nonEmptyString,
  author: nonEmptyString,
  genre: nonEmptyString,
  coverImageUrl: z.string().url(),
  dateStarted: z.coerce.date(),
  dateFinalDiscussion: z.coerce.date(),
  summary: nonEmptyString.pipe(z.string().min(20, "must be at least 20 characters")),
  ratingClub: halfStepRating,
  ratingGoodreads: halfStepRating,
  favoriteQuotes: z.array(nonEmptyString).min(1, "at least one quote required"),
  discussionHighlights: z.array(nonEmptyString).min(1, "at least one highlight required"),
  funFact: nonEmptyString,
  wouldRecommend: z.boolean(),
  nextRead: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  status: bookStatus,
});

export type Book = z.infer<typeof bookSchema>;

export const bookFormSchema = bookSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type BookFormData = z.infer<typeof bookFormSchema>;
