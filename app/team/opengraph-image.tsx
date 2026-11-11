import { ogImageMetadata, renderOgImage } from "@/lib/og";

export function generateImageMetadata() {
  return ogImageMetadata("/team");
}

export default function Image() {
  return renderOgImage("/team");
}
