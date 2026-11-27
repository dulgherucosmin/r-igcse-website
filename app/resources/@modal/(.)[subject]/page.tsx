import { Suspense } from "react";
import {
  SubjectDetails,
  subjectTitle,
  subjectTitleClassName,
} from "@/components/SubjectResources";
import { SubjectDialog } from "@/components/subject-dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusAlert } from "@/components/resources-shared";
import { DriveApiError } from "@/lib/drive";
import { loadSubject, subjectParams } from "@/lib/subject-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ subject: string }> };

const COVER_SKELETONS = Array.from(
  { length: 5 },
  (_, index) => `modal-cover-skeleton-${index}`,
);

export const generateStaticParams = subjectParams;

async function SubjectModal({ params }: Props) {
  const { subject: routeSubject } = await params;
  // The intercepted route marker is included in this dynamic param.
  const id = routeSubject.replace(/^(?:\(\.\))+/, "");
  let data: Awaited<ReturnType<typeof loadSubject>>;
  try {
    data = await loadSubject(id);
  } catch (error) {
    if (!(error instanceof DriveApiError)) throw error;
    return <StatusAlert>{error.message}</StatusAlert>;
  }
  if (!data) notFound();
  const { subject, resources } = data;

  return (
    <SubjectDetails
      subject={subject}
      resources={resources}
      title={
        <DialogTitle className={subjectTitleClassName}>
          {subjectTitle(subject)}
        </DialogTitle>
      }
    />
  );
}

function SubjectModalSkeleton() {
  return (
    <>
      <DialogTitle className="sr-only">Loading subject</DialogTitle>
      <div className="flex items-center gap-6">
        <Skeleton className="size-20 shrink-0 rounded-2xl" />
        <div className="grid flex-1 gap-3">
          <Skeleton className="h-11 w-96 max-w-full md:h-15" />
          <Skeleton className="h-5 w-48" />
        </div>
      </div>
      <Separator className="my-10" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {COVER_SKELETONS.map((key) => (
          <Skeleton key={key} className="aspect-[1024/1448] rounded-lg" />
        ))}
      </div>
    </>
  );
}

export default function InterceptedSubject({ params }: Props) {
  return (
    <SubjectDialog>
      <Suspense fallback={<SubjectModalSkeleton />}>
        <SubjectModal params={params} />
      </Suspense>
    </SubjectDialog>
  );
}
