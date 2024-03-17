"use server";

import pool from "@/serverActions/utils/postgres";

export async function getChats() {
  const query = `
  SELECT chat_threads.id, chat_threads.title, MAX(messages.created_at) AS last_message_time
  FROM chat_threads
  LEFT JOIN messages ON chat_threads.id = messages.thread_id
  GROUP BY chat_threads.id, chat_threads.title
  ORDER BY last_message_time DESC NULLS LAST, chat_threads.id DESC;
`;
  const { rows } = await pool.query(query);

  return rows.map((row: any) => ({
    id: row.id,
    title: row.title,
  }));
}
