"use server";

import { getDocumentsController } from "@/lib/config/container";

export async function getDocument(model: string) {
  try {
    const res = await getDocumentsController.handle(model);
    return await res.json();
  } catch (e) {
    return [];
  }
}
