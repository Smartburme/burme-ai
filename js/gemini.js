let GEMINI_API_KEY = '';
const LOCAL_KEY_PATH = '0/GEMINI_API_KEY.txt';
const FALLBACK_API_KEY = '';

// 🔑 Load Gemini API Key from local file
async function fetchGeminiKey() {
  try {
    const res = await fetch(LOCAL_KEY_PATH);
    const text = await res.text();
    GEMINI_API_KEY = text.trim();
    console.log("🔐 Gemini API Key loaded locally.");
  } catch (err) {
    console.error("❌ Failed to load API key:", err);
    GEMINI_API_KEY = FALLBACK_API_KEY;
  }
}

// 🌐 Main generate function (text / image / video)
async function generateGeminiReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();
  if (!GEMINI_API_KEY) return "❌ API key not available.";

  let endpoint = `https://generativelanguage.googleapis.com/v1beta/models/`;
  let requestBody = {};

  if (mode === 'image') {
    endpoint += `gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`;
    requestBody = {
      contents: [{ parts: [{ text: message }] }]
    };
  } else if (mode === 'video') {
    // Placeholder: Gemini does not support video gen yet
    return "⚠ Gemini API does not support video generation yet.";
  } else {
    // Default text
    endpoint += `gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    requestBody = {
      contents: [{ parts: [{ text: message }] }]
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || 'API error');

    if (mode === 'image') {
      // If image URL or base64 returned
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ No image result.";
    } else {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ No reply.";
    }
  } catch (err) {
    console.error("Gemini API Error:", err);
    return `❌ API error: ${err.message}`;
  }
}

window.generateGeminiReply = generateGeminiReply;
