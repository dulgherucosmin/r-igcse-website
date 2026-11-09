import type { MetadataRoute } from "next";
import { pageUrl, sitePages } from "@/lib/site-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: pageUrl(page),
    priority: page.priority,
  }));
}
