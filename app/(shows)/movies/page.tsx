// app/movies/page.tsx
import { discoverMovies, getGenres } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";
import SiteNavbar from "@/components/navbar/site-navbar";
import NextLink from "next/link";
import type { Metadata } from "next";
import PaginationComponent from "@/components/pagination";

export const metadata: Metadata = {
  title: "Browse Movies",
  description:
    "Discover a wide range of movies across various genres. Browse through our collection and find your next favorite film.",
};

type Props = {
  searchParams: Promise<{ genre?: string }>;
};


export default async function BrowsePage({ searchParams }: Props) {
  const { genre } = await searchParams;
  const [moviesData, genresData] = await Promise.all([
    discoverMovies(genre),
    getGenres(),
  ]);
  const movies = moviesData.results ?? [];
  const genres = genresData.genres ?? [];

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-lg font-semibold mb-4">Browse movies</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          <NextLink
            href="/movies"
            className={`text-sm px-4 py-2 rounded-full border transition-colors ${
              !searchParams.genre
                ? "bg-foreground text-background border-foreground font-medium"
                : "border-divider text-foreground-500 hover:border-foreground-400 hover:text-foreground"
            }`}
          >
            All genres
          </NextLink>
          {genres.map((g: any, i: number) => {
            const active = String(g.id) === searchParams.genre;
            return (
              <NextLink
                key={g.id}
                href={`/movies?genre=${g.id}`}
                style={{ transform: i % 3 === 1 ? "translateY(3px)" : undefined }}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  active
                    ? "bg-foreground text-background border-foreground font-medium"
                    : "border-divider text-foreground-500 hover:border-foreground-400 hover:text-foreground"
                }`}
              >
                {g.name}
              </NextLink>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
            <PaginationComponent/>
        </div>
      </main>
    </>
  );
}