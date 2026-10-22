import { NextResponse } from "next/server";
import { DriveApiError, listSubjects } from "@/lib/drive";

export async function GET() {
  try {
    return NextResponse.json({ subjects: await listSubjects() });
  } catch (error) {
    if (error instanceof DriveApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unable to load Google Drive subjects:", error);
    return NextResponse.json(
      { error: "Unable to load subjects from Google Drive." },
      { status: 500 },
    );
  }
}
