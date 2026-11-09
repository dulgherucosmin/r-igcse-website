"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
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
import type { DriveSubject } from "@/lib/drive";
import { searchQueryParser } from "@/lib/search-params";

const LEGACY_SUBJECT_HASH = "#/subject/";
const match = (value: string, query: string) =>
  value.toLowerCase().includes(query.toLowerCase());
const SUBJECT_SKELETONS = Array.from(
  { length: 9 },
  (_, index) => `subject-skeleton-${index}`,
);

export default function ResourcesDisplay() {
  const [subjects, setSubjects] = useState<DriveSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useQueryState("q", searchQueryParser);
  const router = useRouter();

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
