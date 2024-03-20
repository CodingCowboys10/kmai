"use server";

// @ts-ignore
import { getDocumentContentController } from "@/lib/config/container";
import { IModel } from "@/lib/config/interfaces";

export async function getDocumentContent(docName: string, model: IModel) {
  const res = await getDocumentContentController.handle(docName, model);
  if (!res.ok) throw new Error((await res.json()).error);
  return (await res.json()).url;
}
