import "server-only";
import { CATEGORIES, type Category } from "./categories";
import { API_KEY, ROOT_FOLDER_ID } from "./config";
import {
  normalizeSubjectName,
  SUBJECT_CATALOG,
  subjectId,
} from "./subject-catalog";

const FOLDER = "application/vnd.google-apps.folder";
const BOARDS = ["CAIE", "Edexcel"] as const;
const LEVELS = ["IGCSE", "AS", "AL", "IAS", "IAL"] as const;

export type Board = (typeof BOARDS)[number];
export type SubjectLevel = (typeof LEVELS)[number];
export type SubjectTrack = "IGCSE" | "Advanced";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  modifiedTime?: string;
}

export interface DriveSubject {
  id: string;
  name: string;
  category: Category;
  board: Board;
  track: SubjectTrack;
  levels: SubjectLevel[];
  codes: string[];
  resourceCount: number;
}

export interface DriveResource {
  id: string;
  fileName: string;
  board: Board;
  level: SubjectLevel;
  code: string;
  subject: string;
  subjectId: string;
  resourceName: string;
  author: string;
  url: string;
  modifiedTime?: string;
}

interface ParsedDriveResource extends Omit<DriveResource, "subjectId" | "url"> {
  subjectId: string;
}

export class DriveApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "DriveApiError";
  }
}

async function list(parent: string): Promise<DriveFile[]> {
  if (!API_KEY) {
    throw new DriveApiError(
      "Google Drive is not configured. Set GOOGLE_DRIVE_API_KEY in your environment and restart the server.",
      503,
    );
  }

  const out: DriveFile[] = [];
  let token: string | undefined;

  do {
    const params = new URLSearchParams({
      q: `'${parent}' in parents and trashed=false`,
      fields: "nextPageToken,files(id,name,mimeType,webViewLink,modifiedTime)",
      orderBy: "folder,name",
      pageSize: "1000",
      key: API_KEY,
    });
    if (token) params.set("pageToken", token);

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new DriveApiError(
        `Google Drive API returned ${response.status}. Check the API key and that the folder is shared with the account used to access it.`,
        502,
      );
    }

    const data: { files?: DriveFile[]; nextPageToken?: string } =
      await response.json();
    out.push(...(data.files ?? []));
    token = data.nextPageToken;
  } while (token);

  return out;
}

function normalizeBoard(value: string): Board | null {
  const board = value.trim().toUpperCase();
  if (board === "CAIE") return "CAIE";
  if (board === "EDX" || board === "EDEXCEL") return "Edexcel";
  return null;
}

function normalizeLevel(board: Board, value: string): SubjectLevel | null {
  const level = value.trim().toUpperCase();
  if (level === "IG" || level === "IGCSE") return "IGCSE";
  if (board === "CAIE" && (level === "AS" || level === "AL")) return level;
  if (board === "Edexcel" && (level === "IAS" || level === "IAL")) {
    return level;
  }
  return null;
}

function trackOf(level: SubjectLevel): SubjectTrack {
  return level === "IGCSE" ? "IGCSE" : "Advanced";
}

function boardSubjectId(
  board: Board,
  name: string,
  track: SubjectTrack,
): string {
  return `${board.toLowerCase()}-${subjectId(name)}-${track.toLowerCase()}`;
}

const SUBJECTS_BY_KEY = new Map(
  SUBJECT_CATALOG.map((subject) => [
    normalizeSubjectName(subject.name),
    subject,
  ]),
);

function parseResource(file: DriveFile): ParsedDriveResource | null {
  if (file.mimeType === FOLDER) return null;

  const parts = file.name.split("|").map((part) => part.trim());
  if (parts.length !== 6) return null;

  const [rawBoard, rawLevel, code, rawSubject, resourceName, author] = parts;
  const board = normalizeBoard(rawBoard);
  const level = board ? normalizeLevel(board, rawLevel) : null;
  if (!board || !level || !code || !resourceName) {
    return null;
  }

  const subject = SUBJECTS_BY_KEY.get(normalizeSubjectName(rawSubject));
  if (!subject) return null;

  return {
    id: file.id,
    fileName: file.name,
    board,
    level,
    code,
    subject: subject.name,
    subjectId: boardSubjectId(board, subject.name, trackOf(level)),
    resourceName,
    author,
    modifiedTime: file.modifiedTime,
  };
}

