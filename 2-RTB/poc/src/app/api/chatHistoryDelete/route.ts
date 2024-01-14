import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database("./src/db/databaseMess.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) return console.error(err.message);
        });
        db.run('DELETE FROM ChatHistory');
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log("Closed the database connection.");
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  
    return NextResponse.json({ success: true}, { status: 200 })                                    //chiamata eseguita correttamente
  }