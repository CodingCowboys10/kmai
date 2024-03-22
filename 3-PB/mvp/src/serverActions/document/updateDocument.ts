"use server";

import { IModel } from "@/lib/config/interfaces";
import { updateDocumentController } from "@/lib/config/container";

export async function updateDocument(
    docName: string,
    model: IModel,
    visibility: boolean,
  ) {
    const res = await updateDocumentController.handle(docName, model, visibility);
    if (!res.ok) throw new Error((await res.json()).error);
  }