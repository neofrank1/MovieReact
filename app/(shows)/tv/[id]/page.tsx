// app/movies/[id]/page.tsx
import Image from "next/image";
// import { Star } from "lucide-react";
import { buttonVariants } from "@heroui/styles";
import { getTV, IMAGE_BASE } from "@/lib/tmdb";
import SiteNavbar from "@/components/navbar/site-navbar";
import TVCard from "@/components/tv-card";
import TVTabs from "@/components/tv-tabs";
import TrailerModal from "@/components/trailer-modal";
import TmdbRating from "@/components/tmdb-rating";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTVShowReviews, checkTVShowReviewed } from "../../actions/showActions";

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const tvData = await getTV(param.id);

  return {
    title: tvData.name,
    description: tvData.overview,
    openGraph: {
      title: tvData.name,
      description: tvData.overview,
      images: [
        {
          url: `${IMAGE_BASE}${tvData.poster_path}`,
          width: 500,
          height: 750,
        },
      ],
    },
  };
}

export default async function TVDetailsPage({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const param = await params;
  const data = await getTV(param.id);
  const dbReviews = await getTVShowReviews(param.id);
  const reviewResult = await checkTVShowReviewed(String(data.id), String(session?.user.id));
  const reviews = dbReviews.map((review) => ({
    id: String(review.id),
    author: review.user.name || "Movie fan",
    content: review.comment,
    created_at: "",
    author_details: { rating: review.rating, userId: String(review.user.id) },
  }));
  const director = data.credits?.crew?.find((c: any) => c.job === "Director");
  const cast = data.credits?.cast?.slice(0, 20) ?? [];
  const trailer = data.videos?.results?.find(
    (video: { site?: string; type?: string; key?: string }) =>
      video.site === "YouTube" && video.type === "Trailer"
  );
  const regularSeasons =
    data.seasons?.filter((season: { season_number?: number }) => season.season_number !== 0) ?? [];
  const seasons = regularSeasons.length > 0 ? regularSeasons : data.seasons ?? [];

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <div className="relative aspect-[2/3] rounded-large overflow-hidden bg-content2">
          {data.poster_path && (
            <Image
              src={`${IMAGE_BASE}${data.poster_path}`}
              alt={data.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <TmdbRating
            rating={data.vote_average}
            voteCount={data.vote_count}
            className="mt-2 text-sm"
          />
          {/*
          Future user rating:
          <p className="mt-2 flex items-center gap-1 text-sm text-warning">
            <Star size={14} fill="currentColor" />
            Your rating
          </p>
          */}
          <div className="flex gap-2 mt-3">
            {data.genres?.map((g: any) => (
              <span
                key={g.id}
                className="text-xs px-2.5 py-1 rounded-medium bg-content2 border border-divider text-foreground-400"
              >
                {g.name}
              </span>
            ))}
          </div>
          <div className="mt-4 max-w-xl space-y-3 text-sm">
            <div>
              <p className="text-foreground-500 mb-1">Number of seasons</p>
              <p className="font-medium text-foreground">
                {data.number_of_seasons ?? seasons.length}{" "}
                {(data.number_of_seasons ?? seasons.length) === 1 ? "season" : "seasons"}
              </p>
            </div>
            <div>
              <p className="text-foreground-500 mb-1">Episodes per season</p>
              <div className="flex flex-wrap gap-2">
                {seasons.length > 0 ? (
                  seasons.map(
                    (season: {
                      id: number;
                      name?: string;
                      season_number?: number;
                      episode_count?: number;
                    }) => (
                      <span
                        key={season.id}
                        className="rounded-medium border border-divider bg-content2 px-2.5 py-1 text-xs text-foreground-400"
                      >
                        {season.name ?? `Season ${season.season_number}`}:{" "}
                        {season.episode_count ?? 0}{" "}
                        {(season.episode_count ?? 0) === 1 ? "episode" : "episodes"}
                      </span>
                    )
                  )
                ) : (
                  <span className="text-foreground-400">No season details available.</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <TrailerModal title={data.name} trailerKey={trailer?.key} />
            <button className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Add to watchlist
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-xs">
            <div>
              <p className="text-foreground-500 mb-1">Director</p>
              <p>{director?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-foreground-500 mb-1">Cast</p>
              <p>{cast.map((c: any) => c.name).join(", ") || "—"}</p>
            </div>
            <div>
              <p className="text-foreground-500 mb-1">First Air Date</p>
              <p>{data.first_air_date}</p>
            </div>
          </div>
        </div>
      </main>

      <section className="mx-auto w-full max-w-6xl px-6">
        <TVTabs tv={data} reviews={reviews} reviewed={reviewResult}/>
      </section>

      {data.similar?.results?.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-10">
          <h2 className="text-sm font-medium mb-3">Similar TV Shows</h2>
          <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-[repeat(5,minmax(0,1fr))]">
            {data.similar.results.slice(0, 5).map((m: any) => (
              <TVCard key={m.id} tv={m} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}