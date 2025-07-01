const GITHUB_ENV_URL = "https://raw.githubusercontent.com/Smartburme/burme-ai.io/main/-1%402L/6541/76%40015/.env";
let GEMINI_API_KEY = '';
const FALLBACK_API_KEY = 'YOUR_FALLBACK_API_KEY_HERE'; // fallback key (optional)

// Fetch Gemini API Key from GitHub raw .env
async function fetchGeminiKey() {
  try {
    const response = await fetch(GITHUB_ENV_URL);
    const text = await response.text();

    // Parse key=value line (GEMINI_API_KEY=xxx)
    const match = text.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
      console.log("🔐 Gemini API Key loaded from GitHub .env");
    } else {
      console.warn("🔐 GEMINI_API_KEY not found in .env, using fallback");
      GEMINI_API_KEY = FALLBACK_API_KEY;
    }
  } catch (err) {
    console.error("🔐 Gemini API Key Load Error:", err);
    GEMINI_API_KEY = FALLBACK_API_KEY;
  }
}

// Generate Gemini Reply with mode support
async function generateGeminiReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();

  if (!GEMINI_API_KEY) return "❌ Gemini API Key မရှိသေးပါ။";

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    // Prepare request payload depending on mode
    let requestBody;

    if (mode === 'image') {
      // Example for image generation (adjust as per Gemini spec)
      requestBody = {
        prompt: message,
        // add image generation specific params here
      };
      // If Gemini expects a different endpoint for image generation,
      // you need to change endpoint accordingly.
    } else if (mode === 'code') {
      requestBody = {
        contents: [{ parts: [{ text: message }] }],
        // optionally specify code model params here
      };
    } else {
      // default: text mode
      requestBody = {
        contents: [{ parts: [{ text: message }] }],
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

    const data = await response.json();

    // Parse response according to mode
    if (mode === 'image') {
      // example: return image URL from response (adjust if needed)
      return data?.candidates?.[0]?.content?.imageUri || "⚠ Image not generated.";
    } else {
      // default text/code response parsing
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ Gemini မှ ဖြေချက် မရရှိပါ။";
    }
  } catch (error) {
    console.error("⚠ Gemini API Call Error:", error);
    return "❌ Gemini API ခေါ်ရာတွင် ပြဿနာရှိပါသည်။";
  }
}

// Export globally
window.generateGeminiReply = generateGeminiReply;
