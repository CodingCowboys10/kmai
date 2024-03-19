"use server";

// @ts-ignore
import { deleteDocumentController } from "@/lib/config/container";

export async function deleteDocument({
  name,
  model,
}: {
  name: string;
  model: string;
}) {
  const res = await deleteDocumentController.handle(name, model);
  if (!res.ok) throw new Error((await res.json()).error);
}
