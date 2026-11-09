import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { DriveResource, DriveSubject } from "@/lib/drive";
import { drivePreview, driveView, LEVEL_NAMES } from "@/lib/drive-urls";
import { cn } from "@/lib/utils";

export function ResourceMeta({
  subject,
  resource,
}: {
  subject: DriveSubject;
  resource: DriveResource;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <span>By {resource.author || "an r/IGCSE volunteer"}</span>
      <span aria-hidden="true">·</span>
      <Badge variant="secondary">
        {LEVEL_NAMES[resource.level] ?? resource.level}
      </Badge>
      <Badge variant="secondary">{resource.code}</Badge>
      <Badge variant="outline">
        {subject.board} {subject.name}
      </Badge>
    </div>
  );
}

export function ResourceFrame({
  resource,
  className,
}: {
  resource: DriveResource;
  className?: string;
}) {
  return (
    <iframe
      src={drivePreview(resource.id)}
      title={resource.resourceName}
      allow="autoplay"
      className={cn("block w-full border-0 bg-background", className)}
    />
  );
}

export function ResourceActions({ resource }: { resource: DriveResource }) {
  return (
    <a
      href={resource.url || driveView(resource.id)}
      target="_blank"
      rel="noreferrer"
      className={buttonVariants()}
    >
      Open in Google Drive
      <ArrowSquareOutIcon />
    </a>
  );
}
