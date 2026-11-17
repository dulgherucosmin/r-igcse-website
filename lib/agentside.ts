import type { PrerenderedPage } from "@usenotra/agentside";
import { agentside } from "@usenotra/agentside";
import { sitePages } from "@/lib/site-pages";

export const markdown = agentside({
  routes: Object.fromEntries(
    sitePages.map((page) => [page.path || "/", () => page.markdown()]),
  ),
  skip: ["/api", "/llms.txt", "/llms-full.txt", "/robots.txt", "/sitemap.xml"],
});

export const prerenderedPages = (): PrerenderedPage[] =>
  sitePages.map((page) => ({
    path: page.path || "/",
    title: page.title,
    description: page.description,
    markdown: page.markdown(),
  }));
