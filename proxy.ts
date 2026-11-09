import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { dualmarkConfig } from "@/lib/dualmark";

export default createDualmarkMiddleware(dualmarkConfig);

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/|md/|api/|favicon.ico|.*\\.(?:svg|png|webp|jpg|jpeg|ico|txt|xml|json|woff2?)$).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
