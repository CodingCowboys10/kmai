import { NextRequest, NextResponse } from "next/server";
import { ChromaClient } from "chromadb";
import { collections } from "@/lib/site-config";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  try {
    const { ids, metadatas, model } = await request.json();

    const client = new ChromaClient();
    const collection = await client.getCollection({ name: collections[model] });

    await collection.update({ ids, metadatas });

    return NextResponse.json("ok", { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
