import { Clapperboard, Star } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-divider bg-content2 shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-foreground p-10 text-background lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,208,0,0.38),transparent_34%)]" />
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Clapperboard size={19} />
              </span>
              MovieCritique
            </Link>
            <div className="mt-24 max-w-xs">
              <p className="text-sm font-medium text-primary">DISCOVER MORE</p>
              <h2 className="mt-3 text-4xl font-bold leading-tight">Every great movie deserves a great conversation.</h2>
              <p className="mt-5 text-sm leading-6 text-background/70">
                Track favorites, discover fresh picks, and share your take with other movie lovers.
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3 text-sm text-background/75">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 bg-background/10 text-primary">
              <Star size={16} fill="currentColor" />
            </span>
            Your next favorite is waiting.
          </div>
        </section>

        <section className="flex min-h-[560px] items-center p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-sm">{children}</div>
        </section>
      </div>
    </main>
  );
}
