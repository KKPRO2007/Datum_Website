
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Datum AI Assistant. Datum is a student-driven data science community.
Our Mission: To empower students with data science skills, practical knowledge, and industry connections.
Our Vision: To be the leading student-driven data science community bridging the gap between academia and industry.
Key Offerings: Hands-on Projects, Expert Workshops, Professional Network, and Career Growth.
Tone: Professional, encouraging, tech-savvy, and helpful.
If asked about events, mention that Datum hosts Workshops, Datathons, and Networking sessions.
`;

export const getGeminiResponse = async (userPrompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently experiencing some technical difficulties. Please try again later.";
  }
};
