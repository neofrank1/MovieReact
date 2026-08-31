// components/site-navbar.tsx
"use client";

import { useState } from "react";
import { Link, Button, Input } from "@heroui/react";
import { Search, Bell, Film, Menu, X } from "lucide-react";
import NextLink from "next/link";
import { buttonVariants } from "@heroui/styles";

const navLinks = [
  { label: "Movies", href: "/movies" },
  { label: "TV shows", href: "/tv" },
  { label: "Reviews", href: "/reviews" },
  { label: "Lists", href: "/lists" },
  { label: "Community", href: "/community" },
];

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand + mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <Film size={20} />
            Reel Talk
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden gap-6 sm:flex">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={i === 0 ? "font-medium text-foreground" : "text-foreground-500"}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Input
            placeholder={`Search movies...`}
            size="sm"
            className="hidden md:flex w-52"
          />
          { /*<Bell size={18} className="text-foreground-500" /> */}
          <NextLink href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Sign in
          </NextLink>
          <NextLink href="/signup" className={buttonVariants({ variant: "primary", size: "sm" })}>
            Sign up
          </NextLink>
        </div>
      </div>{/* <-- this closing tag was missing */}

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-separator px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 text-base ${
                    i === 0 ? "font-medium text-foreground" : "text-foreground-500"
                  }`}
                  onPress={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button as={Link} variant="ghost" href="/login" fullWidth className="mt-3">
            Sign in
          </Button>
        </div>
      )}
    </nav>
  );
}