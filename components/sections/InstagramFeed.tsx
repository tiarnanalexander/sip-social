"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Picture } from "@/components/ui/Picture";
import { site } from "@/lib/site";
import type { GalleryImage } from "@/lib/content/types";

type Item = { id: string; src: string; permalink: string; caption: string };

/**
 * Live feed from @sip_socialuk when INSTAGRAM_ACCESS_TOKEN is configured,
 * falling back to a curated set of the same photos used in the gallery so
 * the section never ships empty. One row drifting continuously (not
 * step-pause-step) — the list is rendered twice back to back and the
 * whole strip translates by exactly one copy's width on a seamless loop,
 * pausing on hover/focus so a caption or link stays readable.
 */
export function InstagramFeed({ fallback }: { fallback: GalleryImage[] }) {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data: { items: Item[] }) => {
        if (!cancelled) setItems(data.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const live = items && items.length >= 6;
  const row: (Item | GalleryImage)[] = live ? items! : fallback;
  const doubled = [...row, ...row];

  return (
    <section className="on-ink overflow-hidden bg-ink py-20 text-cream">
      <div className="shell flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl">Follow along</h2>
          <p className="measure-s mt-3 text-cream/65">
            The latest from events, pop-ups and the cart itself.
          </p>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-cream/30 px-6 py-3 text-sm font-semibold transition-colors hover:border-cream hover:bg-cream hover:text-ink"
        >
          {site.instagramHandle} on Instagram
        </a>
      </div>

      <div className="group/feed relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max animate-ig-marquee gap-4 group-hover/feed:[animation-play-state:paused] group-focus-within/feed:[animation-play-state:paused]">
          {doubled.map((item, i) => {
            const isLive = "permalink" in item;
            return (
              <a
                key={isLive ? `${item.id}-${i}` : `${item.base}-${i}`}
                href={isLive ? item.permalink : site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-hidden={i >= row.length ? "true" : undefined}
                tabIndex={i >= row.length ? -1 : undefined}
                className="group relative block aspect-[3/4] w-[72vw] flex-none overflow-hidden rounded-2xl sm:w-[42vw] md:w-[26vw] lg:w-[18rem]"
              >
                {isLive ? (
                  <Image
                    src={(item as Item).src}
                    alt={(item as Item).caption || "Sip Social on Instagram"}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 768px) 26vw, (min-width: 640px) 42vw, 72vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <Picture
                    base={(item as GalleryImage).base}
                    alt={(item as GalleryImage).alt}
                    crop="portrait"
                    sizes="(min-width: 1024px) 18rem, (min-width: 768px) 26vw, (min-width: 640px) 42vw, 72vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {!live && <span className="sr-only">Instagram feed unavailable — showing recent event photos.</span>}
    </section>
  );
}
