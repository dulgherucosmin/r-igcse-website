import type { TimelineIconName } from "@/lib/timeline-icons";

export type TimelineEvent = {
  date: `${number}` | `${number}-${number}` | `${number}-${number}-${number}`;
  title: string;
  body: string;
  icon: TimelineIconName;
  link?: { label: string; href: string };
};

export const timeline = [
  {
    date: "2009-10-14",
    title: "r/IGCSE Subreddit",
    body: "The r/IGCSE official subreddit is created.",
    icon: "reddit",
    link: { label: "Visit r/IGCSE", href: "https://www.reddit.com/r/IGCSE/" },
  },
  {
    date: "2019-05-10",
    title: "r/IGCSE Discord Server",
    body: "The r/IGCSE official Discord Server is created, started by a small team of students alongside the founder 1337HP (nomitsune).",
    icon: "discord",
    link: { label: "Join the server", href: "https://discord.gg/igcse" },
  },
  {
    date: "2021-06",
    title: "Discord Partner Status",
    body: "Discord officially recognises our community and r/IGCSE becomes a Discord Partner.",
    icon: "handshake",
  },
  {
    date: "2025-09-14",
    title: "50,000 Server Members!",
    body: "The r/IGCSE Discord Server hits 50,000 server members!",
    icon: "users",
  },
] satisfies TimelineEvent[];
