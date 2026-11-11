import { ResourceThumbnail } from "@/components/resource-thumbnail";
import type { DriveResource, DriveSubject } from "@/lib/drive";
import { driveView } from "@/lib/drive-urls";

export function ResourceGrid({
  subject,
  resources,
}: {
  subject: DriveSubject;
  resources: DriveResource[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {resources.map((resource) => (
        <li key={resource.id}>
          <a
            href={resource.url || driveView(resource.id)}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <div className="aspect-[1024/1448] overflow-hidden rounded-lg bg-card shadow-lg shadow-black/40 ring-1 ring-border transition-shadow group-hover:ring-primary/60">
              <ResourceThumbnail
                id={resource.id}
                subjectName={subject.name}
                category={subject.category}
                className="size-full"
              />
            </div>
            <p className="mt-3 line-clamp-2 font-semibold leading-snug group-hover:text-brand">
              {resource.resourceName}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {resource.author || "Author not listed"}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
