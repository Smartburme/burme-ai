import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing. Please add REACT_APP_GEMINI_API_KEY to your .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateText = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

export const generateImage = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
