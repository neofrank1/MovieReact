// app/profile/page.tsx
import SiteNavbar from "@/components/navbar/site-navbar";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserData } from "@/app/(user)/services/user";
import { AtSign, Film, Mail, MessageSquareText, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile - Movie Critique",
  description: "View and manage your profile, reviews, and watchlist.",
};

const myReviews = [
  { movie: "Dune: Part Two", author: "Your review" },
  { movie: "Inside Out 2", author: "Your review" },
  { movie: "The Batman", author: "Your review" },
];

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");
  const userData = await getUserData({ userId: session.user.id });
  const displayName =
    [userData?.first_name, userData?.last_name].filter(Boolean).join(" ") ||
    session.user.name ||
    "Movie fan";
  const username = userData?.name || session.user.name || "movie-fan";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-12">
        <section className="overflow-hidden rounded-large border border-divider bg-content2">
          <div className="h-28 bg-linear-to-r from-primary/35 via-primary/15 to-transparent sm:h-36" />
          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-content2 bg-primary text-3xl font-semibold text-primary-foreground shadow-medium sm:h-28 sm:w-28">
                  {initial}
                </div>
                <div className="pb-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Member profile</p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{displayName}</h1>
                  <p className="mt-1 flex items-center gap-1 text-sm text-foreground-500">
                    <AtSign size={14} />
                    {username}
                  </p>
                </div>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <Star size={14} fill="currentColor" />
                MovieCritique member
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="rounded-large border border-divider bg-content2 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Activity</p>
                <h2 className="mt-1 text-lg font-semibold text-foreground">Recent reviews</h2>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {myReviews.length} reviews
              </span>
            </div>

            <div className="mt-5 divide-y divide-divider border-t border-divider">
              {myReviews.map((review, index) => (
                <article key={review.movie} className="flex items-center gap-4 py-4 first:pt-4">
                  <div className="flex h-14 w-11 shrink-0 items-center justify-center rounded-medium border border-divider bg-background text-primary">
                    <Film size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{review.movie}</p>
                    <p className="mt-1 text-xs text-foreground-500">{review.author}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-warning">
                    <Star size={14} fill="currentColor" />
                    {8 - index / 2}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-large border border-divider bg-content2 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">About</p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">Profile details</h2>
            <dl className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-medium bg-background p-2 text-primary">
                  <Mail size={16} />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-foreground-500">Email address</dt>
                  <dd className="mt-1 truncate text-sm font-medium text-foreground">{userData?.email ?? session.user.email}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-medium bg-background p-2 text-primary">
                  <MessageSquareText size={16} />
                </span>
                <div>
                  <dt className="text-xs text-foreground-500">Community</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">Sharing reviews and recommendations</dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
      </main>
    </>
  );
}
