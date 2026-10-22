import type { Category } from "@/lib/categories";

export const SUBJECT_CATALOG: { name: string; category: Category }[] = [
  { name: "Travel and Tourism", category: "Humanities" },
  { name: "Business Studies", category: "Business" },
  { name: "Chinese", category: "Languages" },
  { name: "Computer Science", category: "Technology" },
  { name: "Psychology", category: "Humanities" },
  { name: "Economics", category: "Business" },
  { name: "English as a Second Language", category: "Languages" },
  { name: "Design and Technology", category: "Technology" },
  { name: "Additional Mathematics", category: "Mathematics" },
  { name: "Geography", category: "Humanities" },
  { name: "Further Pure Mathematics", category: "Mathematics" },
  { name: "English Literature", category: "Humanities" },
  { name: "History", category: "Humanities" },
  { name: "Hindi", category: "Languages" },
  { name: "Global Perspectives", category: "Humanities" },
  { name: "Music", category: "Arts" },
  { name: "Pakistan Studies", category: "Humanities" },
  { name: "Law", category: "Humanities" },
  { name: "Arabic", category: "Languages" },
  { name: "French", category: "Languages" },
  { name: "Urdu as a Second Language", category: "Languages" },
  { name: "Accounting", category: "Business" },
  { name: "Spanish", category: "Languages" },
  { name: "Malay", category: "Languages" },
  { name: "Chemistry", category: "Sciences" },
  { name: "Mathematics", category: "Mathematics" },
  { name: "English Language", category: "Languages" },
  { name: "Further Mathematics", category: "Mathematics" },
  { name: "Media Studies", category: "Arts" },
  { name: "Biology", category: "Sciences" },
  { name: "Physics", category: "Sciences" },
];

export function normalizeSubjectName(name: string): string {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (key === "math" || key === "maths") return "mathematics";
  if (key === "esl") return "englishasasecondlanguage";
  return key;
}

export function subjectId(name: string): string {
  return normalizeSubjectName(name);
}
