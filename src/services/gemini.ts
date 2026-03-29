import { GoogleGenAI } from "@google/genai";
console.log("API KEY:", import.meta.env.VITE_GEMINI_API_KEY);
let aiInstance: GoogleGenAI | null = null;

function getAiInstance() {
  if (!aiInstance) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is not set. Please add it to your .env file.");
    }

    aiInstance = new GoogleGenAI({ apiKey });
  }

  return aiInstance;
}

export async function getAiGuidance(prompt: string, context: string) {
  const model = "gemini-3.1-flash-preview";

  const systemInstruction = `
You are the Impex AI Assistant. 
Impex is a global marketplace connecting international buyers with Indian sellers.

Your goal is to provide guidance on:
- For Buyers: Product quality, import duties, shipping optimization, and finding the best Indian products.
- For Sellers: Export documentation (HS codes, invoices), packaging standards, and global market trends.
- For Both: How collaborative buying (group orders) works to reduce costs.

Current Context: ${context}

Be professional, helpful, and concise. Use markdown for formatting.
`;

  try {
    const ai = getAiInstance();

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
}