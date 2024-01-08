import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

import {Chroma} from "langchain/vectorstores/chroma"
import {embeddings , collections} from "@/utils/chat_utils"
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'


export async function POST(request: NextRequest) {                                          //chiamato per inserire nuovi documenti nel databse
  
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const model_name = data.get('model')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // È stato inserito in buffer il file in bytes
  // Ora è possibile scrivere il file nel path che vogliamo noi, ovvero dove abbiamo tutti i documenti

  const document = `${file.name}`                                                             //nome del documento che avrò in database
  const path = `./src/db/docs/${file.name}`                                                   //path completo del documento che avrò in database
  await writeFile(path, buffer)
  //console.log(`open ${path} to see the uploaded file`)                                      //decommentare per verificare il funzionamento del writeFile

  //operazioni per embeddizzare il file ------------------------------
  const loader = new PDFLoader(path, {
    splitPages: true,
    parsedItemSeparator: "",
  });
  let docs = await loader.load();
  docs = docs.map(doc => ({
    ...doc,
    metadata: {
        page: doc.metadata.loc.pageNumber,
        source: doc.metadata.source,
    }
  }))
  const ids = docs.map((doc => document + "_" + doc.metadata.page))
  console.log(ids)
  try {
    const vectorStore = new Chroma(embeddings[model_name], {
        collectionName: collections[model_name],
        collectionMetadata: {
            "hnsw:space": "cosine",
        }
    });

    await vectorStore.addDocuments(docs, {
            ids: ids,
        }
    )

  } catch (e) {
    console.log(e)
  }
  let sql;
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database("./src/db/databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {
      if (err) return console.error(err.message);
  });
  sql = `INSERT INTO ${model_name}(name,path) VALUES (?,?)`;                                      //query per inserire il nuovo documento
  db.run(
    sql,
    [document,path],
    (err) => {
        if (err) return console.error(err.message);
  });
  return NextResponse.json({ success: true })
}
