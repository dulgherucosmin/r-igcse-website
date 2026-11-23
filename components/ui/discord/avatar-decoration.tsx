"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const frame = "pointer-events-none absolute top-0 left-1 size-12 max-w-none";

/**
 * Discord's avatar decoration: a frame 1.2x the avatar, centred over it.
 * Like Discord, it sits still until the message (avatar, name or text) is
 * hovered, then plays from its first frame on every hover.
 *
 * `name` is the file name (no extension) of a pair saved under
 * `public/discord/avatar-decorations/`: `<name>.png`, the still frame, and
 * `<name>-animated.png`, the APNG. The APNG is fetched once, on first hover.
 * Browsers keep one shared timeline per image URL, so each hover gets a
 * fresh object URL to restart the animation. Stays still under reduced
 * motion.
 */
export function AvatarDecoration({ name }: { name: string }) {
  const base = `/discord/avatar-decorations/${name}`;
  const anchor = useRef<HTMLImageElement>(null);
  const [animated, setAnimated] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const message = anchor.current?.closest(
      '[data-slot="discord-message-content"]',
    );
    if (!message) return;

    let blob: Promise<Blob> | null = null;
    let url: string | null = null;
    let hovered = false;

    const stop = () => {
      hovered = false;
      if (url) URL.revokeObjectURL(url);
      url = null;
      setAnimated(null);
      setPlaying(false);
    };

    const start = async () => {
      if (
        hovered ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      hovered = true;
      blob ??= fetch(`${base}-animated.png`).then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.blob();
      });
      try {
        const data = await blob;
        if (!hovered || url) return;
        url = URL.createObjectURL(data);
        setAnimated(url);
      } catch {
        // Keep the still frame; retry the download on the next hover.
        blob = null;
      }
    };

    message.addEventListener("pointerenter", start);
    message.addEventListener("pointerleave", stop);
    return () => {
      message.removeEventListener("pointerenter", start);
      message.removeEventListener("pointerleave", stop);
      stop();
    };
  }, [base]);

  return (
    <>
      {/* biome-ignore lint/performance/noImgElement: small decorative frame */}
      <img
        ref={anchor}
        src={`${base}.png`}
        alt=""
        className={cn(frame, playing && "invisible")}
      />
      {animated && (
        // biome-ignore lint/performance/noImgElement: animated PNG blob
        <img
          src={animated}
          alt=""
          onLoad={() => setPlaying(true)}
          className={frame}
        />
      )}
    </>
  );
}
