type TmdbRatingProps = {
  rating?: number;
  voteCount?: number;
  compact?: boolean;
  className?: string;
};

function formatVoteCount(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`;
  return count.toLocaleString();
}

export default function TmdbRating({
  rating = 0,
  voteCount,
  compact = false,
  className = "",
}: TmdbRatingProps) {
  const ratingText = rating > 0 ? rating.toFixed(1) : "-";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-foreground-500 ${className}`}
      aria-label={`TMDB rating ${ratingText} out of 10`}
    >
      <span className="inline-flex h-4 items-center rounded-[3px] bg-gradient-to-r from-[#90cea1] to-[#01b4e4] px-1 text-[9px] font-bold leading-none text-[#032541]">
        TMDB
      </span>
      <span className="font-medium text-foreground">
        {compact ? "Rate" : "TMDB Rate"} {ratingText}
        {!compact && "/10"}
      </span>
      {typeof voteCount === "number" && (
        <span className="text-foreground-500">
          ({formatVoteCount(voteCount)} votes)
        </span>
      )}
    </span>
  );
}