"use server";

import pool from "@/serverActions/utils/postgres";
import { Message } from "ai";

export async function getMessages(id: number | null) {
  const countQuery = `SELECT id,content, role , created_at , sourcePage , sourceLink FROM messages WHERE thread_id = ${id}`;

  const result = await pool.query(countQuery);


  const messages = result.rows.map((row: any) => ({
    id: row.id,
    content: row.content,
    role: row.role,
    createdAt: new Date(row.created_at).toLocaleString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const source = result.rows.map((row: any) => ({
    [row.id]: [
      {
        metadata: {
          date: row.createdAt,
          name: row.sourceLink,
          page: row.sourcePage,
        },
      },
    ],
  }));

  return {messages, source};
}
