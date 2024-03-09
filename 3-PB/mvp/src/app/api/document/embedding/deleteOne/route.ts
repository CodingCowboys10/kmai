import { NextRequest, NextResponse } from "next/server";
import { ChromaClient } from "chromadb";
import { collections } from "@/lib/site-config";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  try {
    const { ids, model } = await request.json();

    const client = new ChromaClient();
    const collection = await client.getCollection({ name: collections[model] });

    await collection.delete({ ids: ids });

    return NextResponse.json("ok", { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
