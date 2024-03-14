import { NextRequest, NextResponse } from "next/server";

import {
  addDocumentController,
  getDocumentContentController,
  getDocumentsController,
} from "@/lib/config/container";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await getDocumentsController.handle(body.model);
    const resData = await res.json();

    return NextResponse.json(resData, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "non va" }, { status: 500 });
  }
}
