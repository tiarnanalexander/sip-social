#!/usr/bin/env node
/**
 * Builds lib/content/photo-manifest.json (gitignored, regenerated every
 * build) from two inputs:
 *
 *  1. lib/content/photo-manifest.base.json - the hand-curated set, committed
 *     to git. Entries here were cropped carefully (chosen focal point) and
 *     keep their real alt text. This script never touches them.
 *
 *  2. content/photo-uploads/index.json - raw photos Zoe has uploaded through
 *     Tina's "Add New Photos" screen. Tina's media manager commits the raw
 *     file straight to git under public/uploads/, so by the time a build
 *     runs, the file is just sitting in the checkout like any other asset.
 *     For each upload not already in the manifest, this script center-crops
 *     it into the same four variants every other photo on the site has
 *     (wide/ultra/portrait/square) and adds a manifest entry for it, keyed
 *     by a slug of the name Zoe gave it.
 *
 * Why generated rather than committed: the cropped files themselves are
 * written into public/images/photos/ during the build (so this build's
 * deploy serves them correctly) but are never committed back to git - there
 * is no credential-free, loop-safe way for a Vercel build to push a commit
 * of its own. So every build re-derives both the manifest and the crop
 * files fresh from the two inputs above. For the number of photos a small
 * business adds, redoing this work every build costs a couple of seconds -
 * not worth the complexity of trying to cache it across deploys.
 *
 * Auto-cropped photos are always a plain center crop (no chosen focal
 * point) - a reasonable default, not a substitute for the hand-tuned crops
 * in the curated set.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const BASE_MANIFEST_PATH = path.join(ROOT, "lib/content/photo-manifest.base.json");
const OUTPUT_MANIFEST_PATH = path.join(ROOT, "lib/content/photo-manifest.json");
const UPLOADS_DOC_PATH = path.join(ROOT, "content/photo-uploads/index.json");
const PUBLIC_DIR = path.join(ROOT, "public");
const PHOTOS_DIR = path.join(PUBLIC_DIR, "images/photos");

const VARIANTS = {
  wide: { w: 1536, h: 864 },
  ultra: { w: 1536, h: 658 },
  portrait: { w: 1280, h: 1600 },
  square: { w: 1536, h: 1536 },
};

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

function slugify(label) {
  return (
    label
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "photo"
  );
}

function uniqueSlug(base, taken) {
  let slug = base;
  let n = 2;
  while (taken.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

async function run() {
  const base = readJson(BASE_MANIFEST_PATH, {});
  const uploads = readJson(UPLOADS_DOC_PATH, { items: [] });

  const manifest = { ...base };
  const takenSlugs = new Set(Object.keys(manifest));

  if (!uploads.items || uploads.items.length === 0) {
    fs.writeFileSync(OUTPUT_MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
    console.log("[photo-manifest] No uploads to process - wrote the curated manifest as-is.");
    return;
  }

  // Only require sharp if there's actually work to do - keeps the common
  // case (no new uploads) fast and dependency-light.
  const sharp = require("sharp");

  for (const item of uploads.items) {
    if (!item || !item.image || !item.label) {
      console.warn("[photo-manifest] Skipping an upload with no image or no name set yet.");
      continue;
    }

    const slug = uniqueSlug(slugify(item.label), takenSlugs);

    // Skip anything that already matches an existing manifest entry's source
    // file and alt text - avoids pointless reprocessing if this ever runs
    // twice against the same content without new uploads being added.
    const already = manifest[slug];
    if (already && already.source === path.basename(item.image) && already.auto) {
      continue;
    }

    const rawPath = path.join(PUBLIC_DIR, item.image.replace(/^\//, ""));
    if (!fs.existsSync(rawPath)) {
      console.warn(`[photo-manifest] "${item.label}": uploaded file not found at ${rawPath}, skipping.`);
      continue;
    }

    try {
      const variantEntries = {};
      for (const [crop, { w, h }] of Object.entries(VARIANTS)) {
        const outFile = `${slug}-${crop}.jpg`;
        await sharp(rawPath)
          .resize(w, h, { fit: "cover", position: "centre" })
          .jpeg({ quality: 82 })
          .toFile(path.join(PHOTOS_DIR, outFile));
        variantEntries[crop] = { file: outFile, w, h };
      }

      manifest[slug] = {
        alt: item.alt || item.label,
        source: path.basename(item.image),
        auto: true,
        variants: variantEntries,
      };
      takenSlugs.add(slug);
      console.log(`[photo-manifest] Processed "${item.label}" -> ${slug}`);
    } catch (err) {
      console.warn(`[photo-manifest] Failed to process "${item.label}": ${err.message}`);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

run().catch((err) => {
  console.error("[photo-manifest] Fatal error:", err);
  process.exit(1);
});
