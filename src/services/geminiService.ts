import { GoogleGenerativeAI } from "@google/generative-ai";
import haramData from "../data/haram_ingredients.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getMoodDua(mood: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `The user feels ${mood}. Return a JSON containing: 
  1. A comforting Ayat (Arabic + Translation), 
  2. A Sahih Dua from Hisnul Muslim (Arabic + Translation), 
  3. A 30-second 'Actionable Advice' based on Sunnah.
  
  Format:
  {
    "ayat": { "arabic": "...", "translation": "..." },
    "dua": { "arabic": "...", "translation": "..." },
    "advice": "..."
  }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    // Clean JSON if needed
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
}

export async function analyzeIngredients(image: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Analyze this list of ingredients from a food product. 
  Cross-check against these known haram ingredients: ${haramData.haram_ingredients.join(", ")}.
  Also consider these caution ingredients: ${haramData.caution_ingredients.join(", ")}.
  
  Return a JSON:
  {
    "status": "Halal" | "Haram" | "Caution",
    "reason": "...",
    "foundIngredients": ["..."]
  }`;

  // Assuming image is base64
  const result = await model.generateContent([
    prompt,
    { inlineData: { data: image.split(",")[1], mimeType: "image/jpeg" } }
  ]);
  const response = await result.response;
  const text = response.text();
  
  try {
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    return { status: "Caution", reason: "Could not analyze clearly" };
  }
}
