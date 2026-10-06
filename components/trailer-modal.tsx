"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { buttonVariants } from "@heroui/styles";

type TrailerModalProps = {
  title: string;
  trailerKey?: string;
};

export default function TrailerModal({ title, trailerKey }: TrailerModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  if (!trailerKey) {
    return (
      <button
        type="button"
        disabled
        title="Trailer unavailable"
        className={buttonVariants({ variant: "primary", size: "sm" })}
      >
        Watch trailer
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonVariants({ variant: "primary", size: "sm" })}
      >
        Watch trailer
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-large bg-content1 shadow-large"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} trailer`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-base font-semibold">{title} trailer</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-medium p-1 text-foreground-400 hover:bg-content2 hover:text-foreground"
                aria-label="Close trailer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerKey)}?autoplay=1&rel=0`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
