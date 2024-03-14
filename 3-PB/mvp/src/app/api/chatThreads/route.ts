import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";

//funzione per ottenere i titoli delle chat
export async function GET(req: NextRequest) {
  try {
    const query = "SELECT id,title FROM chat_threads ORDER BY id DESC";
    const { rows } = await pool.query(query);

    const titles = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
    }));
    return NextResponse.json(titles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
