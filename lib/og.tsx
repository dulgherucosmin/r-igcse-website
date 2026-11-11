import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { ImageResponse } from "next/og";
import { covers } from "@/data/covers";
import { SITE_URL } from "@/lib/config";
import { sitePages } from "@/lib/site-pages";

const ogSize = { width: 1200, height: 630 };
const OG_VERSION = "v3";

const asset = (...parts: string[]) => join(process.cwd(), ...parts);
const dataUri = async (path: string, type: string) =>
  `data:${type};base64,${(await readFile(path)).toString("base64")}`;

const [medium, black, logo, ...coverImages] = await Promise.all([
  readFile(asset("assets/fonts/DMSans-Medium.ttf")),
  readFile(asset("assets/fonts/DMSans-Black.ttf")),
  dataUri(asset("public/logo.svg"), "image/svg+xml"),
  ...covers.map((cover) =>
    dataUri(
      asset(`assets/og/${basename(cover.src, ".webp")}.png`),
      "image/png",
    ),
  ),
]);

function Words({ text }: { text: string }) {
  const seen = new Map<string, number>();
  return (
    <>
      {text.split(" ").map((word) => {
        const count = (seen.get(word) ?? 0) + 1;
        seen.set(word, count);
        return (
          <span
            key={`${word}-${count}`}
            style={{ whiteSpace: "nowrap", marginRight: "0.25em" }}
          >
            {word}
          </span>
        );
      })}
    </>
  );
}

const COVER = { width: 230, height: 326 };
const fannedCovers = [
  { centerX: 790, centerY: 300, rotate: -14 },
  { centerX: 1010, centerY: 300, rotate: 12 },
  { centerX: 900, centerY: 325, rotate: 0 },
];

function ogAlt(path: string) {
  const page = sitePages.find((entry) => entry.path === path);
  if (!page) return "r/IGCSE";
  return page.title.includes("r/IGCSE")
    ? page.title
    : `${page.title} | r/IGCSE`;
}

export function ogImageMetadata(path: string) {
  return [
    {
      id: OG_VERSION,
      alt: ogAlt(path),
      size: ogSize,
      contentType: "image/png",
    },
  ];
}

export function renderOgImage(path: string) {
  const page = sitePages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No site page for OG image: ${path}`);
  const host = new URL(SITE_URL).host;
  const pageIndex = sitePages.indexOf(page);
  const pageCovers = [0, 1, 2].map(
    (offset) => coverImages[(pageIndex * 2 + offset) % coverImages.length],
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 85% 20%, #3a1512 0%, #121010 55%)",
        color: "#ffffff",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          width: 640,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 56px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logo} width={64} height={67} alt="" />
          <div style={{ fontSize: 40, fontWeight: 900 }}>r/IGCSE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: page.title.length > 22 ? 64 : 76,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Words text={page.title} />
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.35,
              color: "#c9bfbf",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Words text={page.description} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 6,
              borderRadius: 3,
              background: "#e62317",
            }}
          />
          <div
            style={{
              fontSize: host.length > 30 ? 20 : 24,
              fontWeight: 500,
              color: "#c9bfbf",
              whiteSpace: "nowrap",
            }}
          >
            {host}
          </div>
        </div>
      </div>

      {fannedCovers.map((cover, index) => (
        <div
          key={cover.centerX}
          style={{
            position: "absolute",
            left: cover.centerX - COVER.width / 2,
            top: cover.centerY - COVER.height / 2,
            width: COVER.width,
            height: COVER.height,
            display: "flex",
            transform: `rotate(${cover.rotate}deg)`,
            borderRadius: 10,
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.55)",
            backgroundImage: `url(${pageCovers[index]})`,
            backgroundSize: `${COVER.width}px ${COVER.height}px`,
          }}
        />
      ))}
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "DM Sans", data: medium, weight: 500, style: "normal" },
        { name: "DM Sans", data: black, weight: 900, style: "normal" },
      ],
    },
  );
}
