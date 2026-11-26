import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import ResourcesDisplay, {
  UnfilteredResources,
} from "@/components/ResourcesDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { type DriveSubject, listSubjects } from "@/lib/drive";
import { pageMetadata } from "@/lib/metadata";
import { subjectsQueryKey } from "@/lib/queries";
import { resourcesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata("/resources");

function ResourcesFallback() {
  return (
    <main className="page-container py-8 sm:py-12 lg:py-16">
      <Skeleton className="mb-4 h-14 w-64" />
      <Skeleton className="mb-10 h-6 max-w-xl" />
      <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <Skeleton className="h-10" />
        <Skeleton className="h-[320px]" />
      </div>
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
  return {
    state: dehydrate(queryClient),
    subjects: queryClient.getQueryData<DriveSubject[]>(subjectsQueryKey) ?? [],
  };
}

async function PrefetchedResources() {
  const { state, subjects } = await prefetchedSubjects();
  return (
    <>
      <JsonLd data={resourcesJsonLd(subjects)} />
      {/* The list reads its filters from the URL, which a prerender does not
          have. Falling back to the unfiltered list keeps the page static, so
          the subjects are fetched at build time and are already in the HTML. */}
      <Suspense fallback={<UnfilteredResources subjects={subjects} />}>
        <HydrationBoundary state={state}>
          <ResourcesDisplay />
        </HydrationBoundary>
      </Suspense>
    </>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<ResourcesFallback />}>
      <PrefetchedResources />
    </Suspense>
  );
}
