import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";

export async function GET(req: NextRequest) {
  try {
    // Query per recuperare i messaggi ordinati per data discendente
    const query =
      "SELECT id, message, role, model, date FROM ChatHistory ORDER BY date ASC";
    const { rows } = await pool.query(query);

    // Trasformare i risultati in un array di oggetti Message
    const messages = rows.map((row: any) => ({
      id: row.id,
      content: row.message,
      role: row.role,
      createdAt: row.date,
    }));

    // Recupera i modelli dei messaggi
    const messagesModel = rows.map((row: any) => row.model);

    return NextResponse.json({ messages, messagesModel }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newMessage = body.newMessage;
    const messageId: string = newMessage.id;
    const messageDate: Date = newMessage.createdAt;
    const messageContent: string = newMessage.content;
    const messageRole: string = newMessage.role;
    const messageModel: string = messageRole == "user" ? "" : body.model;

    // Controlla se l'id è già presente nella tabella per sapere se bisogna aggiungere una nuova voce o no
    const result = await pool.query("SELECT * FROM ChatHistory WHERE id = $1", [
      messageId,
    ]);
    if (result.rows.length === 0) {
      await pool.query(
        "INSERT INTO ChatHistory (id, message, role, model, date) VALUES ($1, $2, $3, $4, $5)",
        [messageId, messageContent, messageRole, messageModel, messageDate],
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Esegui la query per eliminare tutte le voci dalla tabella
    await pool.query("DELETE FROM ChatHistory");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
