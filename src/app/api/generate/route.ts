import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import pool from "@/lib/supabase";

const exerciseDone: string[] = [];

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const prompt = `Give me an advanced 1–2 minute bodyweight workout that I can do anywhere without any equipment.

Do NOT suggest any of the following exercises: ${exerciseDone.join(",")}.

Respond with exactly two sentences:
- The first sentence must only be the exercise title (e.g. "Squats.")
- The second sentence must be a short, specific instruction for the workout (e.g. "Perform 100 squats with minimum rest in between.")

Do not use asterisks, emojis, bullet points, or any other formatting.

The workout must be one single type of exercise, no combinations or variations. It should assume the person can handle medium to hard challenges and does not need beginner modifications.`;

export async function GET() {
  console.log("Triggered the get request");

  try {
    const result = await pool.query("SELECT * FROM exercises");
    result.rows.forEach((row) => exerciseDone.push(row.name));
  } catch (error) {
    console.log("Failed to fetch exercises from DB", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  let tries = 0;
  let maxTries = 5;

  let workout: {
    id?: number;
    title: string;
    content: string;
    completed: boolean;
  } = {
    title: "",
    content: "",
    completed: false,
  };

  try {
    do {
      if (tries >= maxTries) {
        return NextResponse.json(
          { error: "Could not generate a unique workout" },
          { status: 500 }
        );
      }
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt + `The Workout cannot be ${exerciseDone}`,
      });
      if (response.text) {
        console.log(response.text);
        const splitArray = response.text.split("\n");
        const filteredArray = splitArray.filter((item) => item.trim() != "");
        workout.title = filteredArray[0];
        workout.content = filteredArray[1];
        console.log(workout);
      }
    } while (exerciseDone.includes(workout.title));
    try {
      if (!workout.title) {
        return NextResponse.json(
          { error: "No unique workout generated" },
          { status: 500 }
        );
      }
      const entry = await pool.query(
        "INSERT INTO exercises (name) values ($1) returning (id, name, complete)",
        [workout.title]
      );
      console.log(entry.rows[0]);
      exerciseDone.push(entry.rows[0].name);
      workout.id = entry.rows[0].id;
      workout.completed = entry.rows[0].complete;
      console.log(workout);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
    return NextResponse.json({ result: workout });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to generate workout",
      result: "Failed to generate workout",
    });
  }
}
