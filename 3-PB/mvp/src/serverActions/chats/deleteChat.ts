"use server";
import { deleteChatController } from "@/lib/config/container";

export async function deleteChat(id: number) {
  const res = await deleteChatController.handle(id);
  if (!res.ok) throw new Error((await res.json()).error);
}
