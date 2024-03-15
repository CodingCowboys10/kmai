import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";

//funzione per ottenere i titoli delle chat
export async function POST(req: NextRequest) {
  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
