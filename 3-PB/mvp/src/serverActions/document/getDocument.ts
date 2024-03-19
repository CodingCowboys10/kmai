"use server";

import { getDocumentsController } from "@/lib/config/container";

export async function getDocument(model: string) {
  const res = await getDocumentsController.handle(model);
  if (!res.ok) throw new Error((await res.json()).message);
  return await res.json();
}
