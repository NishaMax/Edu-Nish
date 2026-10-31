import { NextResponse } from "next/server";
import { verifyAdminPassword, setAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Invalid admin password" },
        { status: 401 }
      );
    }

    await setAdminSession();
    return NextResponse.json({ success: true, message: "Authenticated successfully" });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
