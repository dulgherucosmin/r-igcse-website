"use client";

import type { MouseEvent } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PageSection {
  id: string;
  label: string;
}

const HIGHLIGHT = "color-mix(in oklab, var(--primary) 14%, transparent)";
const HIGHLIGHT_SPREAD = "0 0 0 0.75rem";

function jumpTo(target: HTMLElement) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });

  // A short section near the end of the page (or of the subject dialog) can't
  // scroll any further, so flash it: the click always has a visible result.
  for (const animation of target.getAnimations()) {
    if (animation.id === "section-highlight") animation.cancel();
  }
  target.animate(
    [
      {
        backgroundColor: HIGHLIGHT,
        boxShadow: `${HIGHLIGHT_SPREAD} ${HIGHLIGHT}`,
      },
      {
        backgroundColor: "transparent",
        boxShadow: `${HIGHLIGHT_SPREAD} transparent`,
      },
    ],
    { id: "section-highlight", duration: 1400, easing: "ease-out" },
  );
}

export function SectionNav({ sections }: { sections: PageSection[] }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;

    // Following the hash would push a history entry per click, and the subject
    // dialog closes with router.back(), which would then only undo the hash.
    event.preventDefault();
    jumpTo(target);
  }

  return (
    <nav
      aria-label="Subject page sections"
      className="mt-5 flex flex-wrap gap-2"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(event) => handleClick(event, section.id)}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-9 px-4",
          )}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
