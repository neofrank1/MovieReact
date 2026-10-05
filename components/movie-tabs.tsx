// components/movie-tabs.tsx
"use client";
import { useState } from "react";
import MovieReviews, { type Review } from "@/components/movie-reviews";

type MovieWithReviews = {
  id: number | string;
  overview: string;
  title?: string;
  name?: string;
  poster_path?: string | null;
};

export default function MovieTabs({
  movie,
  reviews = [],
  reviewed
}: {
  movie: MovieWithReviews;
  reviews?: Review[];
  reviewed?: Boolean | undefined
}) {
  const [tab, setTab] = useState<"overview" | "reviews">("overview");

  return (
    <div className="border-t border-divider pt-4">
      <div className="flex gap-6 text-sm">
        {(["overview", "reviews"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 border-b-2 capitalize ${
              tab === t
                ? "border-primary text-foreground"
                : "border-transparent text-foreground-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="py-4 text-sm text-foreground-400">
        {tab === "overview" ? movie.overview : (
            <MovieReviews movie={movie} reviews={reviews} reviewed={reviewed}/>
        )}
      </div>
    </div>
  );
}