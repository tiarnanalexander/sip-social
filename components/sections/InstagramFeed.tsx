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
 * the section never ships empty. Two rows drift in opposite directions on
 * a CSS animation (no JS scroll-loop, no layout thrash) and pause on
 * hover/focus so captions stay readable.
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
  const rowA = live ? items!.slice(0, Math.ceil(items!.length / 2)) : fallback.slice(0, 9);
  const rowB = live ? items!.slice(Math.ceil(items!.length / 2)) : fallback.slice(8, 17);

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

      <div className="group/feed relative mt-12 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <Marquee items={rowA} direction="left" live={!!live} />
        <Marquee items={rowB} direction="right" live={!!live} className="mt-4" />
      </div>
    </section>
  );
}

function Marquee({
  items,
  direction,
  live,
  className = "",
}: {
  items: (Item | GalleryImage)[];
  direction: "left" | "right";
  live: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover/feed:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => {
          const isLive = "permalink" in item;
          return (
            <a
              key={`${isLive ? item.id : item.base}-${i}`}
              href={isLive ? item.permalink : site.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative block h-40 w-40 flex-none overflow-hidden rounded-xl sm:h-48 sm:w-48"
            >
              {isLive ? (
                <Image
                  src={(item as Item).src}
                  alt={(item as Item).caption || "Sip Social on Instagram"}
                  fill
                  sizes="192px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
              ) : (
                <Picture
                  base={(item as GalleryImage).base}
                  alt={(item as GalleryImage).alt}
                  crop="square"
                  sizes="192px"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cream">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>
      {!live && <span className="sr-only">Instagram feed unavailable — showing recent event photos.</span>}
    </div>
  );
}
