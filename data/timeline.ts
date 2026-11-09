export type TimelineEvent = {
  date: string;
  title: string;
  body: string;
  icon: "reddit" | "discord" | "handshake" | "users";
};

export const timeline: TimelineEvent[] = [
  {
    date: "October 14th, 2009",
    title: "r/IGCSE Subreddit",
    body: "The r/IGCSE official subreddit is created.",
    icon: "reddit",
  },
  {
    date: "May 10, 2019",
    title: "r/IGCSE Discord Server",
    body: "The r/IGCSE official Discord Server is created, started by a small team of students alongside the founder 1337HP (nomitsune).",
    icon: "discord",
  },
  {
    date: "June, 2021",
    title: "Discord Partner Status",
    body: "Discord officially recognises our community and r/IGCSE becomes a Discord Partner.",
    icon: "handshake",
  },
  {
    date: "September 14, 2025",
    title: "50,000 Server Members!",
    body: "The r/IGCSE Discord Server hits 50,000 server members!",
    icon: "users",
  },
];
