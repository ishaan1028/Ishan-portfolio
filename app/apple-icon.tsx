import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// PNG version of app/icon.svg for iOS home screens and Safari, built once at build time.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // iOS rounds the corners itself, so the PNG must be a full square.
  const svg = readFileSync(join(process.cwd(), "app/icon.svg"), "utf8").replace(
    /rx="15"/g,
    'rx="0"',
  );

  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
      width={size.width}
      height={size.height}
      alt=""
    />,
    size,
  );
}
