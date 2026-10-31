import { NextResponse } from "next/server";
import { getAllPapers, findPapers, savePaper, deletePaper } from "@/lib/papersStore";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exam = searchParams.get("exam") || undefined;
  const subject = searchParams.get("subject") || undefined;
  const yearStr = searchParams.get("year");
  const year = yearStr ? parseInt(yearStr, 10) : undefined;
  const medium = searchParams.get("medium") || undefined;
  const paperType = searchParams.get("type") || undefined;

  const papers = findPapers({ exam, subject, year, medium, paperType });
  return NextResponse.json({ success: true, count: papers.length, papers });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exam, subject, year, medium, paperType, driveUrl } = body;

    if (!exam || !subject || !year || !medium || !driveUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const saved = savePaper({
      exam,
      subject,
      year: parseInt(year, 10),
      medium,
      paperType: paperType || "past-paper",
      driveUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Paper saved successfully",
      paper: saved,
    });
  } catch (error) {
    console.error("Error saving paper:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save paper" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });
    }

    const deleted = deletePaper(id);
    return NextResponse.json({ success: deleted });
  } catch {
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}
