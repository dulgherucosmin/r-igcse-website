import { ogImageMetadata, renderOgImage } from "@/lib/og";

export function generateImageMetadata() {
  return ogImageMetadata("/about");
}

export default function Image() {
  return renderOgImage("/about");
}
