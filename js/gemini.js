// gemini.js - Supports text, image, code, video modes
async function generateGeminiReply(prompt, mode = 'text') {
  const apiKey = window.ENV?.GEMINI_API_KEY;
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  if (!apiKey) {
    console.error("❌ Gemini API Key not found in ENV");
    return "API Key missing.";
  }

  let finalPrompt = prompt;

  if (mode === 'image') {
    finalPrompt = `Generate a detailed, realistic image of: ${prompt}`;
  } else if (mode === 'code') {
    finalPrompt = `Write efficient code for: ${prompt}`;
  } else if (mode === 'video') {
    finalPrompt = `Describe a video idea for: ${prompt} (or provide a video link if supported).`;
  }

  try {
    const res = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: finalPrompt }] }]
      })
    });

    const data = await res.json();

    // Handle image & video logic separately (if returned as base64 or URL)
    const response = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response) return "⚠️ No response from Gemini.";

    // If the response contains an image or video URL
    if (mode === 'image' && response.includes('http')) return extractUrl(response);
    if (mode === 'video' && response.includes('http')) return extractUrl(response);

    return response;
  } catch (error) {
    console.error("Gemini error:", error);
    return "❌ Error connecting to Gemini API.";
  }
}

// 🔧 Helper to extract first URL from text
function extractUrl(text) {
  const urlMatch = text.match(/https?:\/\/[^\s]+/);
  return urlMatch ? urlMatch[0] : text;
}
