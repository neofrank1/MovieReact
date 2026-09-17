// app/tv/page.tsx
import { discoverTV, getGenres } from "@/lib/tmdb";
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
    getGenres(),
]);

const tv = tvData.results ?? [];
const genres = genresData.genres ?? [];

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-lg font-semibold mb-4">Browse TV Shows</h1>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <NextLink
            href="/tv"
            className={`text-xs px-3 py-1.5 rounded-medium whitespace-nowrap border ${
              !genre
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-content2 border-divider text-foreground-400"
            }`}
          >
            All
          </NextLink>
          {genres.map((g: any) => (
            <NextLink
              key={g.id}
              href={`/tv?genre=${g.id}`}
              className={`text-xs px-3 py-1.5 rounded-medium whitespace-nowrap border ${
                String(g.id) === genre
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-content2 border-divider text-foreground-400"
              }`}
            >
              {g.name}
            </NextLink>
          ))}
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