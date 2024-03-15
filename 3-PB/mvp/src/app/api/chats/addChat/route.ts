import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const query = `INSERT INTO chat_threads (title) VALUES ('Titolo Temporaneo ') RETURNING id`;
    const res = await pool.query(query);

    return NextResponse.json(
      { message: "ciao", id: res.rows[0].id },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: "not ciao" }, { status: 500 });
  }
}
