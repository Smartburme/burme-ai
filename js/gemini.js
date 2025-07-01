// js/gemini.js

const GITHUB_ENV_URL = "https://raw.githubusercontent.com/Smartburme/burme-ai.io/main/-1%402L/6541/76%40015/.env";
let GEMINI_API_KEY = '';

// Fetch Gemini API Key from GitHub raw .env
async function fetchGeminiKey() {
  try {
    const response = await fetch(GITHUB_ENV_URL);
    const text = await response.text();

    // Parse key=value format line
    const match = text.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
    } else {
      console.error("🔐 GEMINI_API_KEY not found in .env");
    }
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
