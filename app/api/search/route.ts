import { searchMulti } from "@/lib/tmdb";

type TmdbSearchResult = {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return Response.json({ results: [] });
  }

  try {
    const data = await searchMulti(query);
    const results = (data.results ?? [])
      .filter((item: TmdbSearchResult) => item.media_type === "movie" || item.media_type === "tv")
      .slice(0, 8)
      .map((item: TmdbSearchResult) => ({
        id: item.id,
        mediaType: item.media_type,
        title: item.title ?? item.name ?? "Untitled",
        posterPath: item.poster_path ?? null,
        year: (item.release_date ?? item.first_air_date ?? "").slice(0, 4),
        rating: item.vote_average ?? 0,
        href: item.media_type === "tv" ? `/tv/${item.id}` : `/movies/${item.id}`,
      }));

    return Response.json({ results });
  } catch {
    return Response.json(
      { error: "Search is temporarily unavailable.", results: [] },
      { status: 500 }
    );
  }
}