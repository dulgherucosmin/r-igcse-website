"use client";

import { useEffect, useState } from "react";
import { isDirectLanding } from "@/lib/landing";

type CountUpStatProps = {
  value: string;
  from?: number;
  durationMs?: number;
};

function parseStat(value: string) {
  const match = /^([\d,]+)(.*)$/.exec(value.trim());
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export default function StatsAnimation({
  value,
  from = 0,
  durationMs = 2000,
}: CountUpStatProps) {
  const { target, suffix } = parseStat(value);
  const [animate] = useState(isDirectLanding);
  const [display, setDisplay] = useState(animate ? from : target);

  useEffect(() => {
    if (!animate) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || target === from) {
      setDisplay(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(from + easeOutCubic(progress) * (target - from)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, from, target, durationMs]);

  return (
    <span className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {target.toLocaleString("en-US")}
        {suffix}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {display.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
