"use server";

import pool from "@/serverActions/utils/postgres";
import { Message } from "ai";
import { MessageSource } from "@/lib/config/interfaces";

export async function getMessages(id: number | null) {
  const countQuery = `SELECT id,content, role , created_at , sourcepage , sourcelink FROM messages WHERE thread_id = ${id} ORDER BY created_at`;

  const result = await pool.query(countQuery);

  const allMessages: Message[] = result.rows.map((row: any) => ({
    id: row.id,
    content: row.content,
    role: row.role,
    createdAt: new Date(row.created_at),
  }));

  const source: MessageSource = result.rows.reduce((acc, row) => {
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

  return { allMessages, source };
}