async function listAllFiles(folderId: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  const folders = [folderId];
  const visited = new Set<string>();

  while (folders.length > 0) {
    const currentFolder = folders.pop();
    if (!currentFolder || visited.has(currentFolder)) continue;
    visited.add(currentFolder);

    for (const file of await list(currentFolder)) {
      if (file.mimeType === FOLDER) {
        folders.push(file.id);
      } else {
        files.push(file);
      }
    }
  }

  return files;
}

export async function listDriveResources(): Promise<DriveResource[]> {
  const files = await listAllFiles(ROOT_FOLDER_ID);
  return files
    .flatMap((file) => {
      const parsed = parseResource(file);
      return parsed
        ? [
            {
              ...parsed,
              url:
                file.webViewLink ??
                `https://drive.google.com/file/d/${file.id}/view`,
            },
          ]
        : [];
    })
    .sort((a, b) => a.resourceName.localeCompare(b.resourceName));
}

function subjectsFromResources(resources: DriveResource[]): DriveSubject[] {
  const subjects = new Map<string, DriveSubject>(
    resources.flatMap((resource) => {
      const catalogEntry = SUBJECTS_BY_KEY.get(
        normalizeSubjectName(resource.subject),
      );
      if (!catalogEntry) return [];
      const track = trackOf(resource.level);
      const id = boardSubjectId(resource.board, catalogEntry.name, track);
      return [
        [
          id,
          {
            id,
            name: catalogEntry.name,
            category: catalogEntry.category,
            board: resource.board,
            track,
            levels: [],
            codes: [],
            resourceCount: 0,
          } satisfies DriveSubject,
        ] as const,
      ];
    }),
  );

  for (const resource of resources) {
    const catalogEntry = SUBJECTS_BY_KEY.get(
      normalizeSubjectName(resource.subject),
    );
    if (!catalogEntry) continue;

    const subject = subjects.get(resource.subjectId);
    if (!subject) continue;
    if (!subject.levels.includes(resource.level)) {
      subject.levels.push(resource.level);
    }
    if (!subject.codes.includes(resource.code)) {
      subject.codes.push(resource.code);
    }
    subject.resourceCount += 1;
    subjects.set(resource.subjectId, subject);
  }

  const levelOrder: Record<SubjectLevel, number> = {
    IGCSE: 0,
    AS: 1,
    IAS: 1,
    AL: 2,
    IAL: 2,
  };
  for (const subject of subjects.values()) {
    subject.levels.sort((a, b) => levelOrder[a] - levelOrder[b]);
    subject.codes.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    );
  }

  return [...subjects.values()].sort((a, b) => {
    const categoryOrder =
      CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category);
    return categoryOrder || a.name.localeCompare(b.name);
  });
}

export async function listSubjects(): Promise<DriveSubject[]> {
  return subjectsFromResources(await listDriveResources());
}

export async function getSubjectResources(
  id: string,
): Promise<{ subject: DriveSubject; resources: DriveResource[] } | null> {
  const resources = (await listDriveResources()).filter(
    (resource) => resource.subjectId === id,
  );
  if (resources.length === 0) return null;

  const subject = subjectsFromResources(resources).find(
    (item) => item.id === id,
  );
  return subject ? { subject, resources } : null;
}

/** Temporarily gathers every item name, including folder names, for debugging. */
export async function listAllFileNames(folderId: string): Promise<string[]> {
  const names: string[] = [];
  const folders = [folderId];
  const visited = new Set<string>();

  while (folders.length > 0) {
    const currentFolder = folders.pop();
    if (!currentFolder || visited.has(currentFolder)) continue;
    visited.add(currentFolder);

    for (const file of await list(currentFolder)) {
      names.push(file.name);
      if (file.mimeType === FOLDER) folders.push(file.id);
    }
  }

  return names.sort((a, b) => a.localeCompare(b));
}
