// components/movie-tabs.tsx
"use client";
import { useState } from "react";

export default function MovieTabs({ movie }: { movie: any }) {
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
        {tab === "overview" ? movie.overview : "No reviews yet — be the first to write one."}
      </div>
    </div>
  );
}