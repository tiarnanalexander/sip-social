"use client";

import { useState, useId } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/content/types";

export function MobileNav({ items }: { items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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

      {open && (
        <div
          id={panelId}
          className="fixed inset-0 z-40 flex flex-col bg-cream pt-28"
        >
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
      )}
    </div>
  );
}
