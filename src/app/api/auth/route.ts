import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let passcode = "";
    try {
      const body = await req.json();
      passcode = body?.passcode || "";
    } catch {
      const text = await req.text();
      try {
        const parsed = JSON.parse(text);
        passcode = parsed?.passcode || "";
      } catch {
        passcode = text.trim();
      }
    }

    const correctPasscode = process.env.ADMIN_PASSCODE || "sinchana2026";

    if (passcode.trim() === correctPasscode.trim()) {
      return NextResponse.json({ success: true, token: "sinchana-auth-token-valid" });
    }

    return NextResponse.json(
      { success: false, error: "Incorrect passcode. Please try again." },
      { status: 401 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
