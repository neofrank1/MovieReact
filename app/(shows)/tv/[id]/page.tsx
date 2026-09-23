// app/movies/[id]/page.tsx
import Image from "next/image";
import { Star } from "lucide-react";
import { buttonVariants } from "@heroui/styles";
import { getTV, IMAGE_BASE } from "@/lib/tmdb";
import SiteNavbar from "@/components/navbar/site-navbar";
import TVCard from "@/components/tv-card";
import TVTabs from "@/components/tv-tabs";
import TrailerModal from "@/components/trailer-modal";
import type { Metadata } from "next";

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
  const param = await params;
  const data = await getTV(param.id);
  console.log("TV Data:", data); // Debugging line to check the fetched data
  const director = data.credits?.crew?.find((c: any) => c.job === "Director");
  const cast = data.credits?.cast?.slice(0, 20) ?? [];
  const trailer = data.videos?.results?.find(
    (video: { site?: string; type?: string; key?: string }) =>
      video.site === "YouTube" && video.type === "Trailer"
  );

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
          <p className="flex items-center gap-1 text-sm text-warning mt-2">
            <Star size={14} fill="currentColor" />
            {data.vote_average.toFixed(1)}/10
            <span className="text-foreground-500">
              ({data.vote_count.toLocaleString()} reviews)
            </span>
          </p>
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
          <p className="text-sm text-foreground-400 mt-4 max-w-xl">
            {data.overview}
          </p>

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
        <TVTabs tv={data} />
      </section>

      {data.similar?.results?.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-10">
          <h2 className="text-sm font-medium mb-3">Similar datas</h2>
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
