import { NextRequest, NextResponse } from "next/server";
import { ChromaClient } from "chromadb";
import { collections } from "@/lib/site-config";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const documentName = `${file.name}`;
    const fileAsBlob = new Blob([buffer]);

    if (!file) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }

    const loader = new PDFLoader(fileAsBlob, {
      splitPages: true,
      parsedItemSeparator: "",
    });

    let docs = await loader.load();

    return NextResponse.json(
      { docs: docs, documentName: documentName },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
