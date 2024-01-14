import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./src/db/databaseMess.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return NextResponse.json({ success: false, error: err.message }, { status: 500 });
        }
    });
    let messagesArray;
    db.all('SELECT * FROM ChatHistory', (err, rows) => {
        if (err) {
            console.error(err.message);
            return NextResponse.json({ success: false, error: err.message }, { status: 500 });
        }
        messagesArray = rows.map(row => JSON.parse(row.message));
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
            return NextResponse.json({ success: false, error: err.message }, { status: 500 });
        }
    });

    return NextResponse.json({ success: true, messages: messagesArray }, { status: 200 });
    
}
