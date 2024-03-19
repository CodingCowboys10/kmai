"use server";

import { addChatController } from "@/lib/config/container";

export async function addChat(title: string) {
  const res = await addChatController.handle(title);
  if (!res.ok) throw new Error((await res.json()).error);
  return (await res.json()).id;
}
