// app/profile/page.tsx
import SiteNavbar from "@/components/navbar/site-navbar";

const user = {
  name: "Neo Frank Uy",
  handle: "@neo_frank",
  bio: "Just a movie lover who enjoys good stories, great characters, and even better soundtracks.",
  stats: { reviews: 12, watchlist: 24, followers: 3 },
};

const myReviews = [
  { movie: "Dune: Part Two", author: "Neo Frank Uy" },
  { movie: "Inside Out 2", author: "Jane Dela Cruz" },
  { movie: "The Batman", author: "Mark Santos" },
];

export default function ProfilePage() {
  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-content2 border border-divider" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-foreground-500">{user.handle}</p>
          </div>
        </div>
        <p className="text-sm text-foreground-400 mt-3 max-w-md">{user.bio}</p>

        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          {Object.entries(user.stats).map(([label, value]) => (
            <div key={label} className="bg-content2 border border-divider rounded-medium py-3">
              <p className="text-lg font-semibold">{value}</p>
              <p className="text-xs text-foreground-500 capitalize">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-medium mb-3">My reviews</h2>
          <div className="flex flex-col divide-y divide-divider border-t border-divider">
            {myReviews.map((r) => (
              <div key={r.movie} className="flex items-center gap-3 py-3">
                <div className="w-10 h-14 rounded-medium bg-content2 border border-divider" />
                <div>
                  <p className="text-sm font-medium">{r.movie}</p>
                  <p className="text-xs text-foreground-500">{r.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}