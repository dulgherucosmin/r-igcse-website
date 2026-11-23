import { htmlToMarkdown } from "@usenotra/agentside/build";
import { SITE_URL } from "@/lib/config";

export const SOURCE_HEADER = "x-markdown-source";

const COMPLETION = /\$RC\("(B:[\da-f]+)","(S:[\da-f]+)"/g;
const DIV = /<div\b|<\/div>/g;
const BOUNDARY = /<!--\$[?!~]?-->|<!--\/\$-->/g;
const NOT_FOUND = /<meta name="robots" content="noindex"/;

function closingIndex(
  html: string,
  from: number,
  pattern: RegExp,
  close: string,
) {
  const scan = new RegExp(pattern.source, "g");
  scan.lastIndex = from;
  let depth = 0;
  for (let match = scan.exec(html); match; match = scan.exec(html)) {
    if (match[0] !== close) depth++;
    else if (depth-- === 0) return match.index;
  }
  return -1;
}

// React streams Suspense content after the shell as hidden `S:` segments that a
// script later swaps into the `B:` boundary. Do that swap here so the markdown
// holds the real content instead of the loading skeleton.
export function inlineStreamed(html: string) {
  const segments = new Map<string, string>();
  let shell = html;

  for (const [, boundary, segment] of html.matchAll(COMPLETION)) {
    const open = `<div hidden id="${segment}">`;
    const start = shell.indexOf(open);
    if (start === -1) continue;
    const end = closingIndex(shell, start + open.length, DIV, "</div>");
    if (end === -1) continue;
    segments.set(boundary, shell.slice(start + open.length, end));
    shell = shell.slice(0, start) + shell.slice(end + "</div>".length);
  }

  for (let pending = true; pending; ) {
    pending = false;
    for (const [boundary, content] of segments) {
      const marker = `<template id="${boundary}"></template>`;
      const start = shell.indexOf(marker);
      if (start === -1) continue;
      segments.delete(boundary);
      const end = closingIndex(
        shell,
        start + marker.length,
        BOUNDARY,
        "<!--/$-->",
      );
      if (end === -1) continue;
      shell = shell.slice(0, start) + content + shell.slice(end);
      pending = true;
    }
  }

  return shell;
}

export async function pageMarkdown(
  origin: string,
  path: string,
): Promise<string | null> {
  const response = await fetch(`${origin}${path}`, {
    headers: { accept: "text/html", [SOURCE_HEADER]: "1" },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${path} responded ${response.status}`);
  if (!response.headers.get("content-type")?.includes("text/html")) return null;

  const html = inlineStreamed(await response.text());
  if (NOT_FOUND.test(html)) return null;
  return htmlToMarkdown(html, { siteUrl: SITE_URL });
}
