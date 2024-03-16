import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messageAI = body.messageAI;
    const messageUser = body.messageUser;
    const sessionId = body.sessionId;
    const sourcePage = body.source[0]?.metadata.page;
    const sourceDoc = body.source[0]?.metadata.name;

    console.log(sourcePage);
    console.log(sourceDoc);
    console.log(sessionId);
    console.log(messageUser);
    console.log(messageAI);

    const formattedUserCreatedAt = messageUser.createdAt.toLocaleString(
      "it-IT",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    );
    const formattedAICreatedAt = messageAI.createdAt.toLocaleString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    //Il message content va escapato se contiene un ` esplode il mondo.
    const queryMessage = `
    INSERT INTO messages (thread_id, content, role, created_at)
    VALUES 
    (${sessionId}, '${messageUser.content}', '${messageUser.role}', '${formattedUserCreatedAt}'),
    (${sessionId}, '${messageAI.content}', '${messageAI.role}', '${formattedAICreatedAt}')`;
    console.log(queryMessage);
    const res = await pool.query(queryMessage);

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
