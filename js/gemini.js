// Load environment variables from .env file
require('dotenv').config();

// Gemini API Configuration
const GEMINI_CONFIG = {
  API_KEY: process.env.GEMINI_API_KEY,
  TEXT_MODEL: process.env.GEMINI_TEXT_MODEL || 'gemini-pro',
  VISION_MODEL: process.env.GEMINI_VISION_MODEL || 'gemini-pro-vision',
  API_ENDPOINT: process.env.GEMINI_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta/models'
};

// Main Gemini Reply Generator
async function generateGeminiReply(prompt, mode = 'text') {
  // Validate API Key
  if (!GEMINI_CONFIG.API_KEY) {
    console.error('❌ Gemini API Key not configured');
    return '❌ API service unavailable';
  }

  let endpoint, body;

  switch (mode) {
    case 'text':
    case 'code':
    case 'plan':
    case 'project':
      endpoint = `${GEMINI_CONFIG.API_ENDPOINT}/${GEMINI_CONFIG.TEXT_MODEL}:generateContent?key=${GEMINI_CONFIG.API_KEY}`;
      body = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      break;

    case 'image':
      endpoint = `${GEMINI_CONFIG.API_ENDPOINT}/${GEMINI_CONFIG.VISION_MODEL}:generateContent?key=${GEMINI_CONFIG.API_KEY}`;
      body = { prompt: prompt };
      break;

    case 'video':
      return "⚠️ Video mode not supported";
    
    default:
      return `❌ Unknown mode: "${mode}"`;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Gemini Error', res.status, errorText);
      return `❌ Gemini API Error (${res.status})`;
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response content";

  } catch (err) {
    console.error('❌ Gemini Network Error:', err);
    return '❌ Service unavailable';
  }
}

// Export only in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateGeminiReply };
} else {
  window.generateGeminiReply = generateGeminiReply;
}
