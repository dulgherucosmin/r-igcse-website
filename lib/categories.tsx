import type { Icon } from "@phosphor-icons/react";
import {
  BankIcon,
  ChartBarIcon,
  ChatCircleIcon,
  CodeIcon,
  FlaskIcon,
  FolderIcon,
  MathOperationsIcon,
  MusicNotesIcon,
} from "@phosphor-icons/react/ssr";
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

const categoryOf = (name: string): Category =>
  SUBJECT_CATEGORIES.get(normalizeSubjectName(name)) ?? "Other";

type SubjectColor =
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

const ICONS: Record<Category, Icon> = {
  Sciences: FlaskIcon,
  Mathematics: MathOperationsIcon,
  Languages: ChatCircleIcon,
  Humanities: BankIcon,
  Business: ChartBarIcon,
  Technology: CodeIcon,
  Arts: MusicNotesIcon,
  Other: FolderIcon,
};

export function CategoryIcon({
  category,
  size = 22,
}: {
  category: Category;
  size?: number;
}) {
  const CategoryGlyph = ICONS[category];
  return <CategoryGlyph size={size} aria-hidden="true" />;
}
