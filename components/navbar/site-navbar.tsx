// components/site-navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
// import { Star } from "lucide-react";
import { LogOut, Search, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ThemeSwitch from "../theme-switch";
import TmdbRating from "@/components/tmdb-rating";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv" },
  // { label: "Reviews", href: "/reviews" },
];

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type SearchResult = {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string | null;
  year: string;
  rating: number;
  href: string;
};

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const isAuthed = !isPending && !!session?.user;
  const trimmedQuery = query.trim();
  const canShowSearchDropdown = isSearchFocused && trimmedQuery.length >= 2;

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }

      if (!searchRef.current?.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Search is temporarily unavailable.");
        }

        setSearchResults(data.results ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSearchResults([]);
          setSearchError("Search is temporarily unavailable.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [trimmedQuery]);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsProfileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeSearch = () => {
    setIsSearchFocused(false);
    setIsSearchOpen(false);
  };

  const searchInput = (autoFocus = false) => (
    <>
      <Search size={15} className="text-foreground-500 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        placeholder="Search for movies, TV shows..."
        autoFocus={autoFocus}
        className="bg-transparent text-sm w-full outline-none placeholder:text-foreground-500"
      />
    </>
  );

  const searchDropdown = (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-medium border border-divider bg-background shadow-large">
      {isSearching ? (
        <div className="px-3 py-3 text-sm text-foreground-500">Searching...</div>
      ) : searchError ? (
        <div className="px-3 py-3 text-sm text-danger">{searchError}</div>
      ) : searchResults.length > 0 ? (
        <ul className="max-h-96 overflow-y-auto p-1">
          {searchResults.map((result) => (
            <li key={`${result.mediaType}-${result.id}`}>
              <NextLink
                href={result.href}
                onClick={closeSearch}
                className="flex items-center gap-3 rounded-small px-2 py-2 hover:bg-content2 transition-colors"
              >
                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-small bg-content2 border border-divider">
                  {result.posterPath ? (
                    <Image
                      src={`${IMAGE_BASE}${result.posterPath}`}
                      alt={result.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-foreground-500">
                      N/A
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-foreground">
                    {result.title}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground-500">
                    {result.mediaType === "movie" ? "Movie" : "TV Show"}
                    {result.year ? ` • ${result.year}` : ""}
                  </p>
                  <TmdbRating rating={result.rating} compact className="mt-1 text-xs" />
                  {/*
                  Future user rating:
                  <p className="mt-1 flex items-center gap-1 text-xs text-warning">
                    <Star size={11} fill="currentColor" />
                    Your rating
                  </p>
                  */}
                </div>
              </NextLink>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-3 py-3 text-sm text-foreground-500">
          No results found.
        </div>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 gap-3 sm:gap-6">
        {/* Mobile menu toggle + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <NextLink href="/" className="flex items-center gap-2 font-semibold">
            <div className="w-6 h-6 rounded-medium bg-primary flex items-center justify-center text-primary-foreground text-xs shrink-0">
              ★
            </div>
            <span className="hidden sm:inline">MovieCritique</span>
          </NextLink>
        </div>

        {/* Nav links — desktop only */}
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

        {/* Search — desktop inline */}
        <div ref={searchRef} className="relative hidden md:block flex-1 max-w-sm">
          <div className="flex items-center gap-2 bg-content2 border border-divider rounded-medium px-3 py-1.5">
            {searchInput()}
          </div>
          {canShowSearchDropdown && searchDropdown}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthed ? (
            <>
              <button
                className="md:hidden"
                aria-label="Search"
                onClick={() => setIsSearchOpen((v) => !v)}
              >
                <Search size={17} className="text-foreground-500" />
              </button>

              <div ref={profileMenuRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
                  className="flex items-center gap-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Open account menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  {session!.user.image ? (
                    <img
                      src={session!.user.image}
                      alt={session!.user.name ?? "Profile"}
                      className="w-8 h-8 rounded-full object-cover border border-divider"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-content2 border border-divider flex items-center justify-center text-xs font-medium">
                      {session!.user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-medium border border-divider bg-background p-1 shadow-large">
                    <NextLink
                      href={`/profile/${session!.user.id}`}
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="block rounded-small px-3 py-2 text-sm hover:bg-content2"
                    >
                      Profile
                    </NextLink>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-small px-3 py-2 text-sm text-danger hover:bg-danger/10"
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : isPending ? (
            <div className="w-8 h-8 rounded-full bg-content2 border border-divider animate-pulse" />
          ) : (
            <>
              <button
                className="md:hidden"
                aria-label="Search"
                onClick={() => setIsSearchOpen((v) => !v)}
              >
                <Search size={17} className="text-foreground-500" />
              </button>

              <NextLink
                href="/login"
                className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full bg-accent text-background hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                Login
              </NextLink>
              <NextLink
                href="/signup"
                className="text-sm font-medium px-4 py-2 rounded-full border border-divider text-foreground hover:border-foreground-400 transition-colors whitespace-nowrap"
              >
                Sign up
              </NextLink>
            </>
          )}

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-divider" />

          {/* Theme switch — always last, both auth states */}
          <ThemeSwitch />
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div ref={searchRef} className="md:hidden border-t border-divider px-4 py-3">
          <div className="flex items-center gap-2 bg-content2 border border-divider rounded-medium px-3 py-2">
            {searchInput(true)}
          </div>
          <div className="relative">{canShowSearchDropdown && searchDropdown}</div>
        </div>
      )}

      {/* Mobile nav menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-divider px-4 py-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NextLink
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm ${
                    pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-foreground-500"
                  }`}
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}