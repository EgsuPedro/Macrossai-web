import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "src/assets/brand/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 80px",
        background: "radial-gradient(ellipse at 80% 20%, #0B2238 0%, #071827 65%)",
        color: "#F4FAFF",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} alt="" width={240} height={131} />
      <div style={{ display: "flex", marginTop: 40, fontSize: 40, fontWeight: 700, letterSpacing: 2 }}>
        MACROSS <span style={{ color: "#12D8E8", marginLeft: 14 }}>AI</span>
      </div>
      <div style={{ display: "flex", marginTop: 18, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
        {siteConfig.slogan}
      </div>
      <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#9DB1C5" }}>
        Marketing · Tecnología · Estrategia empresarial · Ecuador
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 6,
          background: "linear-gradient(90deg, #071827, #12D8E8, #43B8D0, #071827)",
        }}
      />
    </div>,
    size,
  );
}
