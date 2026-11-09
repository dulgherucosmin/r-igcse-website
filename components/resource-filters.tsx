"use client";

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

const ROW_CLASS =
  "h-9 w-full justify-between rounded-md border-0 bg-transparent px-2 text-xs font-medium tracking-wider text-muted-foreground uppercase hover:bg-muted/60 hover:text-foreground disabled:opacity-35 aria-pressed:bg-transparent aria-pressed:text-foreground [&[aria-pressed=true]>span:last-child]:text-brand";

function FilterRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      aria-pressed={active}
      onClick={onClick}
      className={ROW_CLASS}
    >
      <span>{label}</span>
      <span className="tabular-nums">{count}</span>
    </Button>
  );
}

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
    <div>
      <p className="mb-1 px-2 text-[11px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
        {label}
      </p>
      <ToggleGroup
        multiple
        orientation="vertical"
        aria-label={`Filter by ${label.toLowerCase()}`}
        value={value}
        onValueChange={(next) => onChange(next as T[])}
        className="w-full gap-0.5"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option}
            value={option}
            disabled={!counts[option] && !value.includes(option)}
            className={ROW_CLASS}
          >
            <span className="truncate">{getLabel(option)}</span>
            <span className="tabular-nums">{counts[option] ?? 0}</span>
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
    <nav aria-label="Filter subjects" className="space-y-6">
      <FilterRow
        label="All subjects"
        count={subjects.length}
        active={!active}
        onClick={() => onChange(null)}
      />
      <FilterGroup
        label="Level"
        options={tracks}
        value={filters.level}
        onChange={(level) => onChange({ level })}
        getLabel={(track) => TRACK_LABELS[track]}
        counts={countsFor("level")}
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
    </nav>
  );
}
