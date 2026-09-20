"use client";

import Link from "next/link";
import { Film, MessageSquareText, Star, Tv } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <footer className="mt-auto border-t border-divider bg-content2/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-medium bg-primary text-primary-foreground">
              <Star size={15} fill="currentColor" />
            </span>
            MovieCritique
          </Link>
          <p className="mt-4 text-sm leading-6 text-foreground-500">
            Discover what to watch next, save your favorites, and share every opinion worth talking about.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/movies" className="inline-flex items-center gap-2 text-foreground-500 transition-colors hover:text-primary">
                <Film size={15} /> Movies
              </Link>
            </li>
            <li>
              <Link href="/tv" className="inline-flex items-center gap-2 text-foreground-500 transition-colors hover:text-primary">
                <Tv size={15} /> TV shows
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="inline-flex items-center gap-2 text-foreground-500 transition-colors hover:text-primary">
                <MessageSquareText size={15} /> Reviews
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Your account</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/login" className="text-foreground-500 transition-colors hover:text-primary">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-foreground-500 transition-colors hover:text-primary">
                Create an account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-divider">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-foreground-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} MovieCritique. Made for movie lovers.</p>
          <p>Created By Neo Frank D. Uy</p>
        </div>
      </div>
    </footer>
  );
}
