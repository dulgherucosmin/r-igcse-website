import { pageUrl, sitePages } from "@/lib/site-pages";

export function GET() {
  const body = sitePages
    .map((page) => `Source: ${pageUrl(page)}\n\n${page.markdown()}`)
    .join("\n---\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
