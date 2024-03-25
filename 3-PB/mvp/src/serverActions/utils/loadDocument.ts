"use server";

import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import uniqid from "uniqid";
import * as fs from "fs";

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

export async function loadMp3Document(
  buffer: string | NodeJS.ArrayBufferView | Buffer,
  docsName: string,
) {
  let mp3file = `/tmp/${uniqid()}.mp3`;
  fs.writeFileSync(mp3file, buffer, "binary");
  const loader = new OpenAIWhisperAudio(mp3file);

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
