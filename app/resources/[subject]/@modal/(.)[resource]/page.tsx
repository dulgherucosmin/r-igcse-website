import { Suspense } from "react";
import {
  ResourceDialog,
  ResourceDialogShell,
} from "@/components/resource-dialog";
import {
  ResourceActions,
  ResourceFrame,
  ResourceMeta,
} from "@/components/resource-preview";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { loadResource } from "@/lib/subject-data";

type Props = { params: Promise<{ subject: string; resource: string }> };

async function ResourceModal({ params }: Props) {
  const { subject: subjectId, resource: resourceId } = await params;
  const data = await loadResource(subjectId, resourceId);
  if (!data) return null;
  const { subject, resource } = data;

  return (
    <ResourceDialog href={`/resources/${subject.id}/${resource.id}`}>
      <div className="border-b px-5 pt-5 pb-4 pr-14">
        <DialogTitle className="text-xl font-bold">
          {resource.resourceName}
        </DialogTitle>
        <DialogDescription render={<div />} className="mt-2">
          <ResourceMeta subject={subject} resource={resource} />
        </DialogDescription>
      </div>
      <ResourceFrame resource={resource} className="min-h-0 flex-1" />
      <div className="border-t px-5 py-3">
        <ResourceActions
          subjectId={subject.id}
          resource={resource}
          showFullPage
        />
      </div>
    </ResourceDialog>
  );
}

export default function InterceptedResource({ params }: Props) {
  return (
    <Suspense
      fallback={
        <ResourceDialogShell open>
          <DialogTitle className="sr-only">Loading resource</DialogTitle>
          <Skeleton className="m-5 h-8 w-2/3" />
          <Skeleton className="mx-5 mb-5 flex-1" />
        </ResourceDialogShell>
      }
    >
      <ResourceModal params={params} />
    </Suspense>
  );
}
