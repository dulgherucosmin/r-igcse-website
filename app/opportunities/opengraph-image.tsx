import { ogImageMetadata, renderOgImage } from "@/lib/og";

export function generateImageMetadata() {
  return ogImageMetadata("/opportunities");
}

export default function Image() {
  return renderOgImage("/opportunities");
}
