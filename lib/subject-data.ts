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

export async function subjectParams() {
  "use cache";
  cacheLife("hours");
  const subjects = await listSubjects().catch(() => []);
  return subjects.map((subject) => ({ subject: subject.id }));
}
