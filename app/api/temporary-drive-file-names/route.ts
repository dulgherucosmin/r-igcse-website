import { NextResponse } from "next/server";
import { ROOT_FOLDER_ID } from "@/lib/config";
import { DriveApiError, listAllFileNames } from "@/lib/drive";

export async function GET() {
  try {
    const names = await listAllFileNames(ROOT_FOLDER_ID);
    console.log("Temporary Google Drive file names:", names);
    return NextResponse.json({ names });
  } catch (error) {
    if (error instanceof DriveApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unable to list Google Drive file names:", error);
    return NextResponse.json(
      { error: "Unable to list file names from Google Drive." },
      { status: 500 },
    );
  }
}
