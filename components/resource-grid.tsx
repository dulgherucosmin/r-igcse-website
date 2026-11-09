"use client";

import { XIcon } from "@phosphor-icons/react";
import { type MouseEvent, useState } from "react";
import {
  ResourceActions,
  ResourceFrame,
  ResourceMeta,
} from "@/components/resource-preview";
import { ResourceThumbnail } from "@/components/resource-thumbnail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DriveResource, DriveSubject } from "@/lib/drive";

const opensNewTab = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;

export function ResourceGrid({
  subject,
  resources,
}: {
  subject: DriveSubject;
  resources: DriveResource[];
}) {
  const [selected, setSelected] = useState<DriveResource | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {resources.map((resource) => (
          <li key={resource.id}>
            <a
              href={`/resources/${subject.id}/${resource.id}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                if (opensNewTab(event)) return;
                event.preventDefault();
                setSelected(resource);
              }}
              className="group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <div className="aspect-[1024/1448] overflow-hidden rounded-lg bg-card shadow-lg shadow-black/40 ring-1 ring-border transition-transform duration-300 group-hover:-translate-y-1 group-hover:ring-primary/60">
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

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex h-[92svh] w-[min(96vw,calc((92svh-5.5rem)*0.74))] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none"
        >
          {selected && (
            <>
              <div className="flex items-start gap-4 border-b p-4">
                <div className="min-w-0 flex-1">
                  <DialogTitle className="truncate text-lg font-bold">
                    {selected.resourceName}
                  </DialogTitle>
                  <DialogDescription render={<div />} className="mt-1.5">
                    <ResourceMeta
                      subject={subject}
                      resource={selected}
                      compact
                    />
                  </DialogDescription>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <ResourceActions
                    subjectId={subject.id}
                    resource={selected}
                    size="sm"
                    showFullPage
                  />
                  <DialogClose
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </div>
              </div>
              <ResourceFrame resource={selected} className="min-h-0 flex-1" />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
