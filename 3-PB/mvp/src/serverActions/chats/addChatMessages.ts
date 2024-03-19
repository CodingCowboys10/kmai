"use server";

import { ICustomMessages } from "@/lib/config/interfaces";
import { addChatMessagesController } from "@/lib/config/container";

export async function addChatMessages(messages: ICustomMessages) {
  const res = await addChatMessagesController.handle(messages);
  if (!res.ok) throw new Error((await res.json()).message);
}
