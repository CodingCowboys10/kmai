import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const countQuery = "SELECT COUNT(id) AS total_count FROM chat_threads";

    const countResult = await pool.query(countQuery); // Query per ottenere il numero totale di ID
    const totalCount = countResult.rows[0].total_count;

    const query = "SELECT id,title FROM chat_threads ORDER BY id DESC";
    const { rows } = await pool.query(query);

    const titles = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
    }));

    return NextResponse.json(
      {
        message: "Chat eliminata con successo",
        number: totalCount,
        titles: titles,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Errore durante la eliminazione" },
      { status: 500 },
    );
  }
}
