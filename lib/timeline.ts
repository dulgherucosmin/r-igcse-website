import type { TimelineEvent } from "@/data/timeline";

const FORMATS = {
  year: new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: "UTC" }),
  month: new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
  day: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
};

function parts(date: string) {
  const [year, month = 1, day = 1] = date.split("-").map(Number);
  return { year, month, day, precision: date.split("-").length };
}

export function formatTimelineDate(date: string) {
  const { year, month, day, precision } = parts(date);
  const format =
    precision === 1
      ? FORMATS.year
      : precision === 2
        ? FORMATS.month
        : FORMATS.day;
  return format.format(new Date(Date.UTC(year, month - 1, day)));
}

export function sortTimeline<T extends TimelineEvent>(events: readonly T[]) {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}
