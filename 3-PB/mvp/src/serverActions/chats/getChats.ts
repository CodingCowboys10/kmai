"use server";

import {getChatsController} from "@/lib/config/container";

export async function getChats() {
  const res = await getChatsController.handle();
  if (!res.ok) throw new Error((await res.json()).message);
  return (await res.json()).chats;
}
