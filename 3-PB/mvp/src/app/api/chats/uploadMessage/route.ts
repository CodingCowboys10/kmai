import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messageAI = body.messageAI;
    const messageUser = body.messageUser;
    const sessionId = body.sessionId;
    //const sourcePage = body.source[0]?.metadata.page;
    //const sourceDoc = body.source[0]?.metadata.name;

    const queryMessage = `
      INSERT INTO messages (thread_id, content, role, created_at)
      VALUES 
      ($1, $2, $3, $4),
      ($5, $6, $7, $8)`;

    const values = [
      sessionId,
      messageUser.content,
      messageUser.role,
      messageUser.createdAt,
      sessionId,
      messageAI.content,
      messageAI.role,
      messageAI.createdAt,
    ];

    const res = await pool.query(queryMessage, values);

    return NextResponse.json(
      { message: "Chat Salvata con successo" },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Errore nel salvataggio della chat" },
      { status: 500 },
    );
  }
}
