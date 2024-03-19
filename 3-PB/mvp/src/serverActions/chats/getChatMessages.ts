"use server";

import {getChatMessagesController} from "@/lib/config/container";

export async function getChatMessages(id: number | null) {
  const res = await getChatMessagesController.handle(id!);
  if (!res.ok) throw new Error((await res.json()).message);
  const body = await res.json();
  const allMessages = body.allMessages;
  const source = body.source
  return { allMessages, source };
}
