import { NextRequest, NextResponse } from "next/server";
import { ChromaClient } from "chromadb";
import { collections } from "@/lib/site-config";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  try {
    const { docName, model } = await request.json();

    const client = new ChromaClient();
    const collection = await client.getCollection({ name: collections[model] });

    console.log(docName);
    const response = await collection.get({
      where: { name: { $eq: docName } },
      include: [],
    });

    return NextResponse.json({ ids: response.ids }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
