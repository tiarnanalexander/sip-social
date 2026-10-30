"use client";

import { useEffect, useRef } from "react";

/**
 * iOS Low Power Mode blocks the `autoplay` attribute outright, with no API
 * to detect or override that directly - Apple intentionally disables
 * background video autoplay there to save battery. What it doesn't block is
 * video.play() called from inside a genuine user gesture, so this listens
 * for the visitor's first tap/click anywhere on the page and nudges
 * playback then. It's a harmless no-op everywhere autoplay already worked
 * (play() on an already-playing video does nothing), and it skips the work
 * entirely for prefers-reduced-motion visitors, who see the static poster
 * by design (motion-reduce:hidden on the element below).
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tryPlay = () => {
      video.play().catch(() => {
        /* still blocked - next trigger (or the user's first tap) will retry */
      });
    };

    tryPlay();

    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("touchend", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
    };
    window.addEventListener("touchend", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("click", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("touchend", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      className="h-full w-full object-cover motion-reduce:hidden"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
