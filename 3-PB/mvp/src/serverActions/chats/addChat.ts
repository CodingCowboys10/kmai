"use server";

import pool from "@/serverActions/utils/postgres";

export async function addChat() {
  const query = `INSERT INTO chat_threads (title) VALUES ('Titolo Temporaneo ') RETURNING id`;
  const res = await pool.query(query);

  return res.rows[0].id;
}
