import { portfolioContent } from "@portfolio/lib/content";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

// Link preview card for LinkedIn, X, Slack etc. Built once at build time.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${portfolioContent.profile.name} — ${portfolioContent.profile.role}`;

export default async function OpenGraphImage() {
  const { profile } = portfolioContent;
  // The image renderer can't read WebP, so local portraits are converted to PNG first.
  const portrait = profile.avatarUrl?.startsWith("/")
    ? `data:image/png;base64,${(
        await sharp(join(process.cwd(), "public", profile.avatarUrl))
          .resize(640)
          .png()
          .toBuffer()
      ).toString("base64")}`
    : profile.avatarUrl;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 64,
        padding: "72px 80px",
        color: "#edeff4",
        backgroundColor: "#08090c",
        backgroundImage:
          "radial-gradient(circle at 18% 0%, rgba(139,139,245,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.18), transparent 50%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            fontSize: 28,
            fontWeight: 700,
            color: "#fff",
            backgroundImage: "linear-gradient(135deg, #5B5BD6, #0EA5E9)",
          }}
        >
          ID
        </div>
        <div style={{ marginTop: 40, fontSize: 72, fontWeight: 700 }}>
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 44,
            fontWeight: 700,
            backgroundImage: "linear-gradient(120deg, #8b8bf5, #38bdf8)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {`builds ${profile.headline}`}
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#939bab" }}>
          {`${profile.role} · ${profile.location}`}
        </div>
      </div>

      {portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={portrait}
          alt=""
          width={320}
          height={400}
          style={{
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: 32,
            border: "8px solid #1d212a",
          }}
        />
      ) : null}
    </div>,
    size,
  );
}
