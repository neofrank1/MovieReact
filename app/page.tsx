// app/page.tsx
import NextLink from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { buttonVariants } from "@heroui/styles";
import { getTrending, getGenres, BACKDROP_BASE } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";
import SiteNavbar from "@/components/navbar/site-navbar";

export default async function Home() {
  const [trendingData, genresData] = await Promise.all([
    getTrending(),
    getGenres(),
  ]);
  const trending = trendingData.results ?? [];
  const genres = genresData.genres ?? [];
  const featured = trending[0];

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        <div>
          {/* Hero */}
          {featured && (
            <section className="relative h-[380px] rounded-large overflow-hidden flex items-end p-8">
              <Image
                src={`${BACKDROP_BASE}${featured.backdrop_path}`}
                alt={featured.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="relative z-10 max-w-lg">
                <h1 className="text-3xl font-semibold">{featured.title}</h1>
                <p className="flex items-center gap-1 text-sm text-warning mt-2">
                  <Star size={14} fill="currentColor" />
                  {featured.vote_average.toFixed(1)}/10
                  <span className="text-foreground-500">
                    ({featured.vote_count.toLocaleString()} reviews)
                  </span>
                </p>
                <p className="text-sm text-foreground-400 mt-3 line-clamp-2">
                  {featured.overview}
                </p>
                <div className="flex gap-3 mt-4">
                  <NextLink
                    href={`/movies/${featured.id}`}
                    className={buttonVariants({ variant: "primary", size: "md" })}
                  >
                    More info
                  </NextLink>
                </div>
              </div>
            </section>
          )}

          {/* Trending */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium">Trending this week</h2>
              <NextLink href="/movies" className="text-xs text-primary">
                View all →
              </NextLink>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {trending.slice(0, 8).map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Popular genres */}
        <aside>
          <h2 className="text-sm font-medium mb-3">Popular genres</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((g: any) => (
              <NextLink
                key={g.id}
                href={`/movies?genre=${g.id}`}
                className="text-xs px-3 py-1.5 rounded-medium bg-content2 border border-divider text-foreground-400 hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {g.name}
              </NextLink>
            ))}
          </div>
        </aside>
      </main>
    </>
  );
}