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
  biology: "bg-[#5BC95B] text-white",
  mathematics: "bg-[#F94144] text-white",
  physics: "bg-[#3377E8] text-white",
  chemistry: "bg-[#F8961E] text-white",
  computing: "bg-[#277DA1] text-[#29252b]",
  sciences: "bg-[#5aafff] text-white",
  languages: "bg-[#90BE6D] text-[#29252b]",
  humanities: "bg-[#F9844A] text-[#29252b]",
  business: "bg-[#F9C74F] text-[#29252b]",
  technology: "bg-[#6CB7D9] text-white",
  arts: "bg-[#C95B9D] text-[#29252b]",
  other: "bg-[#] text-[#29252b]",
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
