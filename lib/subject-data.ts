import { cacheLife } from "next/cache";
import { getSubjectResources, listDriveResources } from "@/lib/drive";

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

export async function loadResource(subjectId: string, resourceId: string) {
  const data = await loadSubject(subjectId);
  const resource = data?.resources.find((entry) => entry.id === resourceId);
  return data && resource ? { subject: data.subject, resource } : null;
}
