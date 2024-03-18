"use server";

import pool from "@/serverActions/utils/postgres";
import { Message } from "ai";

export async function getMessages(id: number | null) {
  const countQuery = `SELECT id,content, role , created_at , sourcePage , sourceLink FROM messages WHERE thread_id = ${id}`;

  const result = await pool.query(countQuery);

  // @ts-ignore
  const messages: Message[] = result.rows.map((row: any) => ({
    id: row.id,
    content: row.content,
    role: row.role,
    createdAt: new Date(row.created_at).toLocaleString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const source: Record<string, any> = result.rows.map((row: any, index) => ({
    index: [
      {
        metadata: {
          name: row.sourceLink,
          page: row.sourcePage,
        },
      },
    ],
  }));

  return messages;
}
