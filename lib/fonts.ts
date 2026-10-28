import localFont from "next/font/local";

/**
 * Self-hosted via next/font/local rather than next/font/google: identical
 * runtime behaviour (zero layout shift, preloaded, no third-party request
 * at render time) but the woff2 files are vendored into the repo, so the
 * build never depends on reaching fonts.googleapis.com. Files sourced from
 * the @fontsource npm packages (see package.json) and copied in once -
 * safe because both are the exact same files Google Fonts serves.
 *
 * Fredoka matches the brand's existing wordmark almost exactly - heavy,
 * rounded, friendly, no sharp terminals. Using the same letterform family
 * as the logo rather than inventing a second display voice.
 */
export const fontDisplay = localFont({
  src: [
    { path: "./fonts-files/fredoka-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts-files/fredoka-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts-files/fredoka-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-fredoka",
  display: "swap",
});

/**
 * The "SOCIAL" lockup and all body copy on the brand sheet is a geometric
 * grotesque. Plus Jakarta Sans is the closest open license match - similar
 * x-height, similar single-storey a/g warmth - without being Poppins
 * (too ubiquitous) or Inter (too neutral for a brand this playful).
 */
export const fontSans = localFont({
  src: [
    { path: "./fonts-files/jakarta-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts-files/jakarta-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts-files/jakarta-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts-files/jakarta-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});
