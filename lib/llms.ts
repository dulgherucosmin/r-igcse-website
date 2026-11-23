import { subjectTitle } from "@/components/SubjectResources";
import { sitePages } from "@/lib/site-pages";
import { loadSubjects } from "@/lib/subject-data";

export async function llmsPages() {
  const subjects = await loadSubjects();
  return [
    ...sitePages.map((page) => ({
      path: page.path || "/",
      title: page.title,
      description: page.description,
    })),
    ...subjects.map((subject) => ({
      path: `/resources/${subject.id}`,
      title: `${subjectTitle(subject)} (${subject.board})`,
      description: `${subject.codes.join(" / ")}, ${subject.resourceCount} ${subject.resourceCount === 1 ? "resource" : "resources"}.`,
    })),
  ];
}
