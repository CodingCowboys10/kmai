import { NextRequest, NextResponse } from 'next/server';
import {Message} from "ai";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function GET(req: NextRequest) {

    const db = await open({
        filename: './src/db/databaseMess.db',
        driver: sqlite3.Database,
    });

    let messages: Message[] = [];
    let messagesModel: string[] = [];
    try {
        const rows = await db.all("SELECT id, message, role, model, date FROM ChatHistory ORDER BY date DESC");
        rows.forEach((row : any) => {
            messages = [{id: row.id, content: row.message, role: row.role, createdAt:Date(row.date)}, ...messages];
            messagesModel = [row.model, ...messagesModel];
        });
    } catch (e){
        console.error(e);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({messages: messages, messagesModel: messagesModel}, { status: 200 });

}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newMessage = body.newMessage;
    const messageId: string= newMessage.id;
    const messageDate: Date = newMessage.createdAt;
    const messageContent: string = newMessage.content;
    const messageRole: string = newMessage.role;
    const messageModel: string = messageRole=='user'? '' : body.model;

    const db = await open({
        filename: './src/db/databaseMess.db',
        driver: sqlite3.Database,
    });

    // Controllare se l'id è già presente nella tabella per sapere se bisogna aggiungere una nuova voce o no
    const row = await db.get('SELECT * FROM ChatHistory WHERE id = ?', [messageId]);
    if (!row) {
        await db.run('INSERT INTO ChatHistory (id, message, role,  model, date) VALUES (?, ?, ?, ?, ?)', [messageId, messageContent, messageRole, messageModel, messageDate], (insertErr: Error) => {
            if (insertErr) {
                console.error(insertErr.message);
                return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });
            }
        });
    }
    await db.close();
    return NextResponse.json({ success: true}, { status: 200 })                                    //chiamata eseguita correttamente
}

export async function DELETE(req: NextRequest) {
    try {
        const db = await open({
            filename: './src/db/databaseMess.db',
            driver: sqlite3.Database,
        });

        await db.run('DELETE FROM ChatHistory');
        await db.close();
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }

    return NextResponse.json({ success: true}, { status: 200 })                                    //chiamata eseguita correttamente
}