import type { Metadata } from "next";
import ResourcesDisplay from "@/components/ResourcesDisplay";

export const metadata: Metadata = {
  title: "Resources | r/IGCSE",
  description:
    "Browse community-created IGCSE and AS/A Level study resources by subject.",
};

export default function ResourcesPage() {
  return <ResourcesDisplay />;
}
