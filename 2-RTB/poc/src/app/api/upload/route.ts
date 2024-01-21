import { NextRequest, NextResponse } from 'next/server'

import {Chroma} from "langchain/vectorstores/chroma"
import {embeddings, collections, AWSParams} from "@/utils/chat_utils"
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import AWS from "aws-sdk";


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

        try {
            // MinIO Upload
            const s3 = new AWS.S3(AWSParams);

            await s3.putObject({
                Body:  buffer,
                Bucket: collections[modelName],
                Key : documentName,
                Tagging: "visibility=visible"
            }).promise()

        }catch (e) {
            console.error("errore in MinIo" , e)
        }

        try {
            const bufferAsBlob = new Blob([buffer]);
            // ChromaDbUpload
            const loader = new PDFLoader(bufferAsBlob, {
                splitPages: true,
                parsedItemSeparator: "",
            });


            let docs = await loader.load();

            docs = docs.map(doc => ({
                ...doc,
                metadata: {
                    page: doc.metadata.loc.pageNumber,
                    date : new Date().toLocaleString(),
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
