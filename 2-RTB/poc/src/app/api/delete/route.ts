import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { ChromaClient } from 'chromadb'
import { collections } from "@/utils/chat_utils"
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const model = body.name;

    const directoryPath = `./src/db/docs/${model}`;
    const files = await fsPromises.readdir(directoryPath);

    for (const file of files) {
        const filePath = join(directoryPath, file);
        await fsPromises.unlink(filePath);
    }

    try {
        const client = new ChromaClient()
        const collection = await client.getCollection({name : collections[model]})
        const responseId = (await collection.get()).ids
        await collection.delete({ids : responseId})
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  
    return NextResponse.json({ success: true, message: 'Documento Eliminato' }, { status: 200 })
  }