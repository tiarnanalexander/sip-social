"use client";

import { useState, useCallback, useEffect } from "react";
import { Picture } from "@/components/ui/Picture";
import type { GalleryImage } from "@/lib/content/types";

/**
 * Masonry-ish grid via CSS columns (no JS layout library needed) plus a
 * lightweight lightbox. Featured images span two rows so the strongest
 * shots (hero, portrait, biscuits) get more visual weight without a manual
 * per-image size prop scattered through content.
 */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (d: number) =>
      setOpenIndex((i) => (i === null ? null : (i + d + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {images.map((img, i) => (
          <button
            key={img.base}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group block w-full overflow-hidden rounded-2xl text-left"
            aria-label={`Open photo: ${img.alt}`}
          >
            <Picture
              base={img.base}
              alt={img.alt}
              crop={img.featured ? "portrait" : "square"}
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 94vw"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="on-ink fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 sm:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-cream/80 hover:text-cream"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cream/70 hover:text-cream sm:left-6"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cream/70 hover:text-cream sm:right-6"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative max-h-[82vh] max-w-3xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Picture
              base={images[openIndex]!.base}
              alt={images[openIndex]!.alt}
              crop="portrait"
              sizes="90vw"
              className="max-h-[82vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
