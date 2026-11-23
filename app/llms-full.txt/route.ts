import { llmsFullTxt } from "@usenotra/agentside/build";
import { SITE_URL } from "@/lib/config";
import { llmsPages } from "@/lib/llms";
import { pageMarkdown } from "@/lib/markdown";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const pages = await Promise.all(
    (await llmsPages()).map(async (page) => ({
      ...page,
      markdown: await pageMarkdown(origin, page.path).catch(() => null),
    })),
  );

  const body = llmsFullTxt(
    pages.flatMap((page) =>
      page.markdown ? [{ ...page, markdown: page.markdown }] : [],
    ),
    { siteUrl: SITE_URL },
  );

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
