import { cacheLife } from "next/cache";
import {
  getSubjectResources,
  listDriveResources,
  listSubjects,
} from "@/lib/drive";

export async function loadSubject(id: string) {
  "use cache";
  cacheLife("hours");
  return getSubjectResources(id);
}

export async function loadAllResources() {
  "use cache";
  cacheLife("hours");
  return listDriveResources();
}

export async function loadSubjects() {
  "use cache";
  cacheLife("hours");
  return listSubjects().catch(() => []);
}

export async function subjectParams() {
  const subjects = await loadSubjects();
  return subjects.map((subject) => ({ subject: subject.id }));
}
