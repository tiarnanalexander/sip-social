import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#000",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.04em",
          }}
        >
          S
        </div>
      </div>
    ),
    size
  );
}
