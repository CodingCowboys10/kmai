import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { ChromaClient } from 'chromadb'
import { collections } from "@/utils/chat_utils"
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {                                      //chiamato per eliminare un documento specifico
    const body = await request.json();
    const model = body.name;         //da utilizzare se vogliamo eliminare un doc specifico

    const directoryPath = `./src/db/docs/${model}`;
    const files = await fsPromises.readdir(directoryPath);
    // Elimina ogni file uno per uno
    for (const file of files) {
        const filePath = join(directoryPath, file); // Costruisci il percorso completo del file
        await fsPromises.unlink(filePath);          // Elimina il file
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
  
    return NextResponse.json({ success: true, message: 'Documento Eliminato' }, { status: 200 })                                    //chiamata eseguita correttamente
  }