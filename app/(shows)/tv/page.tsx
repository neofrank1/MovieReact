// app/tv/page.tsx
import { discoverTV, getTVGenres } from "@/lib/tmdb";
import TVCard from "@/components/tv-card";
import SiteNavbar from "@/components/navbar/site-navbar";
import NextLink from "next/link";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ genre?: string }>;
};


export const metadata: Metadata = {
  title: "Browse TV Shows",
  description:
    "Discover a wide range of movies across various genres. Browse through our collection and find your next favorite film.",
};

export default async function BrowsePage({ searchParams }: Props) {

const { genre } = await searchParams;
const [tvData, genresData] = await Promise.all([
    discoverTV(genre),
    getTVGenres(),
]);

const tv = tvData.results ?? [];
const genres = genresData.genres ?? [];

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-lg font-semibold mb-4">Browse TV Shows</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          <NextLink
            href="/tv"
            className={`text-sm px-4 py-2 rounded-full border transition-colors ${
              !genre
                ? "bg-foreground text-background border-foreground font-medium"
                : "border-divider text-foreground-500 hover:border-foreground-400 hover:text-foreground"
            }`}
          >
            All genres
          </NextLink>
          {genres.map((g: any, i: number) => {
            const active = String(g.id) === genre;
            return (
              <NextLink
                key={g.id}
                href={`/tv?genre=${g.id}`}
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
          {tv.map((tvData: any) => (
            <TVCard key={tvData.id} tv={tvData} />
          ))}
        </div>
      </main>
    </>
  );
}