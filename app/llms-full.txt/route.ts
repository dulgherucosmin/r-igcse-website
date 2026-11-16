import { llmsFullTxt } from "@usenotra/agentside/build";
import { prerenderedPages } from "@/lib/agentside";
import { SITE_URL } from "@/lib/config";

export function GET() {
  return new Response(llmsFullTxt(prerenderedPages(), { siteUrl: SITE_URL }), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
