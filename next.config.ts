import { withDualmark } from "@dualmark/nextjs";
import type { NextConfig } from "next";
import { SITE_URL } from "./lib/config";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default withDualmark(nextConfig, { siteUrl: SITE_URL });
