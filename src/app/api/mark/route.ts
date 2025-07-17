import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = body.id;
  const date = body.date;
  console.log(date);
  const result = await pool.query(
    "UPDATE exercises set complete = true, date_completed = $1 where id = $2",
    [date, id]
  );
  return NextResponse.json({ Message: "update successful" }, { status: 200 });
}
