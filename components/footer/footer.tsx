import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-separator px-6 py-4">
        <div className="mx-auto max-w-6xl flex justify-between text-xs text-foreground-400">
          <span>© 2026 Reel Talk</span>
          <div className="flex gap-4">
            <Link href="/about" className="text-foreground-400">About</Link>
            <Link href="/privacy" className="text-foreground-400">Privacy</Link>
            <Link href="/contact" className="text-foreground-400">Contact</Link>
          </div>
        </div>
      </footer>
    )
}