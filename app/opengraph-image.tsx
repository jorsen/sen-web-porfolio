import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content/get";

export const runtime = "nodejs";
export const alt = "Jorsen Mejia — Website Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const hero = await getContent("hero");

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
          background: "#050816",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,212,255,.18), transparent 40%), radial-gradient(circle at 85% 80%, rgba(121,40,202,.22), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#00d4ff", fontWeight: 600, letterSpacing: 2, marginBottom: 24 }}>
          {hero.availabilityTag.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 900, color: "#fff", letterSpacing: -3 }}>
          {hero.nameFirst}&nbsp;
          <span
            style={{
              backgroundImage: "linear-gradient(135deg,#00d4ff,#7928ca)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {hero.nameLast}
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 42, color: "#8892b0", marginTop: 16 }}>{hero.typewriterPhrases[0]}</div>
      </div>
    ),
    { ...size }
  );
}
