import { Suspense } from "react";
import {
  SubjectDetails,
  subjectTitle,
  subjectTitleClassName,
} from "@/components/SubjectResources";
import { SubjectDialog, SubjectDialogShell } from "@/components/subject-dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { loadSubject } from "@/lib/subject-data";

type Props = { params: Promise<{ subject: string }> };

const COVER_SKELETONS = Array.from(
  { length: 5 },
  (_, index) => `modal-cover-skeleton-${index}`,
);

async function SubjectModal({ params }: Props) {
  const { subject: id } = await params;
  const data = await loadSubject(id).catch(() => null);
  if (!data) return null;
  const { subject, resources } = data;

  return (
    <SubjectDialog href={`/resources/${subject.id}`}>
      <SubjectDetails
        subject={subject}
        resources={resources}
        title={
          <DialogTitle className={subjectTitleClassName}>
            {subjectTitle(subject)}
          </DialogTitle>
        }
      />
    </SubjectDialog>
  );
}

export default function InterceptedSubject({ params }: Props) {
  return (
    <Suspense
      fallback={
        <SubjectDialogShell>
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
        </SubjectDialogShell>
      }
    >
      <SubjectModal params={params} />
    </Suspense>
  );
}
