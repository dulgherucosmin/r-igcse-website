"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ExamSession } from "@/data/events";
import {
  formatSessionDate,
  formatSessionEndDate,
  isoDay,
  pickSessions,
  type SessionState,
  sessionStart,
} from "@/lib/exam-sessions";

function getTimeLeft(target: number, now: number) {
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

export default function Countdown({
  sessions,
  initial,
}: {
  sessions: ExamSession[];
  initial: SessionState;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const state = now === null ? initial : pickSessions(sessions, now);
  const current = state.current === null ? null : sessions[state.current];
  const next = state.next === null ? null : sessions[state.next];
  if (!current && !next) return null;

  const timeLeft =
    !current && next && now !== null
      ? getTimeLeft(sessionStart(next), now)
      : null;

  const units = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  return (
    <section aria-labelledby="countdown-title" className="page-container py-16">
      <Card className="mx-auto max-w-3xl text-center md:py-10">
        {current ? (
          <CardHeader className="justify-items-center gap-3 md:px-10">
            <CardTitle
              id="countdown-title"
              className="text-2xl font-bold md:text-4xl"
            >
              {current.title} is underway
            </CardTitle>
            <CardDescription className="mx-auto max-w-xl text-lg leading-relaxed">
              Good luck to everyone sitting exams! Our free resources are here
              whenever you need a last-minute revision.
            </CardDescription>
            <Badge variant="secondary" className="mt-1 text-sm">
              Runs until{" "}
              <time dateTime={isoDay(current.endDate)}>
                {formatSessionEndDate(current)}
              </time>
            </Badge>
          </CardHeader>
        ) : (
          next && (
            <>
              <CardHeader className="justify-items-center md:px-10">
                <CardTitle
                  id="countdown-title"
                  className="text-2xl font-bold md:text-4xl"
                >
                  Next session: {next.title}
                </CardTitle>
                <CardDescription className="mx-auto max-w-xl text-base leading-relaxed">
                  Countdown to the start of the {next.title} exam session. Make
                  the most of the time left with our free resources.
                </CardDescription>
                <p className="mx-auto max-w-xl text-xl leading-relaxed">
                  <time dateTime={isoDay(next.date)}>
                    {formatSessionDate(next)}
                  </time>
                </p>
              </CardHeader>
              <CardContent className="md:px-10">
                <div
                  role="timer"
                  aria-label={
                    timeLeft
                      ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds until the ${next.title} session`
                      : "Loading countdown"
                  }
                  className="grid grid-cols-4 gap-2 md:gap-6"
                >
                  {units.map((unit) => (
                    <Card
                      key={unit.label}
                      size="sm"
                      aria-hidden="true"
                      className="gap-1 bg-background px-1 md:py-6"
                    >
                      <span className="text-3xl font-extrabold text-highlight tabular-nums sm:text-4xl md:text-6xl">
                        {unit.value === undefined ? "--" : pad(unit.value)}
                      </span>
                      <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase sm:text-xs md:text-sm">
                        {unit.label}
                      </span>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </>
          )
        )}
      </Card>
    </section>
  );
}
