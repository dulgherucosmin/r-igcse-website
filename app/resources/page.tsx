import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import ResourcesDisplay from "@/components/ResourcesDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { listSubjects } from "@/lib/drive";
import { pageMetadata } from "@/lib/metadata";
import { subjectsQueryKey } from "@/lib/queries";

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

async function prefetchedSubjects() {
  "use cache";
  cacheLife("hours");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: subjectsQueryKey,
    queryFn: listSubjects,
  });
  return dehydrate(queryClient);
}

async function PrefetchedResources() {
  return (
    <HydrationBoundary state={await prefetchedSubjects()}>
      <ResourcesDisplay />
    </HydrationBoundary>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<ResourcesFallback />}>
      <PrefetchedResources />
    </Suspense>
  );
}
