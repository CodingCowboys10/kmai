"use server";

import pool from "@/serverActions/utils/postgres";

export async function getChats() {
  const countQuery = "SELECT COUNT(id) AS total_count FROM chat_threads";

  const countResult = await pool.query(countQuery); // Query per ottenere il numero totale di ID
  const number = countResult.rows[0].total_count;

  const query = "SELECT id,title FROM chat_threads ORDER BY id DESC";
  const { rows } = await pool.query(query);

  const titles = rows.map((row: any) => ({
    id: row.id,
    title: row.title,
  }));

  return { titles, number };
}
