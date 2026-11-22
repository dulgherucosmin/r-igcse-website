"use client";

import {
  ArrowUpRightIcon,
  CalendarDotsIcon,
  ChartBarIcon,
} from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types (the data itself lives in app/countdowns/page.tsx)                  */
/* -------------------------------------------------------------------------- */

export type SessionResult = {
  /** e.g. "AS & A Level". */
  label: string;
  /** ISO timestamp with offset. Leave out if the date hasn't been announced. */
  at?: string;
  /** Set to true only when the official release time is known. */
  exactTime?: boolean;
};

export type Session = {
  title: string;
  /** ISO timestamp with offset, e.g. "2027-02-03T08:00:00+00:00". */
  start: string;
  /** ISO timestamp with offset. Use the end of the last exam day. */
  end: string;
  note?: string;
  results: SessionResult[];
};

export type Board = {
  id: string;
  name: string;
  fullName: string;
  blurb: string;
  /** Official page with exam timetables. */
  timetablesUrl: string;
  /** Official page with grade thresholds / boundaries. */
  gradesUrl: string;
  sessions: Session[];
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const ts = (iso: string) => new Date(iso).getTime();
const pad = (value: number) => String(value).padStart(2, "0");

function getTimeLeft(target: number, now: number) {
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const longDay = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const shortDay = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});
const shortDayYear = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatLong = (iso: string) => longDay.format(new Date(iso));
const formatRange = (session: Session) =>
  `${shortDay.format(new Date(session.start))} – ${shortDayYear.format(new Date(session.end))}`;

const isoDay = (iso: string) => new Date(iso).toISOString().slice(0, 10);

type BoardState = {
  ongoing: Session[];
  awaiting: Session[];
  next: Session | undefined;
};

function deriveBoard(board: Board, now: number): BoardState {
  const ongoing = board.sessions.filter(
    (session) => ts(session.start) <= now && now <= ts(session.end),
  );
  // Over, but at least one results day is still to come.
  const awaiting = board.sessions.filter(
    (session) =>
      ts(session.end) < now &&
      session.results.some((result) => result.at && ts(result.at) > now),
  );
  const next = board.sessions.find((session) => ts(session.start) > now);
  return { ongoing, awaiting, next };
}

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

