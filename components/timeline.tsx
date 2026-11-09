"use client";

import { HandshakeIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useId, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Discord } from "@/components/ui/svgs/discord";
import { Reddit } from "@/components/ui/svgs/reddit";
import type { TimelineEvent } from "@/data/timeline";
import { cn } from "@/lib/utils";

const ICONS = {
  reddit: Reddit,
  discord: Discord,
  handshake: HandshakeIcon,
  users: UsersThreeIcon,
};

const HEAD_LENGTH = 14;

function TimelineItem({
  event,
  reduceMotion,
}: {
  event: TimelineEvent;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40% 0px" });
  const shown = reduceMotion || inView;
  const Icon = ICONS[event.icon];

  return (
    <li ref={ref} className="relative z-10">
      <Item className="items-start px-2">
        <ItemMedia
          variant="icon"
          className={cn(
            "size-9 rounded-full bg-secondary ring-4 ring-background transition-[color,filter,opacity,box-shadow] duration-500",
            shown
              ? "text-brand opacity-100 shadow-[0_0_0_1px_var(--primary),0_0_18px_-2px_var(--primary)]"
              : "text-muted-foreground opacity-50 grayscale",
          )}
        >
          <Icon className="size-5" />
        </ItemMedia>
        <motion.div
          className="min-w-0 flex-1"
          initial={false}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ItemContent>
            <Badge variant="secondary">{event.date}</Badge>
            <ItemTitle className="mt-1 text-lg font-semibold">
              {event.title}
            </ItemTitle>
            <ItemDescription className="line-clamp-none text-base">
              {event.body}
            </ItemDescription>
          </ItemContent>
        </motion.div>
      </Item>
    </li>
  );
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const id = useId();
  const fillId = `${id}-fill`;
  const headId = `${id}-head`;
  const maskId = `${id}-mask`;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  const fillHeight = useTransform(progress, (value) =>
    reduceMotion ? 100 : Math.min(100, Math.max(0, value * 100)),
  );
  const headY = useTransform(fillHeight, (value) => value - HEAD_LENGTH);
  const headOpacity = useTransform(fillHeight, (value) =>
    reduceMotion || value <= 0 || value >= 100 ? 0 : 1,
  );

  return (
    <ol ref={listRef} className="relative max-w-2xl space-y-2">
      <svg
        aria-hidden="true"
        viewBox="0 0 4 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-4 left-[calc(1.625rem-2px)] h-[calc(100%-2rem)] w-1 overflow-visible"
      >
        <defs>
          <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <linearGradient id={headId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--highlight)" />
          </linearGradient>
          <mask id={maskId}>
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="100"
              stroke="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </mask>
        </defs>
        <line
          x1="2"
          y1="0"
          x2="2"
          y2="100"
          stroke="var(--border)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <g mask={`url(#${maskId})`}>
          <motion.rect
            x="0"
            y="0"
            width="4"
            height={fillHeight}
            fill={`url(#${fillId})`}
          />
          <motion.rect
            x="0"
            y={headY}
            width="4"
            height={HEAD_LENGTH}
            fill={`url(#${headId})`}
            style={{ opacity: headOpacity }}
          />
        </g>
      </svg>
      {events.map((event) => (
        <TimelineItem
          key={event.title}
          event={event}
          reduceMotion={reduceMotion}
        />
      ))}
    </ol>
  );
}
