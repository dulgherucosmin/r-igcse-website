"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  useHotkey("D", toggleTheme, { meta: { name: "Toggle theme" } });

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-keyshortcuts="d"
      title="Toggle theme (D)"
    >
      <SunIcon
        weight="fill"
        aria-hidden="true"
        className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        weight="fill"
        aria-hidden="true"
        className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </Button>
  );
}
