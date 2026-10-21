"use client";

import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  value: string; // final value we want to display
  durationMs?: number; // how long the animation should last
};

// parses the string value into a useable number e.g 200,000+ -> 200000
function parseStat(value: string) {
  const match = /^([\d,]+)(.*)$/.exec(value.trim());
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export default function StatsAnimation({
  value,
  durationMs = 2000,
}: CountUpStatProps) {
  const { target, suffix } = parseStat(value);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || target === 0) {
      setDisplay(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);   
  }, [target, durationMs]);

  return (
    <span className="tabular-nums">
      {/* Decorative counter; screen readers get the final value below instead. */}
      <span aria-hidden="true">
        {display.toLocaleString()}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}