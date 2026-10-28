"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string;
      remove: (id: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile, loaded only when a site key is configured. Renders
 * nothing (not even a placeholder) when the env var is absent, so the form
 * works in local/dev before that's set up — the server action is the real
 * backstop either way.
 */
export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!siteKey) return;
    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      document.body.appendChild(script);
    }
    let widgetId: string | undefined;
    const tryRender = () => {
      if (window.turnstile && ref.current && !widgetId) {
        widgetId = window.turnstile.render(ref.current, { sitekey: siteKey });
      }
    };
    const interval = setInterval(tryRender, 200);
    return () => {
      clearInterval(interval);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey]);

  if (!siteKey) return null;
  return <div ref={ref} id={id} className="mt-2" />;
}
