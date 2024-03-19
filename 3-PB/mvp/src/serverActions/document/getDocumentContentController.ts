"use server";

// @ts-ignore
import { getDocumentContentController } from "@/lib/config/container";

export async function getDocumentContent(docName: string, model: string) {
  const res = await getDocumentContentController.handle(docName, model);
  if (!res.ok) throw new Error((await res.json()).error);
  return (await res.json()).url;
}
