import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse } from "ai";
import { Services } from "@/lib/services";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const stream = await Services.chat({
      messages: body.messages ?? [],
    });

    return new StreamingTextResponse(stream);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error During Generation" },
      { status: 500 },
    );
  }
}
