"use server";

// @ts-ignore
import { addDocumentController } from "@/lib/config/container";

export async function addDocument(data: FormData) {
  const res = await addDocumentController.handle(data);
  if (!res.ok) throw new Error((await res.json()).error);
}
