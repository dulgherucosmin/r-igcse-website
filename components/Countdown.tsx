"use client";

import { useEffect, useState } from "react";
import type { CountdownEvent } from "@/data/events";

/**
 * Converts the DD/MM/YYYY date, HH:MM[:SS] time and UTC offset from the event
 * config into a timestamp. Returns NaN if any part is invalid (including dates
 * that don't exist, like 31/02/2026).
 */
function parseEventDate(event: CountdownEvent) {
  const dateMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(event.date.trim());
  const timeMatch = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(event.time.trim());
  const offsetMatch = /^(?:Z|[+-]\d{2}:\d{2})$/.exec(event.utcOffset.trim());
  if (!dateMatch || !timeMatch || !offsetMatch) return Number.NaN;

  const [day, month, year] = [dateMatch[1], dateMatch[2], dateMatch[3]].map(
    Number,
  );
  const [hours, minutes, seconds] = [
    timeMatch[1],
    timeMatch[2],
    timeMatch[3] ?? "0",
  ].map(Number);

  const check = new Date(Date.UTC(year, month - 1, day));
  const validDate =
    check.getUTCFullYear() === year &&
    check.getUTCMonth() === month - 1 &&
    check.getUTCDate() === day;
  if (!validDate || hours > 23 || minutes > 59 || seconds > 59)
    return Number.NaN;

  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${event.utcOffset.trim()}`;
  return new Date(iso).getTime();
}

function getTimeLeft(target: number, now: number) {
  const diff = target - now;
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));

  return {
    ended: diff <= 0,
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

export default function Countdown({ event }: { event: CountdownEvent }) {
  const target = parseEventDate(event);
  // null until mounted, so server and client render the same markup.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (Number.isNaN(target)) return null;

  const timeLeft = now === null ? null : getTimeLeft(target, now);

  const units = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  return (
    <section
      aria-labelledby="countdown-title"
      className="border-t border-zinc-800 px-6 py-16 md:px-16"
    >
      <div className="mx-auto max-w-3xl rounded-lg border-t-4 border-primary-500 bg-[#141417] p-6 text-center md:p-10">
        {event.label && (
          <p className="text-sm font-semibold tracking-wide text-primary-500 uppercase">
            {event.label}
          </p>
        )}
        <h2
          id="countdown-title"
          className="mt-1 text-2xl font-bold md:text-4xl"
        >
          {event.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-300">
          {event.description}
        </p>
        
        <p className="mx-auto mt-3 mb-0 max-w-xl text-xl leading-relaxed text-white-500">
          {event.date}
        </p>

        {timeLeft?.ended ? (
          <p className="mt-8 text-lg font-semibold text-[#fefb88]">
            {event.endedMessage}
          </p>
        ) : (
          <div
            role="timer"
            aria-label={
              timeLeft
                ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds remaining`
                : "Loading countdown"
            }
            className="mt-6 grid grid-cols-4 gap-2 md:gap-6"
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-lg border border-zinc-800 bg-[#121010] px-1 py-4 md:px-2 md:py-6"
              >
                <div
                  aria-hidden="true"
                  className="text-3xl font-extrabold text-[#fefb88] tabular-nums sm:text-4xl md:text-6xl"
                >
                  {unit.value === undefined ? "--" : pad(unit.value)}
                </div>
                <div
                  aria-hidden="true"
                  className="mt-1 text-[10px] font-semibold tracking-wide text-zinc-400 uppercase sm:text-xs md:text-sm"
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}