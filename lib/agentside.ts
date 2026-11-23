import type { LocalSource } from "@usenotra/agentside";
import { agentside } from "@usenotra/agentside";
import { pageMarkdown } from "@/lib/markdown";

const fromRenderedPage: LocalSource = ({ path, request }) =>
  pageMarkdown(new URL(request.url).origin, path);

export const markdown = agentside({
  routes: { "/": fromRenderedPage, "/[...path]": fromRenderedPage },
  skip: ["/api", "/llms.txt", "/llms-full.txt", "/robots.txt", "/sitemap.xml"],
  timeoutMs: 10_000,
});
