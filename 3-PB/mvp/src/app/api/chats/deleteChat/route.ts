import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = `DELETE FROM chat_threads WHERE id = ${body.id}`;

    const res = await pool.query(query);

    return NextResponse.json(
      { message: "Chat Eliminata con successo" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Errore durante la eliminazione" },
      { status: 500 },
    );
  }
}
