// components/movie-reviews.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { buttonVariants } from "@heroui/styles";

export type Review = {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: { rating?: number | null };
};

type Props = {
  reviews?: Review[];
};

function StarRating({
  value,
  onChange,
  size = 14,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= active;
        const star = (
          <Star
            size={size}
            className={filled ? "text-warning" : "text-foreground-500"}
            fill={filled ? "currentColor" : "none"}
          />
        );
        return onChange ? (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1} star${i === 0 ? "" : "s"}`}
            onMouseEnter={() => setHover(i + 1)}
            onClick={() => onChange(i + 1)}
          >
            {star}
          </button>
        ) : (
          <span key={i}>{star}</span>
        );
      })}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.content.length > 320;
  // TMDB ratings are out of 10, the star display is out of 5
  const rating = review.author_details?.rating
    ? Math.round(review.author_details.rating / 2)
    : 0;

  return (
    <article className="rounded-large border border-divider bg-content2 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-content3 text-sm font-medium uppercase">
          {review.author.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{review.author}</p>
          <p className="text-xs text-foreground-500">
            {new Date(review.created_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {rating > 0 && <StarRating value={rating} />}
      </div>

      <p
        className={`mt-3 whitespace-pre-line text-sm text-foreground-400 ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {review.content}
      </p>

      {long && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-xs text-foreground-500 hover:text-foreground"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

export default function MovieReviews({ reviews = [] }: Props) {
  const [items, setItems] = useState<Review[]>(reviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(3);

  const canSubmit = name.trim() && text.trim() && rating > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // TODO: replace with a server action / API call to persist the review
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        author: name.trim(),
        content: text.trim(),
        created_at: new Date().toISOString(),
        author_details: { rating: rating * 2 },
      },
      ...prev,
    ]);
    setName("");
    setText("");
    setRating(0);
  }

  const inputClass =
    "w-full rounded-medium border border-divider bg-content2 px-3 py-2 text-sm outline-none placeholder:text-foreground-500 focus:border-foreground-400";

  return (
    <div className="py-8">
      <h2 className="mb-4 text-sm font-medium">
        Reviews{" "}
        <span className="text-foreground-500">({items.length})</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid gap-3 rounded-large border border-divider p-4"
      >
        <p className="text-sm font-medium">Write a review</p>
        <input
          className={inputClass}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-500">Your rating</span>
          <StarRating value={rating} onChange={setRating} size={20} />
        </div>
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          placeholder="What did you think of the movie?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`${buttonVariants({ variant: "primary", size: "sm" })} disabled:opacity-50`}
          >
            Submit review
          </button>
        </div>
      </form>

      {items.length === 0 ? (
        <p className="text-sm text-foreground-500">
          No reviews yet. Be the first to write one.
        </p>
      ) : (
        <div className="grid gap-4">
          {items.slice(0, visible).map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
          {visible < items.length && (
            <div>
              <button
                type="button"
                onClick={() => setVisible((v) => v + 5)}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Load more reviews
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
