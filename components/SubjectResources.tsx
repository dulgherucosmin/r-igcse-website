"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import NextLink from "next/link";
import { Fragment, useMemo, useState } from "react";
import {
  BackgroundArt,
  EmptyState,
  pageClassName,
} from "@/components/resources-shared";
import { TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CategoryIcon,
  SUBJECT_COLOR_CLASSES,
  subjectColorOf,
} from "@/lib/categories";
import type {
  Board,
  DriveResource,
  DriveSubject,
  SubjectLevel,
} from "@/lib/drive";
import { GLOBAL_LINKS, type Link, SUBJECT_META } from "@/lib/subject-meta";
import { cn } from "@/lib/utils";

const BOARD_ORDER: Board[] = ["CAIE", "Edexcel"];

interface ResourceGroup {
  board: Board;
  level: SubjectLevel;
  key: string;
  resources: DriveResource[];
}

function StudyToolsParagraph({ links }: { links: Link[] }) {
  if (links.length === 0) return null;

  return (
    <p className="leading-relaxed text-muted-foreground">
      Explore these study tools and websites:{" "}
      {links.map((link, index) => (
        <Fragment key={`${link.url}${link.label}`}>
          {index > 0 && (index === links.length - 1 ? ", and " : ", ")}
          <TextLink href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </TextLink>
        </Fragment>
      ))}
      .
    </p>
  );
}

function groupResources(resources: DriveResource[]): ResourceGroup[] {
  const groups = new Map<string, ResourceGroup>();

  for (const resource of resources) {
    const key = `${resource.board}:${resource.level}`;
    const group = groups.get(key) ?? {
      board: resource.board,
      level: resource.level,
      key,
      resources: [],
    };
    group.resources.push(resource);
    groups.set(key, group);
  }

  return [...groups.values()].sort((a, b) => {
    const boardOrder =
      BOARD_ORDER.indexOf(a.board) - BOARD_ORDER.indexOf(b.board);
    if (boardOrder) return boardOrder;
    const levelOrder: Record<SubjectLevel, number> = {
      IGCSE: 0,
      AS: 0,
      IAS: 0,
      AL: 1,
      IAL: 1,
    };
    return levelOrder[a.level] - levelOrder[b.level];
  });
}

