// components/tv-tabs.tsx
"use client";
import { useState } from "react";
import TVReviews, { type Review } from "@/components/tv-reviews";

type TVShowWithReviews = {
  id: number | string;
  overview: string;
  title?: string;
  name?: string;
  poster_path?: string | null;
};

export default function TVTabs({
  tv,
  reviews = [],
  reviewed
}: {
  tv: TVShowWithReviews;
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
        {tab === "overview" ? tv.overview : (
          <TVReviews tv_show={tv} reviews={reviews} reviewed={reviewed}/>
        )}
      </div>
    </div>
  );
}