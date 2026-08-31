import Navbar from "@/components/navbar/navbar";
import IndexLayout from "@/components/layout/index_layout";
import Footer from "@/components/footer/footer";
import { Link, Card } from "@heroui/react";
import { Star } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";
import { buttonVariants } from "@heroui/styles";

const trending = [
  { title: "Cinder", rating: 7.9 },
  { title: "Low Tide", rating: 6.4 },
  { title: "Orbit", rating: 8.2 },
  { title: "The Quiet Hour", rating: 7.1 },
  { title: "Wildfire", rating: 9.0 },
  { title: "Static", rating: 6.8 },
];

const latestReviews = [
  { title: "Cinder", author: "Jamie Lee", time: "3 days ago" },
  { title: "Orbit", author: "Alex Chan", time: "5 days ago" },
  { title: "Wildfire", author: "Priya Nair", time: "1 week ago" },
];


export default function Home() {
  return (
    <>
      <Navbar />
      <IndexLayout>
     {/* Featured hero */}
        <section className="relative h-56 mt-6 rounded-large flex items-end p-6 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/midnight-ledger-backdrop.jpg"
          alt="Midnight Ledger movie backdrop"
          fill
          priority
          className="object-cover"
        />

        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-warning/20 text-warning-700 text-xs font-medium px-3 py-1 rounded-full">
          <Star size={12} /> 8.7
        </div>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-xs text-white/70 mb-1">Featured review</p>
          <h1 className="text-2xl font-semibold text-white">Midnight Ledger</h1>
          <p className="text-sm text-white/80 max-w-md mt-1">
            A slow-burn thriller that trades spectacle for dread — and earns it.
          </p>
          <NextLink
            href="/reviews/midnight-ledger"
            className={`${buttonVariants({ variant: "primary", size: "sm" })} mt-3 inline-flex`}
          >
            Read review
          </NextLink>
        </div>
      </section>

        {/* Trending strip */}
        <section className="mt-10">
          <h2 className="text-sm font-medium mb-3">Trending this week</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {trending.map((movie) => (
              <Link key={movie.title} href={`/movies/${movie.title.toLowerCase()}`}>
                <div className="aspect-[2/3] bg-content2 border border-divider rounded-medium hover:border-foreground-300 transition-colors" />
                <p className="text-xs text-foreground-500 mt-1 flex items-center gap-1">
                  <Star size={11} /> {movie.rating}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest reviews */}
        <section className="mt-10 pb-16">
          <h2 className="text-sm font-medium mb-3">Latest reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {latestReviews.map((r) => (
              <Card key={r.title} className="overflow-hidden">
                <div className="aspect-video bg-content2" />
                <Card.Content className="gap-1">
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="text-xs text-foreground-500">
                    by {r.author} · {r.time}
                  </p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </section>
      </IndexLayout>
      <Footer/>
    </>
  );
}
