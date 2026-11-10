/**
 * Decides whether an image can go through Next's optimizer.
 *
 * `next/image` throws — crashing the page — for remote hosts not listed in
 * `images.remotePatterns` (none are configured), so remote URLs are rendered
 * `unoptimized` instead. Files in /public are always optimizable.
 */
export function isOptimizableImage(src: string): boolean {
  return src.startsWith("/");
}
