"use server";

import pool from "@/serverActions/utils/postgres";

export async function addChat(title: string) {
  const query = `INSERT INTO chat_threads (title) VALUES ($1) RETURNING id`;
  const values = [title];
  const res = await pool.query(query, values);
  return res.rows[0].id;
}
