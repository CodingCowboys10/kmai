"use server";

import pool from "@/serverActions/utils/postgres";

export async function addChat(title: string) {
  const query = `INSERT INTO chat_threads (title) VALUES ('${title}') RETURNING id`;
  const res = await pool.query(query);

  return res.rows[0].id;
}
