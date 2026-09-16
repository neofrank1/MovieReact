// app/movies/page.tsx
import { discoverMovies, getGenres } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";
import SiteNavbar from "@/components/navbar/site-navbar";
import NextLink from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Movies",
  description:
    "Discover a wide range of movies across various genres. Browse through our collection and find your next favorite film.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { genre?: string };
}) {
  const [moviesData, genresData] = await Promise.all([
    discoverMovies(searchParams.genre),
    getGenres(),
  ]);
  const movies = moviesData.results ?? [];
  const genres = genresData.genres ?? [];

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-lg font-semibold mb-4">Browse movies</h1>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <NextLink
            href="/movies"
            className={`text-xs px-3 py-1.5 rounded-medium whitespace-nowrap border ${
              !searchParams.genre
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-content2 border-divider text-foreground-400"
            }`}
          >
            All
          </NextLink>
          {genres.map((g: any) => (
            <NextLink
              key={g.id}
              href={`/movies?genre=${g.id}`}
              className={`text-xs px-3 py-1.5 rounded-medium whitespace-nowrap border ${
                String(g.id) === searchParams.genre
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-content2 border-divider text-foreground-400"
              }`}
            >
              {g.name}
            </NextLink>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
}