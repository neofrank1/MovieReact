// components/site-navbar.tsx
"use client";
import { useState } from "react";
import NextLink from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../theme-swtich";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv" },
  { label: "Reviews", href: "/reviews" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 gap-6">
        {/* Brand */}
        <NextLink href="/" className="flex items-center gap-2 font-semibold shrink-0">
          <div className="w-6 h-6 rounded-medium bg-primary flex items-center justify-center text-primary-foreground text-xs">
            ★
          </div>
          MovieCritique
        </NextLink>

        {/* Nav links */}
        <ul className="hidden sm:flex items-center gap-6 text-sm shrink-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NextLink
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-foreground-500 hover:text-foreground transition-colors"
                }
              >
                {link.label}
              </NextLink>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm bg-content2 border border-divider rounded-medium px-3 py-1.5">
          <Search size={15} className="text-foreground-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, TV shows..."
            className="bg-transparent text-sm w-full outline-none placeholder:text-foreground-500"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4 shrink-0">
          <SlidersHorizontal size={17} className="text-foreground-500 hidden sm:block" />
          <Search size={17} className="text-foreground-500 md:hidden" />
          <NextLink href="/profile">
            <div className="w-8 h-8 rounded-full bg-content2 border border-divider" />
          </NextLink>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}