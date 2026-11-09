import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import type { DriveResource } from "@/lib/drive";
import { pageUrl, sitePages } from "@/lib/site-pages";
import { loadAllResources } from "@/lib/subject-data";

const latest = (dates: (string | undefined)[]) =>
  dates
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resources: DriveResource[] = await loadAllResources().catch(() => []);
  const subjects = Map.groupBy(resources, (resource) => resource.subjectId);

  return [
    ...sitePages.map((page) => ({
      url: pageUrl(page),
      priority: page.priority,
    })),
    ...Array.from(subjects, ([subjectId, entries]) => ({
      url: `${SITE_URL}/resources/${subjectId}`,
      lastModified: latest(entries.map((entry) => entry.modifiedTime)),
      priority: 0.7,
    })),
    ...resources.map((resource) => ({
      url: `${SITE_URL}/resources/${resource.subjectId}/${resource.id}`,
      lastModified: resource.modifiedTime,
      priority: 0.5,
    })),
  ];
}
