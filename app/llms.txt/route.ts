import { createLlmsTxtHandler } from "@dualmark/nextjs";
import { SITE_URL } from "@/lib/config";
import { community, markdownUrl, sitePages } from "@/lib/site-pages";

const handler = createLlmsTxtHandler({
  brandName: "r/IGCSE",
  description:
    "Free, student-made IGCSE, O Level and AS/A Level study resources from the r/IGCSE community.",
  sections: [
    {
      title: "Pages",
      links: sitePages.map((page) => ({
        title: page.title,
        href: markdownUrl(page),
        description: page.description,
      })),
    },
    {
      title: "Community",
      links: community,
    },
    {
      title: "Optional",
      links: [
        {
          title: "Full site content",
          href: `${SITE_URL}/llms-full.txt`,
          description: "Every page above in a single Markdown file.",
        },
      ],
    },
  ],
});

export const GET = handler.GET;
