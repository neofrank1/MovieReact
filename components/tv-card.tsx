// components/movie-card.tsx
import Image from "next/image";
import NextLink from "next/link";
// import { Star } from "lucide-react";
import { IMAGE_BASE } from "@/lib/tmdb";
import TmdbRating from "@/components/tmdb-rating";

export default function TVCard({ tv }: { tv: any }) {
  return (
    <NextLink href={`/tv/${tv.id}`} className="block group">
      <div className="relative aspect-[2/3] w-full bg-content2 border border-divider rounded-medium overflow-hidden group-hover:border-primary/50 transition-colors">
        {tv.poster_path ? (
          <Image
            src={`${IMAGE_BASE}${tv.poster_path}`}
            alt={ tv.name}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground-500 text-xs px-2 text-center">
            No poster available
          </div>
        )}
      </div>
      <p className="text-sm font-medium mt-2 line-clamp-1 text-foreground">
        {tv.name}
      </p>
      <TmdbRating rating={tv.vote_average} compact className="mt-1 text-xs" />
      {/*
      Future user rating:
      <p className="mt-1 flex items-center gap-1 text-xs text-warning">
        <Star size={11} fill="currentColor" />
        Your rating
      </p>
      */}
    </NextLink>
  );
}