function ResourceViewer({
  groups,
  selectedResource,
  onSelectResource,
}: {
  groups: ResourceGroup[];
  selectedResource?: DriveResource;
  onSelectResource: (resourceId: string) => void;
}) {
  return (
    <div className="grid items-start gap-4 md:grid-cols-[minmax(0,0.58fr)_minmax(220px,0.42fr)]">
      <Card className="min-w-0 gap-0 py-0">
        {selectedResource ? (
          <>
            <CardHeader className="border-b py-3">
              <CardTitle className="text-base">
                {selectedResource.resourceName}
              </CardTitle>
              {selectedResource.author && (
                <CardDescription>{selectedResource.author}</CardDescription>
              )}
            </CardHeader>
            <iframe
              key={selectedResource.id}
              src={`https://drive.google.com/file/d/${selectedResource.id}/preview`}
              title={selectedResource.fileName}
              loading="lazy"
              allow="autoplay"
              className="block h-[min(84svh,900px)] min-h-[560px] w-full border-0 bg-background"
            />
          </>
        ) : (
          <EmptyState title="Select a resource to preview it." />
        )}
      </Card>

      <aside className="min-w-0">
        <h2 className="mb-2 text-base font-semibold text-muted-foreground">
          Published Resources
        </h2>
        <Card className="py-0">
          <ScrollArea className="max-h-[min(76svh,800px)]">
            {groups.map((group, index) => (
              <section key={group.key}>
                {index > 0 && <Separator />}
                <h3 className="px-4 py-2.5 text-base font-medium">
                  {group.level}
                </h3>
                <Separator />
                <ul className="my-3 mr-3 ml-4 border-l pl-2.5">
                  {group.resources.map((resource) => {
                    const selected = resource.id === selectedResource?.id;
                    return (
                      <li key={resource.id}>
                        <Button
                          variant={selected ? "secondary" : "ghost"}
                          aria-pressed={selected}
                          className="h-auto w-full flex-col items-start gap-0.5 px-2.5 py-2 text-left whitespace-normal"
                          onClick={() => onSelectResource(resource.id)}
                        >
                          <span className="text-sm">
                            {resource.resourceName}
                          </span>
                          <span className="text-xs font-normal text-muted-foreground">
                            {resource.author || "Author not listed"}
                          </span>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </ScrollArea>
        </Card>
      </aside>
    </div>
  );
}

function ResourceBank({ resources }: { resources: DriveResource[] }) {
  return (
    <Card className="py-0">
      <Table className="min-w-[650px] table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[42%]">Resource</TableHead>
            <TableHead className="w-[20%]">Board / level</TableHead>
            <TableHead className="w-[18%]">Code</TableHead>
            <TableHead>Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="whitespace-normal">
                <TextLink
                  href={resource.url}
                  className="text-foreground no-underline hover:underline"
                >
                  {resource.resourceName}
                </TextLink>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {resource.board} · {resource.level}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {resource.code}
              </TableCell>
              <TableCell className="whitespace-normal text-muted-foreground">
                {resource.author || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default function SubjectResources({
  subject,
  resources,
}: {
  subject: DriveSubject;
  resources: DriveResource[];
}) {
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const metadata = SUBJECT_META[subject.name];

  const groups = useMemo(() => groupResources(resources), [resources]);
  const selectedResource =
    resources.find((resource) => resource.id === selectedResourceId) ??
    resources[0];
  const links = [...(metadata?.links ?? []), ...GLOBAL_LINKS];
  const levels = subject.levels
    .map((level) => {
      if (level === "AS") return "AS Level";
      if (level === "AL") return "A Level";
      if (level === "IAS") return "IAS";
      if (level === "IAL") return "IAL";
      return level;
    })
    .join(" / ");

  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <NextLink
        href="/resources"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-6 -ml-2.5 text-base font-semibold text-muted-foreground",
        )}
      >
        <ArrowLeftIcon />
        Back to all subjects
      </NextLink>

      <header className="mb-8">
        <div className="flex items-center gap-4 text-left">
          <Badge
            className={`size-[68px] shrink-0 rounded ${SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)]}`}
          >
            <CategoryIcon category={subject.category} size={46} />
          </Badge>
          <div className="min-w-0">
            <h1 className="m-0 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              {levels} {subject.name}
            </h1>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-base font-semibold text-muted-foreground">
              <span>{metadata?.code ?? subject.codes.join(" / ")}</span>
              <span aria-hidden="true">·</span>
              <span>{subject.board}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-base font-semibold text-muted-foreground">
          All of our resources are made by volunteer students.{" "}
          <TextLink href="/opportunities" className="text-muted-foreground">
            Find out more
          </TextLink>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <NextLink
            href="/opportunities"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base font-bold",
            )}
          >
            Contribute a Resource
          </NextLink>
          <a
            href="mailto:igcseresources.1@gmail.com"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base font-bold",
            )}
          >
            Contact Us
          </a>
        </div>
      </header>

      {resources.length > 0 && (
        <section className="mt-8">
          <ResourceViewer
            groups={groups}
            selectedResource={selectedResource}
            onSelectResource={setSelectedResourceId}
          />
        </section>
      )}
      {resources.length === 0 && (
        <EmptyState title="No resources match this subject." />
      )}

      <Separator className="mt-9" />
      <section className="pt-5">
        <h2 className="mb-3 text-xl font-bold">Study tools</h2>
        <StudyToolsParagraph links={links} />
      </section>

      <section className="mt-9">
        <h2 className="mb-2 text-xl font-bold">Resource bank</h2>
        <Separator className="mb-3" />
        {resources.length === 0 ? (
          <EmptyState title="No matching resources." />
        ) : (
          <ResourceBank resources={resources} />
        )}
      </section>
    </main>
  );
}
