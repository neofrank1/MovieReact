// components/top-rated-list.tsx
'use client'
import Image from "next/image";
import NextLink from "next/link";
// import { Star } from "lucide-react";
import { IMAGE_BASE } from "@/lib/tmdb";
import TmdbRating from "@/components/tmdb-rating";

export default function TopRatedTVList({ tv }: { tv: any[] }) {
  return (
    <div className="flex flex-col gap-3">
      {tv.map((tvData, i) => (
        <NextLink
          key={tvData.id}
          href={`/tv/${tvData.id}`}
          className="flex items-center gap-3 group"
        >
          <span className="text-sm text-foreground-500 w-4 shrink-0">{i + 1}</span>
          <div className="relative w-9 h-12 rounded shrink-0 overflow-hidden bg-content2">
            {tvData.poster_path && (
              <Image
                src={`${IMAGE_BASE}${tvData.poster_path}`}
                alt={tvData.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {tvData.name}
            </p>
            <TmdbRating rating={tvData.vote_average} compact className="mt-1 text-[11px]" />
            {/*
            Future user rating:
            <p className="mt-1 flex items-center gap-1 text-[11px] text-warning">
              <Star size={10} fill="currentColor" />
              Your rating
            </p>
            */}
          </div>
        </NextLink>
      ))}
    </div>
  );
}