import type { DualmarkNextConfig } from "@dualmark/nextjs";
import { SITE_URL } from "@/lib/config";
import { sitePages } from "@/lib/site-pages";

export const dualmarkConfig: DualmarkNextConfig = {
  siteUrl: SITE_URL,
  staticPages: sitePages.map((page) => ({
    pattern: page.path || "/",
    render: page.markdown,
  })),
  middleware: {
    skipPaths: ["/api", "/llms-full.txt", "/robots.txt", "/sitemap.xml"],
  },
};
