// js/gemini.js

const path = '/-1@2L/6541/76@015/.env';
let GEMINI_API_KEY = '';

// Fetch Gemini API Key from backend or secure source
async function fetchGeminiKey() {
  try {
    const response = await fetch(`/api/get-key?path=${encodeURIComponent(path)}`);
    const text = await response.text();
    GEMINI_API_KEY = text.trim();
  } catch (err) {
    console.error("🔐 Gemini API Key Load Error:", err);
  }
}

// Generate Gemini Reply
async function generateGeminiReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();

  // fallback if key is still missing
  if (!GEMINI_API_KEY) return "❌ Gemini API Key မရှိသေးပါ။";

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

    const data = await response.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return result || "⚠ Gemini မှ ဖြေချက် မရရှိပါ။";
  } catch (error) {
    console.error("⚠ Gemini API Call Error:", error);
    return "❌ Gemini API ခေါ်ရာတွင် ပြဿနာရှိပါသည်။";
  }
}

// Make it available globally
window.generateGeminiReply = generateGeminiReply;
