import { NextRequest, NextResponse } from 'next/server';
import pool from "@/app/api/utils/postgres";

//funzione per ottenere i titoli delle chat
export async function GET(req: NextRequest) {
    try {
        const query = 'SELECT title FROM chat_threads';
        const { rows } = await pool.query(query);

        const titles = rows.map((row: any) => ({
            title: row.title,
        }));
        return NextResponse.json( titles , { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}