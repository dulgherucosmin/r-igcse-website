import { withDualmark } from "@dualmark/nextjs";
import type { NextConfig } from "next";
import { SITE_URL } from "./lib/config";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/thumbnail",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
};

export default withDualmark(nextConfig, { siteUrl: SITE_URL });
