"use server";

// @ts-ignore
import { deleteDocumentController } from "@/lib/config/container";
import { IModel } from "@/lib/config/interfaces";

export async function deleteDocument({
  name,
  model,
}: {
  name: string;
  model: IModel;
}) {
  const res = await deleteDocumentController.handle(name, model);
  if (!res.ok) throw new Error((await res.json()).error);
}
