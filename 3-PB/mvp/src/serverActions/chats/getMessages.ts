"use server";

import pool from "@/serverActions/utils/postgres";
import { Message } from "ai";

export async function getMessages(id: number | null) {
  const countQuery = `SELECT id,content, role , created_at , sourcepage , sourcelink FROM messages WHERE thread_id = ${id} ORDER BY created_at`;

  const result = await pool.query(countQuery);

  const chatHistory = result.rows.map((row: any) => ({
    id: row.id,
    content: row.content,
    role: row.role,
    createdAt: new Date(row.created_at).toLocaleString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const source = result.rows.reduce((acc, row) => {
    acc[row.id] = [
      {
        metadata: {
          name: row.sourcelink,
          page: row.sourcepage,
        },
      },
    ];
    return acc;
  }, {});

  return { chatHistory, source };
}
