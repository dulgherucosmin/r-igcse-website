import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  BackgroundArt,
  pageClassName,
  StatusAlert,
} from "@/components/resources-shared";
import SubjectResources, {
  SubjectBackLink,
  subjectTitle,
} from "@/components/SubjectResources";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { DriveApiError } from "@/lib/drive";
import { loadSubject } from "@/lib/subject-data";

type Props = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject: id } = await params;
  const data = await loadSubject(id).catch(() => null);
  if (!data) return { title: "Subject not found" };
  const { subject } = data;
  const title = `${subjectTitle(subject)} (${subject.board})`;
  const description = `Free ${subject.board} ${subjectTitle(subject)} (${subject.codes.join(" / ")}) notes and guides made by r/IGCSE students.`;
  return {
    title,
    description,
    alternates: { canonical: `/resources/${subject.id}` },
    openGraph: { title, description, url: `/resources/${subject.id}` },
  };
}

async function Subject({ params }: Props) {
  const { subject: id } = await params;
  try {
    const data = await loadSubject(id);
    if (!data) notFound();
    return (
      <SubjectResources subject={data.subject} resources={data.resources} />
    );
  } catch (error) {
    if (!(error instanceof DriveApiError)) throw error;
    return (
      <main className={pageClassName}>
        <BackgroundArt />
        <StatusAlert>{error.message}</StatusAlert>
      </main>
    );
  }
}

const COVER_SKELETONS = Array.from(
  { length: 5 },
  (_, index) => `cover-skeleton-${index}`,
);

function SubjectFallback() {
  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <SubjectBackLink />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Skeleton className="size-20 shrink-0 rounded-2xl" />
        <div className="grid gap-3">
          <Skeleton className="h-11 w-96 max-w-full md:h-15" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-4xl" />
            <Skeleton className="h-5 w-12 rounded-4xl" />
            <Skeleton className="h-5 w-24 rounded-4xl" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-5 w-80 max-w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>
      <Separator className="my-10" />
      <Skeleton className="mb-5 h-7 w-24" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {COVER_SKELETONS.map((key) => (
          <div key={key}>
            <Skeleton className="aspect-[1024/1448] rounded-lg" />
            <Skeleton className="mt-3 h-5 w-4/5" />
            <Skeleton className="mt-1.5 h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function SubjectPage({ params }: Props) {
  return (
    <Suspense fallback={<SubjectFallback />}>
      <Subject params={params} />
    </Suspense>
  );
}
