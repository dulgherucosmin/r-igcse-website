import type { ReactNode } from "react";
import { normalizeSubjectName, SUBJECT_CATALOG } from "./subject-catalog";

export type Category =
  | "Sciences"
  | "Mathematics"
  | "Languages"
  | "Humanities"
  | "Business"
  | "Technology"
  | "Arts"
  | "Other";

export const CATEGORIES: Category[] = [
  "Sciences",
  "Mathematics",
  "Languages",
  "Humanities",
  "Business",
  "Technology",
  "Arts",
  "Other",
];

const SUBJECT_CATEGORIES = new Map(
  SUBJECT_CATALOG.map(({ name, category }) => [
    normalizeSubjectName(name),
    category,
  ]),
);

export const categoryOf = (name: string): Category =>
  SUBJECT_CATEGORIES.get(normalizeSubjectName(name)) ?? "Other";

export type SubjectColor =
  | "biology"
  | "mathematics"
  | "physics"
  | "chemistry"
  | "computing"
  | "languages"
  | "humanities"
  | "business"
  | "technology"
  | "arts"
  | "other"
  | "sciences";

const SUBJECT_COLORS: [RegExp, SubjectColor][] = [
  [/biolog/i, "biology"],
  [/math/i, "mathematics"],
  [/physics/i, "physics"],
  [/chemistry/i, "chemistry"],
  [/computer|ict|information/i, "computing"],
];

const CATEGORY_COLORS: Record<Category, SubjectColor> = {
  Sciences: "sciences",
  Mathematics: "mathematics",
  Languages: "languages",
  Humanities: "humanities",
  Business: "business",
  Technology: "technology",
  Arts: "arts",
  Other: "other",
};

export const subjectColorOf = (name: string): SubjectColor =>
  SUBJECT_COLORS.find(([pattern]) => pattern.test(name))?.[1] ??
  CATEGORY_COLORS[categoryOf(name)];

export const SUBJECT_COLOR_CLASSES: Record<SubjectColor, string> = {
  biology: "bg-[#36a853] text-white",
  mathematics: "bg-[#ff4747] text-[#29252b]",
  physics: "bg-[#8966d6] text-white",
  chemistry: "bg-[#ed922f] text-white",
  computing: "bg-[#a9d2f3] text-[#29252b]",
  sciences: "bg-[#5aafff] text-white",
  languages: "bg-[#fff564] text-[#29252b]",
  humanities: "bg-[#88ff84] text-[#29252b]",
  business: "bg-[#ff688e] text-[#29252b]",
  technology: "bg-[#9365e2] text-white",
  arts: "bg-[#e5b5e8] text-[#29252b]",
  other: "bg-[#d1d1d6] text-[#29252b]",
};

const PATHS: Record<Category, ReactNode> = {
  Sciences: (
    <>
      <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  Mathematics: (
    <>
      <path d="M6 4v6M3 7h6" />
      <path d="M15 7h6" />
      <path d="M3 17h6" />
      <path d="M15 14l6 6M21 14l-6 6" />
    </>
  ),
  Languages: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  Humanities: (
    <path d="M3 21h18M5 21V10M10 21V10M14 21V10M19 21V10M3 10l9-6 9 6" />
  ),
  Business: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  Technology: <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
  Arts: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  Other: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
};

export function CategoryIcon({
  category,
  size = 22,
}: {
  category: Category;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[category]}
    </svg>
  );
}
