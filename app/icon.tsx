import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Uses the real hand-drawn "S" from the logo (cropped out of logo-mark.png)
 * rather than a system-font letter - a favicon rendered in a generic
 * sans-serif didn't read as the brand at tab/link-preview size.
 */
export default function Icon() {
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
          borderRadius: "50%",
        }}
      >
        <img src={markSrc} width={38} height={60} alt="" />
      </div>
    ),
    size
  );
}
