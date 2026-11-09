import { ogImageMetadata, renderOgImage } from "@/lib/og";

export function generateImageMetadata() {
  return ogImageMetadata("/resources");
}

export default function Image() {
  return renderOgImage("/resources");
}
