import type { Board as ExamBoard } from "@/components/Countdowns";
import { socials } from "@/data/footer";
import { SITE_URL } from "@/lib/config";
import type { DriveResource, DriveSubject } from "@/lib/drive";
import { driveView, LEVEL_NAMES } from "@/lib/drive-urls";
import { sitePages } from "@/lib/site-pages";

const CONTEXT = "https://schema.org";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const absolute = (path: string) => `${SITE_URL}${path || "/"}`;
const levelName = (level: string) => LEVEL_NAMES[level] ?? level;

const page = (path: string) => {
  const entry = sitePages.find((candidate) => candidate.path === path);
  if (!entry) throw new Error(`No site page for structured data: ${path}`);
  return entry;
};

const subjectName = (subject: DriveSubject) =>
  `${subject.levels.map(levelName).join(" / ")} ${subject.name}`;

type Crumb = { name: string; path: string };

const breadcrumbs = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "" }, ...crumbs].map(
    (crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    }),
  ),
});

/** Organization + WebSite, rendered once in the root layout. */
export function siteJsonLd() {
  const home = page("");
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": ORGANIZATION_ID,
        name: "r/IGCSE",
        url: absolute(""),
        logo: absolute("/r.igcse_logo.png"),
        description: home.description,
        foundingDate: "2019",
        email: socials.email.replace("mailto:", ""),
        sameAs: [
          socials.discord,
          socials.reddit,
          socials.instagram,
          socials.youtube,
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "r/IGCSE",
        alternateName: home.title,
        url: absolute(""),
        description: home.description,
        inLanguage: "en",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/** CollectionPage + BreadcrumbList for /resources. */
export function resourcesJsonLd(subjects: DriveSubject[]) {
  const entry = page("/resources");
  const url = absolute(entry.path);
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: entry.title,
        description: entry.description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(subjects.length > 0 && {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: subjects.length,
            itemListElement: subjects.map((subject, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${subjectName(subject)} (${subject.board})`,
              url: absolute(`/resources/${subject.id}`),
            })),
          },
        }),
      },
      {
        ...breadcrumbs([{ name: entry.title, path: entry.path }]),
        "@id": `${url}#breadcrumb`,
      },
    ],
  };
}

/** BreadcrumbList + ItemList of LearningResource for /resources/[subject]. */
export function subjectJsonLd(
  subject: DriveSubject,
  resources: DriveResource[],
) {
  const url = absolute(`/resources/${subject.id}`);
  const name = `${subjectName(subject)} (${subject.board})`;
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        ...breadcrumbs([
          { name: page("/resources").title, path: "/resources" },
          { name, path: `/resources/${subject.id}` },
        ]),
        "@id": `${url}#breadcrumb`,
      },
      {
        "@type": "ItemList",
        "@id": `${url}#resources`,
        name: `${name} resources`,
        url,
        numberOfItems: resources.length,
        itemListElement: resources.map((resource, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "LearningResource",
            name: resource.resourceName,
            url: resource.url || driveView(resource.id),
            educationalLevel: levelName(resource.level),
            about: {
              "@type": "Thing",
              name: `${resource.board} ${levelName(resource.level)} ${subject.name}${resource.code ? ` (${resource.code})` : ""}`,
            },
            isAccessibleForFree: true,
            inLanguage: "en",
            ...(resource.author && {
              author: { "@type": "Person", name: resource.author },
            }),
            ...(resource.modifiedTime && {
              dateModified: resource.modifiedTime,
            }),
            provider: { "@id": ORGANIZATION_ID },
          },
        })),
      },
    ],
  };
}

/** One Event per exam session for /sessions. */
export function sessionsJsonLd(boards: ExamBoard[]) {
  const url = absolute("/sessions");
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        ...breadcrumbs([{ name: page("/sessions").title, path: "/sessions" }]),
        "@id": `${url}#breadcrumb`,
      },
      ...boards.flatMap((board) =>
        board.sessions.map((session) => ({
          "@type": "EducationEvent",
          name: `${board.name} ${session.title} exam session`,
          description: `${board.fullName} ${session.title} exam series. ${board.blurb}${session.note ? ` ${session.note}` : ""}`,
          startDate: session.start,
          endDate: session.end,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          url,
          organizer: {
            "@type": "Organization",
            name: board.fullName,
            url: board.timetablesUrl,
          },
        })),
      ),
    ],
  };
}
