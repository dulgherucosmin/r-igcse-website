import { queryOptions } from "@tanstack/react-query";
import type { DriveSubject } from "@/lib/drive";

export const subjectsQueryKey = ["subjects"] as const;

async function fetchSubjects(): Promise<DriveSubject[]> {
  const response = await fetch("/api/subjects");
  const data: { subjects?: DriveSubject[]; error?: string } =
    await response.json();
  if (!response.ok) throw new Error(data.error ?? "Unable to load subjects.");
  return data.subjects ?? [];
}

export const subjectsQueryOptions = queryOptions({
  queryKey: subjectsQueryKey,
  queryFn: fetchSubjects,
  // The resources page hydrates this with the subjects from the build. With a
  // finite stale time they go stale before the page is rebuilt, and every visit
  // after that refetches /api/subjects, which crawls Drive again.
  staleTime: Number.POSITIVE_INFINITY,
});
