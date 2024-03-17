"use server";
import pool from "@/serverActions/utils/postgres";

export async function deleteChat(id: number) {
  const deleteQuery = `DELETE FROM chat_threads WHERE id = ${id}`;
  await pool.query(deleteQuery);
}
