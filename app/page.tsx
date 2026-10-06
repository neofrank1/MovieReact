// app/page.tsx
import NextLink from "next/link";
import { getTrending, getGenres, getTopRatedMovie, getTopRatedTV, getPopularTV } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";
import TVCard from "@/components/tv-card";
import SiteNavbar from "@/components/navbar/site-navbar";
import HeroCarousel from "@/components/hero-carousel";
import TopRatedList from "@/components/top-rated-movie-list";
import TopRatedTVList from "@/components/top-rated-tv-list";
import type { Metadata } from "next";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Movie Critique",
  description:
    "Roast a Movie, or Praise it! Discover the best movies and TV shows, read reviews, and share your own opinions with our community of movie lovers.",
};

export default async function Home() {
  const [trendingData, genresData, topRatedData, topRatedTVData, popularTVData] = await Promise.all([
    getTrending(),
    getGenres(),
    getTopRatedMovie(),
    getTopRatedTV(),
    getPopularTV(),
  ]);

  const trending = trendingData.results ?? [];
  const genres = genresData.genres ?? [];
  const topRated = (topRatedData.results ?? []).slice(0, 5);
  const topRatedTV = (topRatedTVData.results ?? []).slice(0, 5);
  const popular = popularTVData.results ?? [];

  // Map genre IDs → names for the hero badges
  const genreMap: Record<number, string> = Object.fromEntries(
    genres.map((g: any) => [g.id, g.name])
  );

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        <div className="min-w-0">
          <HeroCarousel movies={trending.slice(0, 5)} genreMap={genreMap} />

          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                🔥 Trending movies
              </h2>
              <NextLink
                href="/movies"
                className="text-xs text-primary hover:underline"
              >
                View all →
              </NextLink>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {trending.slice(0, 6).map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                🔥 Popular TV Shows
              </h2>
              <NextLink
                href="/tv"
                className="text-xs text-primary hover:underline"
              >
                View all →
              </NextLink>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {popular.slice(0, 6).map((popularTV: any) => (
                <TVCard key={popularTV.id} tv={popularTV} />
              ))}
            </div>
          </section>
        </div>

        

        <aside className="flex flex-col gap-8">
          <div>
            <h2 className="text-base font-semibold mb-3">Popular genres</h2>
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 12).map((g: any) => (
                <NextLink
                  key={g.id}
                  href={`/movies?genre=${g.id}`}
                  className="text-xs px-3 py-1.5 rounded-medium bg-content2 border border-divider text-foreground-400 hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {g.name}
                </NextLink>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-3">Top Rated Movie</h2>
            <TopRatedList movies={topRated} />
          </div>
           <div>
            <h2 className="text-base font-semibold mb-3">Top Rated TV Shows</h2>
            <TopRatedTVList tv={topRatedTV} />
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}