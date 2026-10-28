import { NextResponse } from "next/server";

export const revalidate = 3600; // one hour - this is a marketing feed, not live data

type InstagramMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

/**
 * Proxies the Instagram Graph API so the long-lived access token never
 * reaches the browser. Returns an empty array (not an error) when no token
 * is configured yet, so InstagramFeed can fall back to curated photos
 * without the client needing to distinguish "not set up" from "API down".
 */
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ items: [], configured: false });
  }

  try {
    const url =
      `https://graph.instagram.com/me/media` +
      `?fields=id,media_type,media_url,thumbnail_url,permalink,caption` +
      `&limit=12&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ items: [], configured: true, error: res.status });
    }
    const data: { data: InstagramMedia[] } = await res.json();
    const items = (data.data ?? [])
      .filter((m) => m.media_type !== "VIDEO")
      .slice(0, 9)
      .map((m) => ({
        id: m.id,
        src: m.media_type === "CAROUSEL_ALBUM" ? m.thumbnail_url ?? m.media_url : m.media_url,
        permalink: m.permalink,
        caption: m.caption?.slice(0, 120) ?? "",
      }));
    return NextResponse.json({ items, configured: true });
  } catch {
    return NextResponse.json({ items: [], configured: true, error: "fetch_failed" });
  }
}
