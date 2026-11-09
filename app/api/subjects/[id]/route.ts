import { NextResponse } from "next/server";
import { DriveApiError, getSubjectResources } from "@/lib/drive";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await getSubjectResources(id);
    if (!result) {
      return NextResponse.json(
        { error: "That subject has no matching resources in the repository." },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof DriveApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unable to load Google Drive subject resources:", error);
    return NextResponse.json(
      { error: "Unable to load this subject's resources from Google Drive." },
      { status: 500 },
    );
  }
}
