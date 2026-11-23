import { type NextRequest, NextResponse } from "next/server";
import { markdown } from "@/lib/agentside";
import { SOURCE_HEADER } from "@/lib/markdown";

export default function proxy(request: NextRequest) {
  const next = async () =>
    NextResponse.next({ request: { headers: request.headers } });
  if (request.headers.has(SOURCE_HEADER)) return next();
  return markdown.handle(request, next);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/|api/|favicon.ico|.*\\.(?:svg|png|webp|jpg|jpeg|ico|txt|xml|json|woff2?)$).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
