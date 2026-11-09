import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  BackgroundArt,
  pageClassName,
  StatusAlert,
} from "@/components/resources-shared";
import SubjectResources, { subjectTitle } from "@/components/SubjectResources";
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

function SubjectFallback() {
  return (
    <main className={pageClassName}>
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="mb-8 flex items-center gap-4">
        <Skeleton className="size-[68px]" />
        <div className="grid gap-2">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <Skeleton className="h-[560px]" />
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
