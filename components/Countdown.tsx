"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FixedDigits } from "@/components/fixed-digits";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Board } from "@/data/events";
import {
  isoDay,
  type NearestEvent,
  pickNearestEvent,
} from "@/lib/exam-sessions";
import { cn } from "@/lib/utils";
import { EventEmitter } from "node:stream";

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

const longDay = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function Countdown({
  boards,
  initial,
}: {
  boards: Board[];
  initial: NearestEvent | null;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const event = now === null ? initial : pickNearestEvent(boards, now);
  if (!event) return null;

  const isOngoing = event.type === "ongoing";
  const targetDate =
    event.type === "results"
      ? event.result.at
      : event.type === "session"
        ? event.session.start
        : event.session.end;
  const target = new Date(targetDate).getTime();
  const timeLeft = now === null ? null : getTimeLeft(event.target, now);
  const label =
    event.type === "results"
      ? `${event.board.name} ${event.result.label} results for ${event.session.title}`
      : event.type === "session"
        ? `the ${event.board.name} ${event.session.title} session`
        : `${event.board.name} ${event.session.title}`;
  const title =
    event.type === "ongoing"
      ? `${event.board.name} ${event.session.title} is underway`
      : event.type === "results"
        ? `${event.session.short} ${event.result.label} Results Day`
        : `${event.board.name} ${event.session.title}`;
  const description =
    event.type === "ongoing"
      ? "Good luck to everyone sitting exams! Our free resources are here whenever you need a last-minute revision."
      : event.type === "results"
        ? `Results for ${event.session.short} ${event.board.name} ${event.result.label} be available on:`
        : `Countdown to the start of the ${event.board.name} ${event.session.title} exam session. Make the most of the time left with our free resources.`;

  const units = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  return (
    <section aria-labelledby="countdown-title" className="page-container py-16">
      <Card className="mx-auto max-w-3xl text-center md:py-10">
        <CardHeader className="justify-items-center gap-3 md:px-10">
          <CardTitle
            id="countdown-title"
            className="text-2xl font-bold md:text-4xl"
          >
            {title}
          </CardTitle>
          <CardDescription className="mx-auto max-w-xl text-lg leading-relaxed">
            {description}
          </CardDescription>
          {isOngoing ? (
            <Badge variant="secondary" className="mt-1 text-sm">
              Runs until{" "}
              <time dateTime={isoDay(targetDate)}>
                {longDay.format(new Date(target))}
              </time>
            </Badge>
          ) : (
            <p className="mx-auto max-w-xl text-xl leading-relaxed">
              <time dateTime={isoDay(targetDate)}>
                {longDay.format(new Date(target))}
              </time>
            </p>
          )}
        </CardHeader>

        {!isOngoing && (
          <CardContent className="md:px-10">
            <div
              role="timer"
              aria-label={
                timeLeft
                  ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds until ${label}`
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
                    <FixedDigits
                      value={
                        unit.value === undefined ? "--" : pad(unit.value)
                      }
                    />
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase sm:text-xs md:text-sm">
                    {unit.label}
                  </span>
                </Card>
              ))}
            </div>
            {event.type === "results" && !event.result.exactTime && (
              <p className="mt-4 text-sm text-muted-foreground">
                The exact release time isn&rsquo;t published, so the countdown
                runs to the start of the day (UTC).
              </p>
            )}
          </CardContent>
        )}

        <CardContent className="mt-4 flex justify-center pt-0 md:px-10">
          <Link
            href="/sessions"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#ff1a1a] text-white hover:bg-[#ff1a1a]/90",
            )}
          >
            More Session Information
            <ArrowUpRightIcon
              weight="bold"
              aria-hidden="true"
              data-icon="inline-end"
            />
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
