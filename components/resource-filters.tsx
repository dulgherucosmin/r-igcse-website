"use client";

import { XIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CATEGORIES } from "@/lib/categories";
import type { DriveSubject } from "@/lib/drive";
import { BOARD_FILTERS, TRACK_FILTERS } from "@/lib/search-params";

export type ResourceFilterValues = {
  level: (typeof TRACK_FILTERS)[number][];
  board: (typeof BOARD_FILTERS)[number][];
  category: (typeof CATEGORIES)[number][];
};

type FilterKey = keyof ResourceFilterValues;

const FIELDS: Record<FilterKey, (subject: DriveSubject) => string> = {
  level: (subject) => subject.track,
  board: (subject) => subject.board,
  category: (subject) => subject.category,
};

export function matchesFilters(
  subject: DriveSubject,
  filters: ResourceFilterValues,
  ignore?: FilterKey,
) {
  return (Object.keys(FIELDS) as FilterKey[]).every((key) => {
    const selected: string[] = filters[key];
    return (
      key === ignore ||
      selected.length === 0 ||
      selected.includes(FIELDS[key](subject))
    );
  });
}

const TRACK_LABELS: Record<(typeof TRACK_FILTERS)[number], string> = {
  IGCSE: "IGCSE / O Level",
  Advanced: "AS & A Level",
};

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  getLabel = (option) => option,
  counts,
}: {
  label: string;
  options: readonly T[];
  value: T[];
  onChange: (value: T[]) => void;
  getLabel?: (option: T) => string;
  counts: Record<string, number>;
}) {
  if (options.length < 2) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <ToggleGroup
        multiple
        variant="outline"
        size="sm"
        aria-label={`Filter by ${label.toLowerCase()}`}
        value={value}
        onValueChange={(next) => onChange(next as T[])}
        className="flex-wrap justify-center"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option}
            value={option}
            disabled={!counts[option] && !value.includes(option)}
            className="aria-pressed:border-primary aria-pressed:bg-primary/15 aria-pressed:text-foreground"
          >
            {getLabel(option)}
            <span className="text-xs text-muted-foreground tabular-nums">
              {counts[option] ?? 0}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export function ResourceFilters({
  allSubjects,
  subjects,
  filters,
  onChange,
}: {
  allSubjects: DriveSubject[];
  subjects: DriveSubject[];
  filters: ResourceFilterValues;
  onChange: (filters: Partial<ResourceFilterValues> | null) => void;
}) {
  const tracks = TRACK_FILTERS.filter((track) =>
    allSubjects.some((subject) => subject.track === track),
  );
  const boards = BOARD_FILTERS.filter((board) =>
    allSubjects.some((subject) => subject.board === board),
  );
  const categories = CATEGORIES.filter((category) =>
    allSubjects.some((subject) => subject.category === category),
  );
  const countsFor = (key: FilterKey) => {
    const counts: Record<string, number> = {};
    for (const subject of subjects) {
      if (!matchesFilters(subject, filters, key)) continue;
      const option = FIELDS[key](subject);
      counts[option] = (counts[option] ?? 0) + 1;
    }
    return counts;
  };
  const active =
    filters.level.length + filters.board.length + filters.category.length > 0;

  return (
    <div
      role="toolbar"
      aria-label="Filter subjects"
      className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
    >
      <FilterGroup
        label="Level"
        options={tracks}
        value={filters.level}
        onChange={(level) => onChange({ level })}
        counts={countsFor("level")}
        getLabel={(track) => TRACK_LABELS[track]}
      />
      <FilterGroup
        label="Board"
        options={boards}
        value={filters.board}
        onChange={(board) => onChange({ board })}
        counts={countsFor("board")}
      />
      <FilterGroup
        label="Subject area"
        options={categories}
        value={filters.category}
        onChange={(category) => onChange({ category })}
        counts={countsFor("category")}
      />
      {active && (
        <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
          <XIcon />
          Clear filters
        </Button>
      )}
    </div>
  );
}
