"use client";

import {
  FunnelSimpleIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/ssr";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useMemo } from "react";
import { matchesFilters, ResourceFilters } from "@/components/resource-filters";
import {
  BackgroundArt,
  EmptyState,
  pageClassName,
  StatusAlert,
} from "@/components/resources-shared";
import { Button } from "@/components/ui/button";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CategoryIcon,
  SUBJECT_COLOR_CLASSES,
  subjectColorOf,
} from "@/lib/categories";
import type { DriveSubject } from "@/lib/drive";
import { subjectsQueryOptions } from "@/lib/queries";
import { filterParsers, searchQueryParser } from "@/lib/search-params";

const LEGACY_SUBJECT_HASH = "#/subject/";
const LEVEL_ALIASES: Record<string, readonly string[]> = {
  AS: ["as", "as level", "a level year 1", "year 12"],
  AL: ["al", "a2", "a level", "a level year 2", "year 13"],
  IAS: ["ias", "international as", "international a level year 1"],
  IAL: ["ial", "international al", "international a level", "a level"],
};

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const matchSubject = (subject: DriveSubject, query: string) => {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) return true;

  const levelTerms = subject.levels.flatMap((level) => [
    level,
    LEVEL_ALIASES[level] ?? [],
  ]);
  const searchable = normalizeSearch(
    [
      subject.name,
      subject.board,
      subject.track,
      subject.category,
      ...subject.codes,
      ...levelTerms,
    ].join(" "),
  );

  const rawCodeTerms = subject.codes.flatMap((code) =>
    code
      .split(/[\\/_\s-]+/)
      .map(normalizeSearch)
      .filter(Boolean),
  );
  const searchableTerms = new Set([...searchable.split(" "), ...rawCodeTerms]);

  return normalizedQuery
    .split(" ")
    .every(
      (term) =>
        searchableTerms.has(term) ||
        [...searchableTerms].some((searchableTerm) =>
          searchableTerm.includes(term),
        ),
    );
};
const SUBJECT_SKELETONS = Array.from(
  { length: 9 },
  (_, index) => `subject-skeleton-${index}`,
);

export default function ResourcesDisplay() {
  const {
    data: subjects = [],
    isPending: loading,
    error: queryError,
  } = useQuery(subjectsQueryOptions);
  const error = queryError?.message ?? "";
  const [query, setQuery] = useQueryState("q", searchQueryParser);
  const [filters, setFilters] = useQueryStates(filterParsers, {
    clearOnDefault: true,
  });
  const router = useRouter();

  const searchedSubjects = useMemo(
    () => subjects.filter((subject) => matchSubject(subject, query)),
    [query, subjects],
  );
  const visibleSubjects = useMemo(
    () =>
      subjects
        .filter(
          (subject) =>
            matchSubject(subject, query) && matchesFilters(subject, filters),
        )
        .sort(
          (a, b) =>
            a.name.localeCompare(b.name) || a.board.localeCompare(b.board),
        ),
    [query, filters, subjects],
  );
  useEffect(() => {
    if (subjects.length === 0) return;
    const { hash } = window.location;
    if (!hash.startsWith(LEGACY_SUBJECT_HASH)) return;
    const legacyId = hash.slice(LEGACY_SUBJECT_HASH.length).replaceAll("-", "");
    const subject = subjects.find(
      (entry) => entry.id.replaceAll("-", "") === legacyId,
    );
    if (subject) router.replace(`/resources/${subject.id}`);
  }, [subjects, router]);

  const activeFilterCount =
    filters.level.length + filters.board.length + filters.category.length;
  const searchInput = (
    <InputGroup className="h-10">
      <InputGroupAddon>
        <MagnifyingGlassIcon aria-hidden="true" className="size-[18px]" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label="Search subjects"
        placeholder="Search subjects"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </InputGroup>
  );
  const filterList = (
    <ResourceFilters
      allSubjects={subjects}
      subjects={searchedSubjects}
      filters={filters}
      onChange={setFilters}
    />
  );

  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight md:text-6xl">
          Resources
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Free notes, guides and revision material for IGCSE, O Level and AS/A
          Level, written by students who sat the exams.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <aside className="md:sticky md:top-[calc(var(--site-header-height)+1.5rem)] md:self-start">
          <div className="flex gap-2 md:block">
            <div className="flex-1">{searchInput}</div>
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline" className="h-10 md:hidden" />}
              >
                <FunnelSimpleIcon aria-hidden="true" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="text-brand tabular-nums">
                    {activeFilterCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(85vw,320px)]">
                <SheetHeader>
                  <SheetTitle>Filter subjects</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto px-3 pb-6">{filterList}</div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="mt-6 hidden md:block">{filterList}</div>
        </aside>

        <div className="min-w-0">
          {loading && (
            <div
              role="status"
              aria-label="Loading subjects"
              className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-3"
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
                  <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-3">
                    {group.map((subject) => (
                      <li key={subject.id} className="flex min-w-0">
                        <Item
                          variant="muted"
                          data-ai-content={`${subject.codes.join(" / ")} ${subject.name} (${subject.board} ${subject.levels.join(" / ")}), ${subject.resourceCount} ${subject.resourceCount === 1 ? "resource" : "resources"}`}
                          className="min-h-[76px] min-w-0 flex-nowrap bg-card p-2.5 hover:bg-muted"
                          render={
                            <NextLink
                              href={`/resources/${subject.id}`}
                              scroll={false}
                            />
                          }
                        >
                          <ItemMedia
                            className={`size-[46px] rounded ${SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)]}`}
                          >
                            <CategoryIcon category={subject.category} />
                          </ItemMedia>
                          <ItemContent className="min-w-0 gap-0.5">
                            <span className="text-xs font-semibold">
                              {subject.board} | {subject.codes.join(" / ")}
                            </span>
                            <ItemTitle className="line-clamp-2 w-full text-base leading-tight font-bold [overflow-wrap:anywhere]">
                              {subject.name}
                            </ItemTitle>
                            <ItemDescription className="text-xs">
                              {subject.resourceCount}{" "}
                              {subject.resourceCount === 1
                                ? "resource"
                                : "resources"}{" "}
                              available
                            </ItemDescription>
                          </ItemContent>
                        </Item>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          {!loading && !error && visibleSubjects.length === 0 && (
            <EmptyState title="No subjects match your search.">
              Try a different subject name or clear some filters.
            </EmptyState>
          )}
        </div>
      </div>
    </main>
  );
}
