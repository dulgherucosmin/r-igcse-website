import { ogImageMetadata, renderOgImage } from "@/lib/og";

export function generateImageMetadata() {
  return ogImageMetadata("");
}

export default function Image() {
  return renderOgImage("");
}
