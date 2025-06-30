import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
  alert("API Key is not configured. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const systemInstruction = `You are Burme AI, a helpful and creative assistant. 
Your goal is to provide accurate, helpful, and well-formatted responses. 
You are an expert in writing, planning, and various creative tasks.
Always be polite and professional.`;

export const createChat = (): Chat => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured.");
  }
  return ai.chats.create({
    model: 'gemini-2.5-flash-preview-04-17',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};
