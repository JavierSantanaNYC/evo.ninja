import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") as string;
  try {
    const dbPath = "/mnt/c/github/evo.ninja/db/PerformanceData.db";
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        return;
      }
    });
    const result = await new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error("Error running query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    db.close((closeErr) => {
      if (closeErr) {
        console.error("Error closing database:", closeErr.message);
      }
    });
    return NextResponse.json({ text: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}
