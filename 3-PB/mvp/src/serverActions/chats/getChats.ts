"use server";

import pool from "@/serverActions/utils/postgres";

export async function getChats() {
  const query = `
SELECT * 
FROM chat_threads ct
LEFT JOIN (
    SELECT thread_id, MAX(created_at) AS max_created_at
    FROM messages
    GROUP BY thread_id
) AS max_messages ON ct.id = max_messages.thread_id
ORDER BY COALESCE(max_messages.max_created_at, ct.created_at) DESC;
`;

  const { rows } = await pool.query(query);

  return rows.map((row: any) => ({
    id: row.id,
    title: row.title,
  }));
}
