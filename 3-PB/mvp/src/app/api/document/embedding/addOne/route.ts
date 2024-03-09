import { NextRequest, NextResponse } from "next/server";
import { ChromaClient } from "chromadb";
import { collections } from "@/lib/site-config";
import { Embeddings } from "@/lib/config/interfaces";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  try {
    const { embeddings, model }: { embeddings: Embeddings; model: string } =
      await request.json();

    const client = new ChromaClient();
    const collection = await client.getCollection({
      name: collections[model],
    });

    await collection.add({
      ids: embeddings.ids,
      documents: embeddings.doc,
      metadatas: embeddings.metadata,
      embeddings: embeddings.embedding,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
