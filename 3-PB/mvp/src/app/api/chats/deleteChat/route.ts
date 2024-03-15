import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const deleteQuery = `DELETE FROM chat_threads WHERE id = ${body.id}`;
    const maxIdQuery = "SELECT MAX(id) AS max_id FROM chat_threads";

    await pool.query(deleteQuery); // Eliminazione dell'elemento

    const maxIdResult = await pool.query(maxIdQuery); // Query per ottenere l'ID massimo
    const maxId = maxIdResult.rows[0].max_id;
    return NextResponse.json(
      { message: "Chat eliminata con successo", id: maxId },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Errore durante la eliminazione" },
      { status: 500 },
    );
  }
}
