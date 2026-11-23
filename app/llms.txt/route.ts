import { llmsTxt } from "@usenotra/agentside/build";
import { SITE_URL } from "@/lib/config";
import { llmsPages } from "@/lib/llms";
import { community } from "@/lib/site-pages";

export async function GET() {
  const pages = await llmsPages();
  const body = llmsTxt(
    pages.map((page) => ({ ...page, markdown: "" })),
    {
      title: "r/IGCSE",
      description:
        "Free, student-made IGCSE, O Level and AS/A Level study resources from the r/IGCSE community.",
      siteUrl: SITE_URL,
      sections: { "/resources": "Resources" },
      links: {
        Community: community.map((link) => ({
          title: link.title,
          url: link.href,
        })),
        Optional: [
          {
            title: "Full site content",
            url: `${SITE_URL}/llms-full.txt`,
            description: "Every page above in a single Markdown file.",
          },
        ],
      },
    },
  );

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
