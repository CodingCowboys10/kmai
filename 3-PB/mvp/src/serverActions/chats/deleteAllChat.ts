"use server";
import { deleteAllChatController } from "@/lib/config/container";

export async function deleteAllChat() {
  const res = await deleteAllChatController.handle();
  if (!res.ok) throw new Error((await res.json()).error);
}
