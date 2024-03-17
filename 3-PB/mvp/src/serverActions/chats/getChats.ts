"use server";

import pool from "@/serverActions/utils/postgres";

export async function getChats() {
  const query = "SELECT id,title FROM chat_threads ORDER BY id DESC";
  const { rows } = await pool.query(query);

  return rows.map((row: any) => ({
    id: row.id,
    title: row.title,
  }));
}
