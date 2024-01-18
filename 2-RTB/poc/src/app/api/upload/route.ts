import { NextRequest, NextResponse } from 'next/server'

import {Chroma} from "langchain/vectorstores/chroma"
import {embeddings , collections} from "@/utils/chat_utils"
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import * as fs from "fs/promises";
import * as path from 'path';



export async function POST(request: NextRequest) {



        // Salvo il file
        const data = await request.formData()
        const modelName = data.get('model')!.toString()
        const file: File | null = data.get('file') as unknown as File
        if (!file) {
             return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const documentName = `${file.name}`

        const folderPath : string = `./src/db/docs/${modelName}`;
        let fileSizeInBytes : number
        try {
            await fs.access(folderPath);
        } catch (error) {
            try {
                await fs.mkdir(folderPath, { recursive: true });
            }catch (mkdirError) {
                console.error('Errore durante la creazione della cartella:', mkdirError);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
            }
        }
        const filePath = path.join(folderPath, documentName);
        await fs.writeFile(filePath, buffer).then(() => {
            return fs.stat(filePath);
        }).then((stats) => {
            fileSizeInBytes = stats.size;
        })

        try {
            // ChromaDbUpload
            const loader = new PDFLoader(filePath, {
                splitPages: true,
                parsedItemSeparator: "",
            });

            let docs = await loader.load();
            docs = docs.map(doc => ({
                ...doc,
                metadata: {
                    page: doc.metadata.loc.pageNumber,
                    source: filePath,
                    visibility: "visible",
                    date : new Date().toLocaleString(),
                    size : fileSizeInBytes,
                    name : documentName,
                }
            }))
            const ids = docs.map((doc => documentName + "_" + doc.metadata.page))
            const vectorStore = new Chroma(embeddings[modelName], {
                collectionName: collections[modelName],
                collectionMetadata: {
                    "hnsw:space": "cosine",
                }
            });

            await vectorStore.addDocuments(docs, {
                    ids: ids,
                }
            )
            return NextResponse.json({ message: 'Documento Aggiunto' }, { status: 200 })
        }catch (e) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
}
