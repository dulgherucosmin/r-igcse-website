"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  CategoryIcon,
  SUBJECT_COLOR_CLASSES,
  subjectColorOf,
} from "@/lib/categories";
import { subjectsQueryOptions } from "@/lib/queries";
import { filterParsers, searchQueryParser } from "@/lib/search-params";

const LEGACY_SUBJECT_HASH = "#/subject/";
const match = (value: string, query: string) =>
  value.toLowerCase().includes(query.toLowerCase());
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
    () =>
      subjects.filter((subject) =>
        match(`${subject.name} ${subject.board}`, query),
      ),
    [query, subjects],
  );
  const visibleSubjects = useMemo(
    () =>
      subjects
        .filter(
          (subject) =>
            match(`${subject.name} ${subject.board}`, query) &&
            matchesFilters(subject, filters),
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

  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <div className="mx-auto mb-6 text-center">
        <h1 className="m-0 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Resources
        </h1>
      </div>

      <InputGroup className="mx-auto mb-5 h-11 max-w-[660px]">
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

      <ResourceFilters
        allSubjects={subjects}
        subjects={searchedSubjects}
        filters={filters}
        onChange={setFilters}
      />

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
                    render={<NextLink href={`/resources/${subject.id}`} />}
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
                      <ItemTitle className="line-clamp-2 w-full text-base leading-tight font-bold [overflow-wrap:anywhere]">
                        {subject.codes.join(" / ")} {subject.name}
                      </ItemTitle>
                      <ItemDescription className="text-xs">
                        {subject.resourceCount}{" "}
                        {subject.resourceCount === 1 ? "resource" : "resources"}{" "}
                        available
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
          Try a different subject name or clear some filters.
        </EmptyState>
      )}
    </main>
  );
}
