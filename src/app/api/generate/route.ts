import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const prompt = `Give me an easy 1-2 min bodyweight workout that I can do anywhere without any equipments.
  The response should only have total of 2 sentences.
  The first sentence should be a title. The second sentence should be the exercise information.
  Do not put asterisk before or after the title.
  The workout should assume the person can do medium to hard challenges and easier variations should not be there in the response.
  The workout should not be combination of different exercise but a same exercise.
  `;
export async function POST() {
  const exerciseDone: string[] = [];
  console.log("Triggered the post request to ai api");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt + `The Workout cannot be ${exerciseDone}`,
    });
    let workout: { title: string; content: string } = {
      title: "",
      content: "",
    };
    if (response.text) {
      console.log(response.text);
      const splitArray = response.text.split("\n");
      splitArray.filter((item) => {
        if (item) return item;
      });
      console.log(splitArray);
      workout.title = splitArray[0];
      workout.content = splitArray[1];
      exerciseDone.push(workout.title);
    }
    console.log(workout);
    return NextResponse.json({ result: workout });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to generate workout",
      result: "Failed to generate workout",
    });
  }
}
