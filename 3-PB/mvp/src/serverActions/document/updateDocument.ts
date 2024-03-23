"use server";

import { IModel, Metadatas } from "@/lib/config/interfaces";
import { updateDocumentController } from "@/lib/config/container";

export async function updateDocument(
  docName: string,
  model: IModel,
  updatedMetadas: Metadatas,
) {
  const res = await updateDocumentController.handle(
    docName,
    model,
    updatedMetadas,
  );
  if (!res.ok) throw new Error((await res.json()).error);
}
