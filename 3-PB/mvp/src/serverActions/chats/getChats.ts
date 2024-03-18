"use server";

import pool from "@/serverActions/utils/postgres";

export async function getChats() {
  /*
  da modificare con questo
  const query = `
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                thread_id INTEGER REFERENCES chat_threads(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                role VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                sourcePage VARCHAR(30),
                sourceLink VARCHAR(30),
                UNIQUE (thread_id, id)
            );
        `;

   */
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
