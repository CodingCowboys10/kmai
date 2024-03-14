import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";
let a = 1;
export async function POST(request: NextRequest) {
  try {
    const query = `INSERT INTO chat_threads (title) VALUES ('Titolo Temporaneo ${a}') RETURNING id`;
    a += 1;
    const res = await pool.query(query);
    console.log(res.rows[0].id);
    return NextResponse.json(
      { message: "ciao", id: res.rows[0].id },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: "not ciao" }, { status: 500 });
  }
}
