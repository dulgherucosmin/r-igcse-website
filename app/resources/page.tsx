import type { Metadata } from "next";
import ResourcesDisplay from "@/components/ResourcesDisplay";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/resources");

export default function ResourcesPage() {
  return <ResourcesDisplay />;
}
