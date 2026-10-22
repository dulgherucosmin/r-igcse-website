"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
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

const SUBJECT_HASH = "#/subject/";
const pageClassName =
  "relative isolate mx-auto min-h-[calc(100svh-var(--site-header-height))] w-full max-w-[1060px] overflow-hidden px-5 py-8 text-white sm:px-6 sm:py-12 lg:py-16";
const match = (value: string, query: string) =>
  value.toLowerCase().includes(query.toLowerCase());
const BOARD_ORDER: Board[] = ["CAIE", "Edexcel"];

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
    <p className="m-0 leading-relaxed text-zinc-300">
      Explore these study tools and websites:{" "}
      {links.map((link, index) => (
        <Fragment key={`${link.url}${link.label}`}>
          {index > 0 && (index === links.length - 1 ? ", and " : ", ")}
          <a
            className="text-blue-300 underline decoration-zinc-600 underline-offset-4 hover:text-white"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
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
    <div className="grid items-start gap-4 md:grid-cols-[minmax(220px,0.42fr)_minmax(0,0.58fr)]">
      <aside className="min-w-0 font-sans">
        <h2 className="mb-2 text-base font-semibold text-zinc-300">
          Published Resources
        </h2>
        <div className="max-h-[min(76svh,800px)] overflow-y-auto rounded-xl border border-zinc-800 bg-[#19191c]">
          {groups.map((group) => (
            <section key={group.key}>
              <h3 className="m-0 border-b border-zinc-700 px-4 py-2.5 text-base font-medium text-white">
                {group.level}
              </h3>
              <ul className="my-3 ml-4 mr-3 list-none border-l border-zinc-500 py-1 pl-2.5">
                {group.resources.map((resource) => (
                  <li className="list-none" key={resource.id}>
                    <button
                      aria-pressed={resource.id === selectedResource?.id}
                      className={`-ml-px w-[calc(100%+1px)] border-l-0 px-2.5 py-2 text-left transition-colors ${
                        resource.id === selectedResource?.id
                          ? "bg-zinc-800/80 text-white"
                          : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                      }`}
                      onClick={() => onSelectResource(resource.id)}
                      type="button"
                    >
                      <span className="block text-sm">
                        {resource.resourceName}
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {resource.author || "Author not listed"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      <article className="min-w-0 overflow-hidden rounded-sm border border-zinc-800 bg-[#19191c] font-sans">
        {selectedResource ? (
          <>
            <p className="m-0 border-b border-zinc-800 px-4 py-3 text-base font-semibold text-zinc-200">
              {selectedResource.resourceName}
              {selectedResource.author && (
                <span className="mt-1 block text-sm font-normal text-zinc-500">
                  {selectedResource.author}
                </span>
              )}
            </p>
            <iframe
              key={selectedResource.id}
              src={`https://drive.google.com/file/d/${selectedResource.id}/preview`}
              title={selectedResource.fileName}
              loading="lazy"
              allow="autoplay"
              className="block h-[min(84svh,900px)] min-h-[560px] w-full border-0 bg-zinc-950"
            />
          </>
        ) : (
          <p className="m-0 grid min-h-[560px] place-items-center p-6 text-center text-zinc-500">
            Select a resource to preview it.
          </p>
        )}
      </article>
    </div>
  );
}

function ResourceBank({ resources }: { resources: DriveResource[] }) {
  return (
    <div className="overflow-x-auto border border-zinc-800 bg-[#19191c]">
      <table className="w-full min-w-[650px] table-fixed border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-700 text-xs tracking-wide text-zinc-400 uppercase">
            <th className="w-[42%] px-3 py-3 font-semibold sm:px-4">
              Resource
            </th>
            <th className="w-[20%] px-3 py-3 font-semibold sm:px-4">
              Board / level
            </th>
            <th className="w-[18%] px-3 py-3 font-semibold sm:px-4">Code</th>
            <th className="px-3 py-3 font-semibold sm:px-4">Author</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr className="border-t border-zinc-800" key={resource.id}>
              <td className="px-3 py-2.5 sm:px-4">
                <a
                  className="text-zinc-300 no-underline hover:text-white"
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.resourceName}
                </a>
              </td>
              <td className="px-3 py-2.5 text-zinc-400 sm:px-4">
                {resource.board} · {resource.level}
              </td>
              <td className="px-3 py-2.5 text-zinc-400 sm:px-4">
                {resource.code}
              </td>
              <td className="px-3 py-2.5 text-zinc-400 sm:px-4">
                {resource.author || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
        <p className="text-center text-sm text-zinc-400">Loading subject...</p>
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
        <button
          className="mb-6 inline-flex items-center gap-2 border-0 bg-transparent px-0 py-1.5 font-semibold text-zinc-300 hover:text-white"
          onClick={clearSubject}
          type="button"
        >
          Back to all subjects
        </button>
        <p className="rounded-xl border border-red-500/35 bg-red-950/20 p-4 text-center text-red-300">
          That subject is not present in the resource repository.
        </p>
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

      <label className="mx-auto mb-7 flex min-h-[46px] w-full max-w-[660px] items-center gap-2.5 rounded-[0.65rem] border border-[#38383e] bg-[#171719] px-3.5 focus-within:border-blue-500">
        <span className="sr-only">Search subjects</span>
        <svg
          className="h-[19px] w-[19px] shrink-0 fill-none stroke-zinc-500 stroke-[1.8]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          className="w-full min-w-0 border-0 bg-transparent text-[0.95rem] text-white outline-none placeholder:text-zinc-500"
          type="search"
          placeholder="Search subjects"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {loading && (
        <p className="text-center text-sm text-zinc-400">Loading subjects...</p>
      )}
      {error && (
        <p className="rounded-xl border border-red-500/35 bg-red-950/20 p-4 text-center text-red-300">
          {error}
        </p>
      )}

      <div className="space-y-8">
        {(
          [
            { label: "IGCSE", track: "IGCSE" },
            { label: "A Levels", track: "Advanced" },
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
                  <button
                    className="flex min-h-[76px] min-w-0 cursor-pointer items-center gap-3 rounded-[0.55rem] border border-[#35353b] bg-[#19191c] p-2.5 text-left text-white transition-colors hover:border-[#4b4b54] hover:bg-[#202024]"
                    key={subject.id}
                    onClick={() => {
                      window.location.hash = `${SUBJECT_HASH}${subject.id}`;
                    }}
                    type="button"
                  >
                    <span
                      className={`inline-flex size-[46px] shrink-0 items-center justify-center rounded ${SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)]}`}
                    >
                      <CategoryIcon category={subject.category} />
                    </span>
                    <span className="grid min-w-0 gap-0.5">
                      <span className="text-xs font-semibold text-white">
                        {subject.board} |{" "}
                        {subject.track === "IGCSE"
                          ? "IGCSE"
                          : subject.levels.join(" · ")}
                      </span>
                      <span className="overflow-hidden text-ellipsis text-base leading-tight font-bold">
                        {subject.codes.join(" / ")} {subject.name}
                      </span>
                      <span className="text-xs text-[#a2a2a8]">
                        {subject.resourceCount} resources available
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {!loading && !error && visibleSubjects.length === 0 && (
        <p className="text-center text-zinc-400">
          No subjects match your search.
        </p>
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

  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <button
        className="mb-6 inline-flex items-center gap-2 border-0 bg-transparent px-0 py-1.5 font-semibold text-zinc-300 hover:text-white"
        onClick={onBack}
        type="button"
      >
        <span aria-hidden="true">←</span> Back to all subjects
      </button>

      <header className="mx-auto mb-8 max-w-3xl text-center">
        <div className="mb-3 flex justify-center">
          <span
            className={`inline-flex size-12 items-center justify-center ${SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)]}`}
          >
            <CategoryIcon category={subject.category} size={32} />
          </span>
        </div>
        <h4 className="m-0 leading-tight font-extrabold tracking-tight sm:text-3xl">
          {subject.board} {subject.levels}
        </h4>
        <h1 className="m-0 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
          {subject.name}
        </h1>
        <p className="mt-2 text-base font-semibold text-zinc-300">
          All of our resources are made by volunteer students.{" "}
          <a
            className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white"
            href="/opportunities"
          >
            Find out more
          </a>
          .
        </p>
      </header>

      {error && (
        <p className="border border-red-500/35 bg-red-950/20 p-4 text-center text-red-300">
          {error}
        </p>
      )}
      {!resources && !error && (
        <p className="text-center text-sm text-zinc-400">
          Loading subject resources...
        </p>
      )}
      {resources && resources.length > 0 && (
        <section className="mx-auto mt-8 max-w-5xl">
          <ResourceViewer
            groups={groups}
            selectedResource={selectedResource}
            onSelectResource={setSelectedResourceId}
          />
        </section>
      )}
      {resources && resources.length === 0 && (
        <p className="text-center text-sm text-zinc-400">
          No resources match this subject.
        </p>
      )}

      {resources && (
        <>
          <section className="mt-9 border-t border-zinc-800 pt-5">
            <h2 className="mb-3 text-xl font-bold">Study tools</h2>
            <StudyToolsParagraph links={links} />
          </section>

          <section className="mt-9">
            <h2 className="mb-3 border-b border-zinc-800 pb-2 text-xl font-bold">
              Resource bank
            </h2>
            {resources.length === 0 ? (
              <p className="text-sm text-zinc-400">No matching resources.</p>
            ) : (
              <ResourceBank resources={resources} />
            )}
          </section>
        </>
      )}
    </main>
  );
}
