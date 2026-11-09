"use client";

import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/ssr";
import NextLink from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { TextLink } from "@/components/text-link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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

const SUBJECT_HASH = "#/subject/";
const pageClassName =
  "page-container relative isolate min-h-[calc(100svh-var(--site-header-height))] overflow-hidden py-8 sm:py-12 lg:py-16";
const match = (value: string, query: string) =>
  value.toLowerCase().includes(query.toLowerCase());
const BOARD_ORDER: Board[] = ["CAIE", "Edexcel"];
const SUBJECT_SKELETONS = Array.from(
  { length: 9 },
  (_, index) => `subject-skeleton-${index}`,
);

interface ResourceGroup {
  board: Board;
  level: SubjectLevel;
  key: string;
  resources: DriveResource[];
}

function BackgroundArt() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[min(75vh,760px)] bg-[url('/bg-vector.png')] bg-cover bg-bottom bg-no-repeat opacity-[0.12]"
    />
  );
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

function StatusAlert({ children }: { children: string }) {
  return (
    <Alert variant="destructive">
      <WarningCircleIcon />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

function EmptyState({ title, children }: { title: string; children?: string }) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {children && <EmptyDescription>{children}</EmptyDescription>}
      </EmptyHeader>
    </Empty>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      className="mb-6 -ml-2.5 text-base font-semibold text-muted-foreground"
      onClick={onClick}
    >
      <ArrowLeftIcon />
      Back to all subjects
    </Button>
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

export default function ResourcesDisplay() {
  const [subjects, setSubjects] = useState<DriveSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setSubjectId(
        window.location.hash.startsWith(SUBJECT_HASH)
          ? window.location.hash.slice(SUBJECT_HASH.length)
          : "",
      );
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSubjects() {
      try {
        const response = await fetch("/api/subjects", {
          signal: controller.signal,
        });
        const data: { subjects?: DriveSubject[]; error?: string } =
          await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Unable to load subjects.");
        }
        setSubjects(data.subjects ?? []);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load subjects.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void fetchSubjects();
    return () => controller.abort();
  }, []);

  const visibleSubjects = useMemo(
    () =>
      subjects
        .filter((subject) => match(`${subject.name} ${subject.board}`, query))
        .sort(
          (a, b) =>
            a.name.localeCompare(b.name) || a.board.localeCompare(b.board),
        ),
    [query, subjects],
  );
  const selectedSubject = subjects.find((subject) => subject.id === subjectId);
  const clearSubject = () => {
    window.location.hash = "";
  };

  if (subjectId && (loading || (!selectedSubject && !error))) {
    return (
      <main className={pageClassName}>
        <BackgroundArt />
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="size-[68px]" />
          <div className="grid gap-2">
            <Skeleton className="h-9 w-72 max-w-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-[560px] w-full" />
      </main>
    );
  }

  if (subjectId && selectedSubject) {
    return (
      <SubjectResources
        key={selectedSubject.id}
        subject={selectedSubject}
        onBack={clearSubject}
      />
    );
  }

  if (subjectId && !error) {
    return (
      <main className={pageClassName}>
        <BackgroundArt />
        <BackButton onClick={clearSubject} />
        <StatusAlert>
          That subject is not present in the resource repository.
        </StatusAlert>
      </main>
    );
  }

  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <div className="mx-auto mb-6 text-center">
        <h1 className="m-0 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Resources
        </h1>
      </div>

      <InputGroup className="mx-auto mb-7 h-11 max-w-[660px]">
        <InputGroupAddon>
          <MagnifyingGlassIcon className="size-[19px]" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          aria-label="Search subjects"
          placeholder="Search subjects"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </InputGroup>

      {loading && (
        <div
          role="status"
          aria-label="Loading subjects"
          className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,255px),1fr))] gap-3.5"
        >
          {SUBJECT_SKELETONS.map((key) => (
            <Skeleton key={key} className="h-[76px]" />
          ))}
        </div>
      )}
      {error && <StatusAlert>{error}</StatusAlert>}

      <div className="space-y-8">
        {(
          [
            { label: "IGCSE/O Level Resources", track: "IGCSE" },
            { label: "AS & A Level Resources", track: "Advanced" },
          ] as const
        ).map(({ label, track }) => {
          const group = visibleSubjects.filter(
            (subject) => subject.track === track,
          );
          if (group.length === 0) return null;

          return (
            <section aria-labelledby={`track-${track}`} key={track}>
              <h2 className="mb-3 text-xl font-bold" id={`track-${track}`}>
                {label}
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,255px),1fr))] gap-3.5">
                {group.map((subject) => (
                  <Item
                    key={subject.id}
                    variant="muted"
                    className="min-h-[76px] min-w-0 flex-nowrap bg-card p-2.5 hover:bg-muted"
                    render={<a href={`${SUBJECT_HASH}${subject.id}`} />}
                  >
                    <ItemMedia
                      className={`size-[46px] rounded ${SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)]}`}
                    >
                      <CategoryIcon category={subject.category} />
                    </ItemMedia>
                    <ItemContent className="min-w-0 gap-0.5">
                      <span className="text-xs font-semibold">
                        {subject.board} |{" "}
                        {subject.track === "IGCSE"
                          ? "IGCSE"
                          : subject.levels.join(" · ")}
                      </span>
                      <ItemTitle className="block truncate text-base leading-tight font-bold">
                        {subject.codes.join(" / ")} {subject.name}
                      </ItemTitle>
                      <ItemDescription className="text-xs">
                        {subject.resourceCount} resources available
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {!loading && !error && visibleSubjects.length === 0 && (
        <EmptyState title="No subjects match your search.">
          Try a different subject name or exam board.
        </EmptyState>
      )}
    </main>
  );
}

function SubjectResources({
  subject,
  onBack,
}: {
  subject: DriveSubject;
  onBack: () => void;
}) {
  const [resources, setResources] = useState<DriveResource[] | null>(null);
  const [error, setError] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const metadata = SUBJECT_META[subject.name];

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResources() {
      try {
        const response = await fetch(
          `/api/subjects/${encodeURIComponent(subject.id)}`,
          { signal: controller.signal },
        );
        const data: { resources?: DriveResource[]; error?: string } =
          await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Unable to load this subject.");
        }
        setResources(data.resources ?? []);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load this subject.",
          );
        }
      }
    }

    void fetchResources();
    return () => controller.abort();
  }, [subject.id]);

  const groups = useMemo(() => groupResources(resources ?? []), [resources]);
  const selectedResource =
    resources?.find((resource) => resource.id === selectedResourceId) ??
    resources?.[0];
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
      <BackButton onClick={onBack} />

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

      {error && <StatusAlert>{error}</StatusAlert>}
      {!resources && !error && (
        <Skeleton
          role="status"
          aria-label="Loading subject resources"
          className="mt-8 h-[560px]"
        />
      )}
      {resources && resources.length > 0 && (
        <section className="mt-8">
          <ResourceViewer
            groups={groups}
            selectedResource={selectedResource}
            onSelectResource={setSelectedResourceId}
          />
        </section>
      )}
      {resources && resources.length === 0 && (
        <EmptyState title="No resources match this subject." />
      )}

      {resources && (
        <>
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
        </>
      )}
    </main>
  );
}
