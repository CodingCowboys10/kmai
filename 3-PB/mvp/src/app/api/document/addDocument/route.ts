import { NextRequest, NextResponse } from "next/server";

import { addDocumentController } from "@/lib/config/container";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const res = await (await addDocumentController.handle(data)).json();

    return NextResponse.json({ message: res.message }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "non va" }, { status: 500 });
  }
}
