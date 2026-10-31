import { NextResponse } from "next/server";
import { findPapers, incrementPaperDownload } from "@/lib/papersStore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exam = searchParams.get("exam") || undefined;
  const subject = searchParams.get("subject") || undefined;
  const yearStr = searchParams.get("year");
  const year = yearStr ? parseInt(yearStr, 10) : undefined;
  const medium = searchParams.get("medium") || undefined;
  const paperType = searchParams.get("type") || "past-paper";
  const directParam = searchParams.get("url");

  // If a direct URL was passed explicitly
  if (directParam) {
    return NextResponse.redirect(directParam);
  }

  // Look up matching paper from store
  const matches = findPapers({ exam, subject, year, medium, paperType });

  if (matches.length > 0 && matches[0].directUrl) {
    const paper = matches[0];
    incrementPaperDownload(paper.id);
    return NextResponse.redirect(paper.directUrl);
  }

  // If not found in store, check if any medium matches
  const fallbackMatches = findPapers({ exam, subject, year });
  if (fallbackMatches.length > 0 && fallbackMatches[0].directUrl) {
    const paper = fallbackMatches[0];
    incrementPaperDownload(paper.id);
    return NextResponse.redirect(paper.directUrl);
  }

  // Default fallback if no custom link is in the system yet
  return NextResponse.json(
    {
      success: false,
      message: `Paper for ${subject} ${year} (${medium}) has not been uploaded yet. Please request it via the form or upload it via /admin.`,
    },
    { status: 404 }
  );
}
