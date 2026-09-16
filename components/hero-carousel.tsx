// components/hero-carousel.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Star, Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { BACKDROP_BASE } from "@/lib/tmdb";

export default function HeroCarousel({
  movies,
  genreMap,
}: {
  movies: any[];
  genreMap: Record<number, string>;
}) {
  const [index, setIndex] = useState(0);
  const featured = movies[index];

  const prev = () => setIndex((i) => (i === 0 ? movies.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === movies.length - 1 ? 0 : i + 1));

  if (!featured) return null;

  return (
    <section className="relative h-[340px] rounded-large overflow-hidden group">
      <Image
        src={`${BACKDROP_BASE}${featured.backdrop_path}`}
        alt={featured.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 800px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-background/40 text-foreground-400 hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-background/40 text-foreground-400 hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={20} />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-8 max-w-lg">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded bg-content2/80 border border-divider text-foreground-400">
            Movie
          </span>
          {featured.genre_ids?.slice(0, 3).map((id: number) => (
            <span
              key={id}
              className="text-[10px] px-2 py-0.5 rounded bg-content2/80 border border-divider text-foreground-400"
            >
              {genreMap[id]}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-semibold">{featured.title}</h1>

        <p className="flex items-center gap-1.5 text-sm mt-2">
          <Star size={15} className="text-warning" fill="currentColor" />
          <span className="font-medium">{featured.vote_average.toFixed(1)}/10</span>
          <span className="text-foreground-500">
            ({(featured.vote_count / 1000).toFixed(0)}K reviews)
          </span>
        </p>

        <p className="text-sm text-foreground-400 mt-3 line-clamp-3">
          {featured.overview}
        </p>

        <div className="flex gap-3 mt-5">
            <NextLink
                href={`/movies/${featured.id}`}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-accent text-background hover:bg-accent/90 active:scale-[0.98] transition-all"
            >
                <Play size={14} fill="currentColor" /> Watch trailer
            </NextLink>
            <NextLink
                href={`/movies/${featured.id}`}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-content2/80 border border-divider text-foreground hover:bg-content2 hover:border-foreground-400 transition-all"
            >
                <Info size={14} /> More info
            </NextLink>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-primary" : "w-1.5 bg-foreground-500/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}