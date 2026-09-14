// components/movie-card.tsx
import Image from "next/image";
import NextLink from "next/link";
import { Star } from "lucide-react";
import { IMAGE_BASE } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <NextLink href={`/movies/${movie.id}`} className="block group">
      <div className="relative aspect-[2/3] bg-content2 border border-divider rounded-medium overflow-hidden group-hover:border-primary/50 transition-colors">
        {movie.poster_path && (
          <Image
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-cover"
          />
        )}
      </div>
      <p className="text-sm font-medium mt-2 line-clamp-1 text-foreground">
        {movie.title}
      </p>
      <p className="text-xs text-foreground-500 mt-0.5 flex items-center gap-1">
        <Star size={11} className="text-warning" fill="currentColor" />
        {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "—"}
      </p>
    </NextLink>
  );
}