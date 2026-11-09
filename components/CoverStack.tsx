"use client";

import {
  motion,
  type PanInfo,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { type Cover, covers } from "@/data/covers";

const CARD_WIDTH = 0.42;
const CARD_HEIGHT = CARD_WIDTH * (1448 / 1024);
const AUTOPLAY_MS = 4500;
const MAX_TILT = 14;
const SPREAD = 1.1;
const FLING_DISTANCE = 110;
const FLING_VELOCITY = 500;

const SLOTS = [
  { x: 0, y: 0, rotate: 0 },
  { x: -0.27, y: -0.17, rotate: -18 },
  { x: 0.04, y: -0.23, rotate: 12 },
  { x: 0.28, y: -0.08, rotate: 9 },
  { x: 0.25, y: 0.19, rotate: -20 },
  { x: 0.04, y: 0.24, rotate: 10 },
  { x: -0.27, y: 0.19, rotate: -12 },
];

const HOVER_RELEASE_MS = 80;

const floatVariants: Variants = {
  float: (duration: number) => ({
    y: [0, -7, 0],
    transition: {
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }),
  rest: { y: 0, transition: { duration: 0.2 } },
};

const toCardPercent = (offset: number, size: number) =>
  `${(offset / size) * 100 - 50}%`;

const driveUrl = (cover: Cover) =>
  `https://drive.google.com/file/d/${cover.driveId}/view`;

function swapIntoFront(order: number[], slot: number) {
  const next = [...order];
  [next[0], next[slot]] = [next[slot], next[0]];
  return next;
}

const sendFrontToBack = (order: number[]) => [...order.slice(1), order[0]];

function CoverImage({ cover }: { cover: Cover }) {
  return (
    <Image
      src={cover.src}
      alt=""
      fill
      draggable={false}
      sizes="(min-width: 768px) 280px, 45vw"
      loading="eager"
      className="pointer-events-none object-cover"
    />
  );
}

function FeaturedCover({
  cover,
  reduceMotion,
  onFling,
}: {
  cover: Cover;
  reduceMotion: boolean;
  onFling: () => void;
}) {
  const dragged = useRef(false);
  const tiltX = useSpring(0, { stiffness: 200, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 200, damping: 18 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const [hovering, setHovering] = useState(false);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.45), transparent 55%)`;

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    tiltX.set((0.5 - py) * MAX_TILT * 2);
    tiltY.set((px - 0.5) * MAX_TILT * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const reset = () => {
    setHovering(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (
      Math.abs(info.offset.x) > FLING_DISTANCE ||
      Math.abs(info.velocity.x) > FLING_VELOCITY
    ) {
      onFling();
    }
  };

  return (
    <motion.button
      type="button"
      aria-label={`Open ${cover.subject} (${cover.code}) ${cover.title} by ${cover.author}`}
      className="relative size-full cursor-grab touch-pan-y overflow-hidden rounded-md shadow-2xl shadow-black/60 outline-none focus-visible:ring-3 focus-visible:ring-ring active:cursor-grabbing"
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
      drag="x"
      dragSnapToOrigin
      dragElastic={0.7}
      whileDrag={{ scale: 1.06, rotate: 4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={handleDragEnd}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onClick={() => {
        if (dragged.current) {
          dragged.current = false;
          return;
        }
        window.open(driveUrl(cover), "_blank", "noopener,noreferrer");
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          onFling();
        }
      }}
    >
      <CoverImage cover={cover} />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{ background: glare }}
        initial={false}
        animate={{ opacity: hovering && !reduceMotion ? 1 : 0 }}
      />
    </motion.button>
  );
}

export default function CoverStack() {
  const reduceMotion = useReducedMotion() ?? false;
  const [order, setOrder] = useState(() => covers.map((_, index) => index));
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hoverCard = (coverIndex: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(coverIndex);
  };

  const unhoverCard = (coverIndex: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(
      () => setHovered((current) => (current === coverIndex ? null : current)),
      HOVER_RELEASE_MS,
    );
  };

  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion || active) return;
    const interval = setInterval(
      () => setOrder((current) => sendFrontToBack(current)),
      AUTOPLAY_MS,
    );
    return () => clearInterval(interval);
  }, [reduceMotion, active]);

  const spread = active && !reduceMotion ? SPREAD : 1;
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };

  return (
    <section
      aria-label="Featured r/IGCSE resources. Drag or use the arrow keys on the front cover to shuffle, or pick another cover to bring it forward."
      className="mx-auto w-full max-w-[640px] select-none"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        setActive(false);
        setHovered(null);
      }}
      onFocus={() => setActive(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setActive(false);
        }
      }}
    >
      <div className="relative aspect-square w-full">
        {order.map((coverIndex, slot) => {
          const cover = covers[coverIndex];
          const position = SLOTS[slot];
          const isFeatured = slot === 0;
          const isHovered = hovered === coverIndex && !isFeatured;
          const floating = !reduceMotion && !isFeatured && !isHovered;

          return (
            <motion.div
              key={cover.driveId}
              className="absolute top-1/2 left-1/2"
              style={{
                width: `${CARD_WIDTH * 100}%`,
                aspectRatio: "1024 / 1448",
                zIndex: isFeatured ? 20 : isHovered ? 15 : slot,
              }}
              initial={false}
              animate={{
                x: toCardPercent(position.x * spread, CARD_WIDTH),
                y: toCardPercent(position.y * spread, CARD_HEIGHT),
                rotate: isHovered ? 0 : position.rotate * spread,
                scale: isFeatured ? 1 : isHovered ? 0.92 : 0.84,
                opacity: 1,
                filter:
                  isFeatured || isHovered
                    ? "brightness(1)"
                    : active
                      ? "brightness(0.85)"
                      : "brightness(0.7)",
              }}
              transition={transition}
            >
              {isFeatured ? (
                <FeaturedCover
                  cover={cover}
                  reduceMotion={reduceMotion}
                  onFling={() =>
                    setOrder((current) => sendFrontToBack(current))
                  }
                />
              ) : (
                <motion.button
                  type="button"
                  aria-label={`Bring ${cover.subject} (${cover.code}) ${cover.title} to the front`}
                  className="relative size-full overflow-hidden rounded-md shadow-2xl shadow-black/60 outline-none focus-visible:ring-3 focus-visible:ring-ring"
                  variants={floatVariants}
                  custom={3 + slot * 0.35}
                  initial={false}
                  animate={floating ? "float" : "rest"}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  onPointerEnter={() => hoverCard(coverIndex)}
                  onPointerLeave={() => unhoverCard(coverIndex)}
                  onFocus={() => hoverCard(coverIndex)}
                  onBlur={() => unhoverCard(coverIndex)}
                  onClick={() =>
                    setOrder((current) => swapIntoFront(current, slot))
                  }
                >
                  <CoverImage cover={cover} />
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
