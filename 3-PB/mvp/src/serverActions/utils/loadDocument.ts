"use server";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function loadDocument(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const docsName = `${file.name}`;
  const fileAsBlob = new Blob([buffer]);

  if (!file) {
    throw Error;
  }

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
    },
  }));
  return { docs, docsName };
}
