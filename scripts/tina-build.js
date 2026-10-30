#!/usr/bin/env node
/**
 * Runs `tinacms build` only when real Tina Cloud credentials are present.
 *
 * Without NEXT_PUBLIC_TINA_CLIENT_ID + TINA_TOKEN set, `tinacms build`
 * hard-fails ("Client not configured properly") rather than degrading
 * gracefully — which would break every Vercel deploy made before the
 * one-time Tina Cloud setup (see README.md) is done. This mirrors how the
 * rest of the site treats optional integrations (Instagram feed, Turnstile):
 * missing config means that feature is off, not a broken build. Until
 * those env vars are set, the site builds and deploys normally; /admin
 * just won't be reachable on the live site yet.
 */
const hasTinaCloud = Boolean(
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN
);

if (!hasTinaCloud) {
  console.log(
    "[tina-build] NEXT_PUBLIC_TINA_CLIENT_ID/TINA_TOKEN not set — skipping `tinacms build`. " +
      "The site will build and deploy normally; /admin won't be live until those are set (see README.md)."
  );
  process.exit(0);
}

const { execSync } = require("node:child_process");
execSync("npx tinacms build", { stdio: "inherit" });
