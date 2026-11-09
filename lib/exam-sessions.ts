import type { ExamSession } from "@/data/events";

const DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const TIME = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;
const OFFSET = /^(?:Z|[+-]\d{2}:\d{2})$/;

const pad = (value: number) => String(value).padStart(2, "0");

function parseDate(date: string) {
  const match = DATE.exec(date.trim());
  if (!match) return null;
  const [day, month, year] = [match[1], match[2], match[3]].map(Number);
  const check = new Date(Date.UTC(year, month - 1, day));
  const valid =
    check.getUTCFullYear() === year &&
    check.getUTCMonth() === month - 1 &&
    check.getUTCDate() === day;
  return valid ? { day, month, year } : null;
}

function toTimestamp(date: string, time: string, utcOffset: string) {
  const day = parseDate(date);
  const clock = TIME.exec(time.trim());
  if (!day || !clock || !OFFSET.test(utcOffset.trim())) return Number.NaN;
  const [hours, minutes, seconds] = [clock[1], clock[2], clock[3] ?? "0"].map(
    Number,
  );
  if (hours > 23 || minutes > 59 || seconds > 59) return Number.NaN;
  return new Date(
    `${day.year}-${pad(day.month)}-${pad(day.day)}T${pad(hours)}:${pad(minutes)}:${pad(seconds)}${utcOffset.trim()}`,
  ).getTime();
}

export const sessionStart = (session: ExamSession) =>
  toTimestamp(session.date, session.time, session.utcOffset);

const sessionEnd = (session: ExamSession) =>
  toTimestamp(session.endDate, "23:59:59", session.utcOffset);

export type SessionState = { current: number | null; next: number | null };

export function pickSessions(
  sessions: ExamSession[],
  now: number,
): SessionState {
  const current = sessions.findIndex(
    (session) => sessionStart(session) <= now && now <= sessionEnd(session),
  );
  const next = sessions.findIndex((session) => sessionStart(session) > now);
  return {
    current: current === -1 ? null : current,
    next: next === -1 ? null : next,
  };
}

const dayFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatSessionDate(session: ExamSession) {
  const day = parseDate(session.date);
  if (!day) return session.date;
  return dayFormat.format(new Date(Date.UTC(day.year, day.month - 1, day.day)));
}
