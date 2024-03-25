"use server";

import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Buffer } from "buffer";
export async function loadPDFDocument(fileAsBlob: Blob, docsName: string) {
  const loader = new PDFLoader(fileAsBlob, {
    splitPages: true,
    parsedItemSeparator: "",
  });

  let docs = await loader.load();
  docs = docs.map((doc: any) => ({
    ...doc,
    metadata: {
      page: doc.metadata.loc.pageNumber,
      date: new Date().toLocaleString(),
      name: docsName,
      visibility: true,
    },
  }));
  return docs;
}

export async function loadDocxDocument(fileAsBlob: Blob, docsName: string) {
  const loader = new DocxLoader(fileAsBlob);

  let docs = await loader.load();

  docs = docs.map((doc: any) => ({
    ...doc,
    metadata: {
      page: 1,
      date: new Date().toLocaleString(),
      name: docsName,
      visibility: true,
    },
  }));
  return docs;
}

export async function loadMp3Document(file: File, docsName: string) {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], { type: file.type });

  const loader = new OpenAIWhisperAudio(blob);

  let docs = await loader.load();

  console.log(docs);
  docs = docs.map((doc: any) => ({
    ...doc,
    metadata: {
      page: 1,
      date: new Date().toLocaleString(),
      name: docsName,
      visibility: true,
    },
  }));

  return docs;
}
