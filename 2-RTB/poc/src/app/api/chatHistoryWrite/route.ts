import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {  
    const body = await request.json();
    const newMessage = body.newMessage;
    const idToCheck = newMessage.id;

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database("./src/db/databaseMess.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });

    // Controllare se l'id è già presente nella tabella per sapere se bisogna aggiungere una nuova voce e aggiornare (necessario per messaggi di risposta)
    db.get('SELECT * FROM ChatHistory WHERE id = ?', [idToCheck], (err, row) => {
    if (err) {
        console.error(err.message);
        return;
    }

    if (row) {
        // L'id è già presente, eseguire l'aggiornamento dell'array
        db.run('UPDATE ChatHistory SET message = ? WHERE id = ?', [JSON.stringify(newMessage), idToCheck], (updateErr) => {
        if (updateErr) {
            console.error(updateErr.message);
        }
        });
    } else {
        // L'id non è presente, eseguire l'inserimento di una nuova coppia id-array
        db.run('INSERT INTO ChatHistory (id, message) VALUES (?, ?)', [idToCheck, JSON.stringify(newMessage)], (insertErr) => {
        if (insertErr) {
            console.error(insertErr.message);
        }
        });
    }
    });
  
    return NextResponse.json({ success: true}, { status: 200 })                                    //chiamata eseguita correttamente
  }