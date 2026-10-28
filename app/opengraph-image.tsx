import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fffbea",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#78621d",
            marginBottom: 28,
          }}
        >
          Mobile coffee cart hire
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            color: "#000",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            maxWidth: 980,
          }}
        >
          <span>Elevating events</span>
          <span>one sip at a time.</span>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 30, color: "#573425" }}>
          sip social
        </div>
      </div>
    ),
    size
  );
}
