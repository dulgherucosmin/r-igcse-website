import { covers } from "@/data/covers";
import { examSessions } from "@/data/events";
import { socials } from "@/data/footer";
import { introduction, stats } from "@/data/home";
import { teamRoles } from "@/data/team";
import { timeline } from "@/data/timeline";
import { SITE_URL } from "@/lib/config";
import { formatSessionDate } from "@/lib/exam-sessions";

type SitePage = {
  path: string;
  title: string;
  description: string;
  priority: number;
  markdown: () => string;
};

const url = (path: string) => `${SITE_URL}${path || "/"}`;

const featuredResources = () =>
  covers
    .map(
      (cover) =>
        `- [${cover.subject} (${cover.code}): ${cover.title}](https://drive.google.com/file/d/${cover.driveId}/view) by ${cover.author}, ${cover.level}`,
    )
    .join("\n");

export const sitePages: SitePage[] = [
  {
    path: "",
    title: "r/IGCSE Resource Repository",
    description:
      "Free, student-made IGCSE, O Level and AS/A Level study resources from the r/IGCSE community.",
    priority: 1,
    markdown: () => `# r/IGCSE Resource Repository

${introduction}

${stats.map((stat) => `- **${stat.label}:** ${stat.value}`).join("\n")}

[Browse resources](${url("/resources")})

## Exam sessions

${examSessions.map((session) => `- **${session.title}:** starts ${formatSessionDate(session)} at ${session.time} (UTC${session.utcOffset})`).join("\n")}

## About us

### How we started

Beginning in 2019, the r/IGCSE Community caters to students around the globe, providing IGCSE and AS/A Level notes, subject guides, study sessions, and more. Our [Discord Server](${socials.discord}) has subject-specific channels where you can ask our verified Subject Helpers for assistance.

### Student-run and free

We are completely student-run, and all resources displayed have been created by other IGCSE and AS/A Level students. r/IGCSE is free and will always remain free.

## Why r/IGCSE?

We want every IGCSE and A Level student to have the resources and support they need to do their best in their exams.

- **Student-made resources:** Our resources are created by volunteer alumni students who have studied for and taken these exams. We aim to keep resources free for all students, always.
- **Student well-being:** We value student welfare and aim to foster a nurturing environment, so that no student feels alone on their academic journey and every student has access to support from a welcoming community.
- **Peer-to-peer mentorship:** Volunteer subject helpers are active every day in our Discord community, answering doubts and giving advice.
- **Discord Partner community:** Since 2021, r/IGCSE has been an officially recognised Discord Partner, with high-quality voice channels and recognition from Discord itself.

## Featured resources

${featuredResources()}
`,
  },
  {
    path: "/resources",
    title: "Resources",
    description:
      "Browse community-created IGCSE and AS/A Level study resources by subject.",
    priority: 0.9,
    markdown: () => `# Resources

Browse community-created IGCSE, O Level and AS/A Level study resources by subject. Resources cover CAIE and Edexcel, are written by volunteer students, and are free to read.

The full, searchable subject list is on [the resources page](${url("/resources")}). Each subject page lists its notes, guides and revision material with a built-in preview.

## Featured resources

${featuredResources()}

## Contribute or report a mistake

- [Contribute a resource](${url("/opportunities")})
- Found a mistake? Email igcseresources.1@gmail.com.
`,
  },
  {
    path: "/about",
    title: "About r/IGCSE",
    description:
      "The mission, resource repository and history of the r/IGCSE community.",
    priority: 0.7,
    markdown: () => `# About r/IGCSE

## Our mission

r/IGCSE caters to students around the globe, providing both IGCSE & AS/A Level notes, subject guides, study sessions, and more. Our [Discord Server](${socials.discord}) is focused on providing subject-specific channels in which you or other students may ask our verified Subject Helpers for assistance.

We are completely student-run, and all resources displayed have been created by other IGCSE & AS/A Level students. r/IGCSE is free and will always remain free.

## Resource repository

r/IGCSE has ${stats.find((stat) => stat.label === "Published Resources")?.value ?? "100+"} resources published by our server members. These resources are free to view on our [resource repository](${url("/resources")}).

If you find any mistakes within official r/IGCSE published resources, please contact us at igcseresources.1@gmail.com.

## Timeline

${timeline.map((event) => `- **${event.date}: ${event.title}.** ${event.body}`).join("\n")}
`,
  },
  {
    path: "/opportunities",
    title: "Opportunities",
    description: "Volunteer and contributor opportunities at r/IGCSE.",
    priority: 0.6,
    markdown: () => `# Opportunities

Opportunities are coming soon. Want to help out in the meantime? Reach out to the team on our [Discord server](${socials.discord}).
`,
  },
  {
    path: "/team",
    title: "The Team Behind r/IGCSE",
    description: "The volunteers who run the r/IGCSE community.",
    priority: 0.5,
    markdown: () => `# The Team Behind r/IGCSE

${teamRoles
  .map(
    (group) =>
      `## ${group.role}\n\n${group.description}\n\n${group.members.map((member) => `- ${member.name}, ${member.title}`).join("\n")}`,
  )
  .join("\n\n")}
`,
  },
];

export const pageUrl = (page: SitePage) => url(page.path);
export const markdownUrl = (page: SitePage) =>
  `${SITE_URL}${page.path || "/index"}.md`;

export const community = [
  { title: "Discord", href: socials.discord },
  { title: "Reddit", href: socials.reddit },
];
