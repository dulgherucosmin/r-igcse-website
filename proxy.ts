import { type NextRequest, NextResponse } from "next/server";
import { markdown } from "@/lib/agentside";

export default function proxy(request: NextRequest) {
  return markdown.handle(request, async () =>
    NextResponse.next({ request: { headers: request.headers } }),
  );
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
