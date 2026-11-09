import type { Metadata } from "next";
import { Suspense } from "react";
import ResourcesDisplay from "@/components/ResourcesDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/resources");

function ResourcesFallback() {
  return (
    <main className="page-container py-8 sm:py-12 lg:py-16">
      <Skeleton className="mx-auto mb-6 h-12 w-56" />
      <Skeleton className="mx-auto mb-7 h-11 max-w-[660px]" />
      <Skeleton className="h-[320px]" />
    </main>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<ResourcesFallback />}>
      <ResourcesDisplay />
    </Suspense>
  );
}
