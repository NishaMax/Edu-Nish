import { NextRequest, NextResponse } from "next/server";
import { getAllRequests, addRequest, updateRequestStatus } from "@/lib/requestsStore";

export async function GET() {
  try {
    const requests = await getAllRequests();
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error("Failed to fetch requests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, year, medium, message } = body;

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Subject is required" },
        { status: 400 }
      );
    }

    const created = await addRequest({
      subject,
      year: year ? parseInt(year, 10) : undefined,
      medium,
      message,
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to save request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save request" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "id and status are required" },
        { status: 400 }
      );
    }

    const ok = await updateRequestStatus(id, status);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error("Failed to update request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update request" },
      { status: 500 }
    );
  }
}
