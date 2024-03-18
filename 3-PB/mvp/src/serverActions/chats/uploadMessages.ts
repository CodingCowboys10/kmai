"use server";

import pool from "@/serverActions/utils/postgres";
import { Message } from "ai";

interface IMessages {
  messageAI: Message;
  messageUser: Message;
  sessionId: number | null;
  source: Record<string, any>;
}
export async function uploadMessages(messages: IMessages) {
  const messageAI = messages.messageAI;
  const messageUser = messages.messageUser;
  const sessionId = messages.sessionId;
  const sourcePage = messages.source[0]?.metadata.page;
  const sourceDoc = messages.source[0]?.metadata.name;

  const queryMessage = `
      INSERT INTO messages (thread_id, content, role, created_at , sourcePage , sourceLink)
      VALUES 
      ($1, $2, $3, $4 ,$5, $6),
      ($7, $8 ,$9 ,$10 , $11 , $12)`;

  const values = [
    sessionId,
    messageUser.content,
    messageUser.role,
    messageUser.createdAt,
    null,
    null,
    sessionId,
    messageAI.content,
    messageAI.role,
    messageAI.createdAt,
    sourcePage,
    sourceDoc,
  ];
  console.log(queryMessage);
  const res = await pool.query(queryMessage, values);
}
