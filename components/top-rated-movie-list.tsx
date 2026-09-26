// components/top-rated-list.tsx
'use client'
import Image from "next/image";
import NextLink from "next/link";
import { Star } from "lucide-react";
import { IMAGE_BASE } from "@/lib/tmdb";

export default function TopRatedList({ movies }: { movies: any[] }) {
  return (
    <div className="flex flex-col gap-3">
      {movies.map((movie, i) => (
        <NextLink
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="flex items-center gap-3 group"
        >
          <span className="text-sm text-foreground-500 w-4 shrink-0">{i + 1}</span>
          <div className="relative w-9 h-12 rounded shrink-0 overflow-hidden bg-content2">
            {movie.poster_path && (
              <Image
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="36px"
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {movie.title}
            </p>
            <p className="flex items-center gap-1 text-[11px] text-warning mt-0.5">
              <Star size={10} fill="currentColor" />
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </NextLink>
      ))}
    </div>
  );
}