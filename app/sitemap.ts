import { siteUrl } from "@portfolio/lib/site";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl.href, changeFrequency: "monthly", priority: 1 }];
}
