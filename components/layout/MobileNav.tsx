"use client";

import { useEffect, useState, useId } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { NavLink } from "@/lib/content/types";

export function MobileNav({ items }: { items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Let Escape close the panel too, since the header's own hamburger button
  // (now visually an X) sits underneath this panel - see the note on the
  // close button below for why a second, portaled close control exists.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const panel = open && (
    <div id={panelId} className="fixed inset-0 z-[100] flex flex-col bg-cream pt-28">
      {/*
       * A second close control, rendered here rather than relying on the
       * header's hamburger-turned-X: that button sits inside <header>,
       * which has its own stacking context (sticky + z-40) capped below
       * this panel's z-[100], so once the panel is open it's painted
       * entirely over the header and the X underneath is invisible and
       * unclickable. Easiest fix is a close button that's actually part of
       * this panel's own stacking context, in the same spot the hamburger
       * sits in the header.
       */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className="absolute right-5 top-[1.125rem] flex h-11 w-11 items-center justify-center"
      >
        <span className="relative block h-6 w-6">
          <span className="absolute left-0 top-1/2 block h-[2.5px] w-6 -translate-y-1/2 rotate-45 rounded-full bg-ink" />
          <span className="absolute left-0 top-1/2 block h-[2.5px] w-6 -translate-y-1/2 -rotate-45 rounded-full bg-ink" />
        </span>
      </button>

      <nav aria-label="Mobile" className="shell flex flex-col gap-1">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="rise border-b border-cream-edge py-4 font-display text-3xl"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/enquire"
          onClick={() => setOpen(false)}
          className="rise mt-6 inline-flex w-fit items-center rounded-full bg-ink px-6 py-3 font-semibold text-cream"
          style={{ animationDelay: `${items.length * 0.05}s` }}
        >
          Check availability
        </Link>
      </nav>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          className={`block h-[2.5px] w-6 rounded-full bg-ink transition-transform duration-300 ${
            open ? "translate-y-[7.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2.5px] w-6 rounded-full bg-ink transition-opacity duration-200 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-[2.5px] w-6 rounded-full bg-ink transition-transform duration-300 ${
            open ? "-translate-y-[7.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/*
       * Rendered through a portal into document.body rather than in place:
       * the header has backdrop-blur (a backdrop-filter), and a
       * backdrop-filter/filter ancestor becomes the containing block for a
       * `position: fixed` descendant instead of the viewport. Left in
       * place, this panel was being squashed into the header's own ~80px
       * strip rather than covering the screen - which is why it looked
       * broken/transparent and the links underneath weren't reachable.
       */}
      {mounted && panel && createPortal(panel, document.body)}
    </div>
  );
}
