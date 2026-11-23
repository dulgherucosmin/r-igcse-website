import { socials } from "@/data/footer";
import { SITE_URL } from "@/lib/config";

type SitePage = {
  path: string;
  title: string;
  description: string;
  priority: number;
};

const url = (path: string) => `${SITE_URL}${path || "/"}`;

export const sitePages: SitePage[] = [
  {
    path: "",
    title: "r/IGCSE Resource Repository",
    description:
      "Free, student-made IGCSE, O Level and AS/A Level study resources from the r/IGCSE community.",
    priority: 1,
  },
  {
    path: "/resources",
    title: "Resources",
    description:
      "Browse community-created IGCSE and AS/A Level study resources by subject.",
    priority: 0.9,
  },
  {
    path: "/about",
    title: "About r/IGCSE",
    description:
      "The mission, resource repository and history of the r/IGCSE community.",
    priority: 0.7,
  },
  {
    path: "/opportunities",
    title: "Opportunities",
    description: "Volunteer and contributor opportunities at r/IGCSE.",
    priority: 0.6,
  },
  {
    path: "/team",
    title: "The Team Behind r/IGCSE",
    description: "The volunteers who run the r/IGCSE community.",
    priority: 0.5,
  },
  {
    path: "/official-bot",
    title: "r/IGCSE Bot",
    description:
      "Learn what the r/IGCSE Discord bot does, explore its features, and meet its contributors.",
    priority: 0.4,
  },
  {
    path: "/partners",
    title: "IGCSE & A Level Study Partners",
    description:
      "Explore trusted IGCSE, O Level and AS/A Level revision tools and student communities partnered with r/IGCSE. See partner benefits and application requirements.",
    priority: 0.5,
  },
  {
    path: "/sessions",
    title: "Exam Sessions & Results Dates",
    description:
      "Check upcoming CAIE and Pearson Edexcel exam sessions, countdowns and results dates for IGCSE, O Level and AS/A Level. Confirm exam details with your school or exam centre.",
    priority: 0.8,
  },
];

export const pageUrl = (page: SitePage) => url(page.path);

export const community = [
  { title: "Discord", href: socials.discord },
  { title: "Reddit", href: socials.reddit },
];
