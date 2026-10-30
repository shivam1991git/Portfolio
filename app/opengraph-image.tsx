import { ImageResponse } from "next/og";

export const alt = "Shivam Singh — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0b",
          color: "#ededef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: "#82828c", letterSpacing: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#ff6b3d" }} />
          <span style={{ marginLeft: 16 }}>FULL STACK DEVELOPER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Shivam Singh</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#a1a1aa" }}>
            React · Next.js · Node.js · NestJS · MongoDB
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#ff6b3d", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
