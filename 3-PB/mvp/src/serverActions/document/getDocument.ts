"use server";

import { getDocumentsController } from "@/lib/config/container";
import { IModel } from "@/lib/config/interfaces";

export async function getDocument(model: IModel) {
  const res = await getDocumentsController.handle(model);
  if (!res.ok) throw new Error((await res.json()).error);
  return await res.json();
}
