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
