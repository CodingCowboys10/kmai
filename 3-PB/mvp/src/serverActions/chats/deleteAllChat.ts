"use server";
import pool from "@/serverActions/utils/postgres";

export async function deleteAllChat() {
  const deleteQuery = `DELETE FROM chat_threads `;
  await pool.query(deleteQuery);
}
