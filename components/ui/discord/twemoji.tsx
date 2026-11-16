import { cn } from "@/lib/utils";

// Self-hosted copies of the Twemoji SVGs we use (jdecked/twemoji@16.0.1).
// To add one, save
// https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/svg/<code>.svg
// into public/discord/twemoji/.
const TWEMOJI_BASE = "/discord/twemoji";

/** Twemoji's file name for an emoji, e.g. "🧡" → "1f9e1". */
function twemojiCode(emoji: string) {
  // Twemoji drops U+FE0F from file names unless the emoji has a ZWJ.
  const chars = emoji.includes("\u200D") ? emoji : emoji.replace(/\uFE0F/g, "");
  return Array.from(chars, (char) => char.codePointAt(0)?.toString(16)).join(
    "-",
  );
}

export function Twemoji({
  emoji,
  label,
  className,
}: {
  emoji: string;
  /** Accessible name. Defaults to the emoji itself. */
  label?: string;
  className?: string;
}) {
  return (
    // biome-ignore lint/performance/noImgElement: tiny inline emoji
    <img
      src={`${TWEMOJI_BASE}/${twemojiCode(emoji)}.svg`}
      alt={label ?? emoji}
      draggable={false}
      className={cn(
        "inline-block size-[1.2em] align-[-0.25em] select-none",
        className,
      )}
    />
  );
}
