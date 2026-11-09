import type { Metadata } from "next";
import { sitePages } from "@/lib/site-pages";

export function pageMetadata(path: string): Metadata {
  const page = sitePages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No site page for metadata: ${path}`);
  return {
    title: page.title.includes("r/IGCSE")
      ? { absolute: page.title }
      : page.title,
    description: page.description,
    alternates: { canonical: path || "/" },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path || "/",
    },
  };
}
