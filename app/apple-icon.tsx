import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Same real "S" mark as icon.tsx, scaled up for the iOS home-screen icon
 * (which applies its own rounding, so no border-radius here).
 */
export default function AppleIcon() {
  const mark = readFileSync(join(process.cwd(), "public/images/logo-s.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffbea",
        }}
      >
        <img src={markSrc} width={95} height={150} alt="" />
      </div>
    ),
    size
  );
}
