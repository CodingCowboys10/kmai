import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
import { Message } from "ai";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id)
      return NextResponse.json(
        { message: "Errore durante la eliminazione" },
        { status: 500 },
      );

    const countQuery = `SELECT content, role , created_at , sourcePage , sourceLink FROM messages WHERE thread_id = ${body.id}`;

    const result = await pool.query(countQuery);

    // Da correggere e da sistemare
    const messages: Message[] = result.rows.map((row: any) => ({
      id: "21",
      content: row.content,
      role: row.role,
      createdAt: new Date(),
    }));

    //console.log(messages);

    return NextResponse.json(
      {
        message: "Chat eliminata con successo",
        messages: messages,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Errore durante la eliminazione" },
      { status: 500 },
    );
  }
}