function Digits({
  target,
  now,
  label,
}: {
  target: number;
  now: number;
  label: string;
}) {
  const left = getTimeLeft(target, now);
  const units = [
    { label: "Days", value: left.days },
    { label: "Hours", value: left.hours },
    { label: "Min", value: left.minutes },
    { label: "Sec", value: left.seconds },
  ];

  return (
    <div
      role="timer"
      aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes and ${left.seconds} seconds until ${label}`}
      className="grid max-w-md grid-cols-4 gap-2 sm:gap-3"
    >
      {units.map((unit) => (
        <div key={unit.label} aria-hidden="true">
          <div className="relative overflow-hidden rounded-xl bg-linear-to-b from-black/80 to-black/50 px-1 py-2 text-center shadow-inner ring-1 ring-border sm:py-3">
            <span className="block text-3xl font-extrabold text-highlight tabular-nums sm:text-4xl md:text-5xl">
              {pad(unit.value)}
            </span>
            {/* thin split line across the middle, like a flip clock */}
            <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-background/70" />
          </div>
          <span className="mt-1.5 block text-center text-[10px] font-semibold tracking-wide text-muted-foreground uppercase sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Strip({
  tone,
  badge,
  title,
  children,
}: {
  tone: "now" | "results" | "next";
  badge: string;
  title: string;
  children: React.ReactNode;
}) {
  const border = {
    now: "border-primary",
    results: "border-highlight",
    next: "border-input",
  }[tone];

  return (
    <article className={`border-l-4 ${border} py-1 pl-5 md:pl-6`}>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {tone === "now" && (
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-primary motion-safe:animate-pulse"
            />
          )}
          {badge}
        </Badge>
      </div>
      <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
        {title}
      </h3>
      {children}
    </article>
  );
}

function OngoingStrip({ session, now }: { session: Session; now: number }) {
  const start = ts(session.start);
  const end = ts(session.end);
  const percent = Math.min(
    100,
    Math.max(0, ((now - start) / (end - start)) * 100),
  );
  const daysLeft = Math.max(0, Math.ceil((end - now) / 86_400_000));

  return (
    <Strip tone="now" badge="Underway" title={`${session.title} is underway`}>
      <p className="mt-2 text-muted-foreground">
        Runs until{" "}
        <time
          dateTime={isoDay(session.end)}
          className="font-semibold text-foreground"
        >
          {formatLong(session.end)}
        </time>
        . Good luck to everyone sitting exams!
      </p>
      <div className="mt-5 max-w-md">
        <div
          role="progressbar"
          aria-label={`${session.title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          className="h-1.5 overflow-hidden rounded-full bg-secondary"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {daysLeft} {daysLeft === 1 ? "day" : "days"} left in the session
        </p>
      </div>
      {session.note && (
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          {session.note}
        </p>
      )}
    </Strip>
  );
}

function ResultsStrip({ session, now }: { session: Session; now: number }) {
  const hasApproxTime = session.results.some(
    (result) => result.at && ts(result.at) > now && !result.exactTime,
  );

  return (
    <Strip
      tone="results"
      badge="Results day"
      title={`${session.title} results`}
    >
      <p className="mt-2 max-w-xl text-muted-foreground">
        The {session.title} session is over. Here&rsquo;s when results are
        released.
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {session.results.map((result) => {
          if (!result.at) {
            return (
              <div key={result.label}>
                <p className="font-bold">{result.label}</p>
                <p className="mt-1 text-muted-foreground">
                  Date to be announced
                </p>
              </div>
            );
          }
          const target = ts(result.at);
          return (
            <div key={result.label}>
              <p className="font-bold">{result.label}</p>
              <p className="mt-1 mb-4 text-muted-foreground">
                <time dateTime={isoDay(result.at)}>
                  {formatLong(result.at)}
                </time>
              </p>
              {target > now ? (
                <Digits
                  target={target}
                  now={now}
                  label={`${result.label} results for ${session.title}`}
                />
              ) : (
                <Badge variant="outline">Released</Badge>
              )}
            </div>
          );
        })}
      </div>
      {hasApproxTime && (
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          The exact release time isn&rsquo;t published, so the countdown runs to
          the start of the day (UTC).
        </p>
      )}
    </Strip>
  );
}

function NextStrip({ session, now }: { session: Session; now: number }) {
  return (
    <Strip tone="next" badge="Next session" title={session.title}>
      <p className="mt-2 mb-5 text-muted-foreground">
        Starts{" "}
        <time
          dateTime={isoDay(session.start)}
          className="font-semibold text-foreground"
        >
          {formatLong(session.start)}
        </time>
      </p>
      <Digits
        target={ts(session.start)}
        now={now}
        label={`the ${session.title} session`}
      />
      {session.note && (
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          {session.note}
        </p>
      )}
    </Strip>
  );
}

function resultsSummary(session: Session) {
  return session.results
    .map((result) =>
      result.at
        ? `${result.label}: ${shortDayYear.format(new Date(result.at))}`
        : `${result.label}: to be announced`,
    )
    .join(" · ");
}

function BoardLinks({ board }: { board: Board }) {
  const links = [
    {
      label: "Exam Timetables",
      href: board.timetablesUrl,
      Icon: CalendarDotsIcon,
    },
    { label: "Grade Thresholds", href: board.gradesUrl, Icon: ChartBarIcon },
  ];

  return (
    <ul className="mt-10 flex flex-wrap gap-2">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={cn(
            buttonVariants({ size: "lg" }),
            "bg-[#ff1a1a] text-white hover:bg-[#ff1a1a]/90",
          )}
          >
            <Icon aria-hidden="true" />
            {label}
            <ArrowUpRightIcon
              aria-hidden="true"
              data-icon="inline-end"
              className="text-foreground"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

function SessionList({ board, now }: { board: Board; now: number | null }) {
  return (
    <div className="mt-12">
      <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
        All {board.name} sessions
      </h3>
      <ul className="mt-3">
        {board.sessions.map((session) => {
          const status =
            now === null
              ? null
              : now < ts(session.start)
                ? "Upcoming"
                : now <= ts(session.end)
                  ? "Underway"
                  : session.results.some((r) => r.at && ts(r.at) > now)
                    ? "Awaiting results"
                    : "Complete";
          return (
            <li key={session.title}>
              <Separator />
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <div className="sm:w-56 sm:shrink-0">
                  <p className="font-bold">{session.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatRange(session)}
                  </p>
                </div>
                <p className="flex-1 text-sm text-muted-foreground">
                  {resultsSummary(session)}
                </p>
                {status && (
                  <Badge
                    variant={status === "Underway" ? "default" : "outline"}
                    className="self-start"
                  >
                    {status}
                  </Badge>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <Separator />
    </div>
  );
}

function BoardSection({ board, now }: { board: Board; now: number | null }) {
  const headingId = `${board.id}-heading`;
  const state = now === null ? null : deriveBoard(board, now);
  const nothing =
    state && !state.ongoing.length && !state.awaiting.length && !state.next;

  return (
    <section aria-labelledby={headingId}>
      <Separator />
      <div className="grid gap-8 py-12 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
        <div>
          <h2
            id={headingId}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            {board.name}
          </h2>
          <p className="mt-1 font-semibold text-brand">{board.fullName}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {board.blurb}
          </p>
        </div>

        <div>
          {state === null || now === null ? (
            <div aria-hidden="true" className="min-h-56" />
          ) : (
            <div className="space-y-12">
              {state.ongoing.map((session) => (
                <OngoingStrip key={session.title} session={session} now={now} />
              ))}
              {state.awaiting.map((session) => (
                <ResultsStrip key={session.title} session={session} now={now} />
              ))}
              {state.next && <NextStrip session={state.next} now={now} />}
              {nothing && (
                <p className="text-muted-foreground">
                  No upcoming sessions are listed yet. Check back soon.
                </p>
              )}
            </div>
          )}
          <BoardLinks board={board} />
          <SessionList board={board} now={now} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Export                                                                    */
/* -------------------------------------------------------------------------- */

export default function Countdowns({ boards }: { boards: Board[] }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {boards.map((board) => (
        <BoardSection key={board.id} board={board} now={now} />
      ))}
      <Separator />
    </div>
  );
}