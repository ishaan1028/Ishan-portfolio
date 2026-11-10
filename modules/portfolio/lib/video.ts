/** Returns the video id for youtu.be, youtube.com/watch, /embed and /shorts URLs, else null. */
export function getYouTubeId(url: string): string | null {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    const host = hostname.replace(/^(www|m)\./, "");
    if (host === "youtu.be") return pathname.slice(1).split("/")[0] || null;
    if (host !== "youtube.com" && host !== "youtube-nocookie.com") return null;
    if (pathname === "/watch") return searchParams.get("v");
    const [, kind, id] = pathname.split("/");
    return (kind === "embed" || kind === "shorts") && id ? id : null;
  } catch {
    return null;
  }
}
