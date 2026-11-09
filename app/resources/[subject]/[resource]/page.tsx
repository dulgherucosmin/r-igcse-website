import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ResourceActions,
  ResourceFrame,
  ResourceMeta,
} from "@/components/resource-preview";
import { pageClassName } from "@/components/resources-shared";
import { subjectTitle } from "@/components/SubjectResources";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { loadResource } from "@/lib/subject-data";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ subject: string; resource: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject: subjectId, resource: resourceId } = await params;
  const data = await loadResource(subjectId, resourceId).catch(() => null);
  if (!data) return { title: "Resource not found" };
  const { subject, resource } = data;
  const title = `${resource.resourceName} · ${subjectTitle(subject)}`;
  const description = `${resource.resourceName} for ${subject.board} ${subjectTitle(subject)} (${resource.code}), written by ${resource.author || "an r/IGCSE volunteer"}.`;
  const url = `/resources/${subject.id}/${resource.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

async function ResourcePage({ params }: Props) {
  const { subject: subjectId, resource: resourceId } = await params;
  const data = await loadResource(subjectId, resourceId);
  if (!data) notFound();
  const { subject, resource } = data;

  return (
    <main className={pageClassName}>
      <Link
        href={`/resources/${subject.id}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-8 -ml-2.5 text-muted-foreground",
        )}
      >
        <ArrowLeftIcon />
        {subjectTitle(subject)}
      </Link>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
            {resource.resourceName}
          </h1>
          <div className="mt-3">
            <ResourceMeta subject={subject} resource={resource} />
          </div>
        </div>
        <ResourceActions resource={resource} />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-border">
        <ResourceFrame resource={resource} className="h-[min(85svh,1000px)]" />
      </div>
    </main>
  );
}

export default function Page({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className={pageClassName}>
          <Skeleton className="mb-8 h-8 w-48" />
          <Skeleton className="mb-3 h-12 w-2/3" />
          <Skeleton className="h-[70svh]" />
        </main>
      }
    >
      <ResourcePage params={params} />
    </Suspense>
  );
}
