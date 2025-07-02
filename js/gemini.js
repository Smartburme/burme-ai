let GEMINI_API_KEY = '';
const FALLBACK_API_KEY = 'YOUR_FALLBACK_KEY_HERE'; // optional fallback key

// Load Gemini API Key from GitHub-hosted .env file
async function fetchGeminiKey() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Smartburme/burme-ai.io/main/assets/.env");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();

    const match = text.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
      console.log("✅ GEMINI API Key loaded from .env");
    } else {
      console.warn("⚠️ GEMINI_API_KEY not found in .env file. Using fallback.");
      GEMINI_API_KEY = FALLBACK_API_KEY;
    }
  } catch (error) {
    console.error("❌ Failed to fetch Gemini API Key:", error);
    GEMINI_API_KEY = FALLBACK_API_KEY;
  }
}

// Core Generate Function
async function generateGeminiReply(prompt, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();
  if (!GEMINI_API_KEY) return "❌ Gemini API Key is missing.";

  try {
    let endpoint = "https://generativelanguage.googleapis.com/v1beta/models/";
    let requestBody = {};

    switch (mode) {
      case 'text':
      case 'code':
      case 'plan':
      case 'project':
        endpoint += "gemini-pro:generateContent?key=" + GEMINI_API_KEY;
        requestBody = {
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        };
        break;

      case 'image':
        endpoint = `https://generativelanguage.googleapis.com/v1beta/models/image-generator:generateContent?key=${GEMINI_API_KEY}`;
        requestBody = {
          prompt: prompt
        };
        break;

      case 'video':
        return "⚠️ Video generation is not supported yet in Gemini. Use a third-party API.";

      default:
        return "❌ Invalid generation mode.";
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API Error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    console.log("Gemini API response:", data);

    if (mode === 'image') {
      return data?.candidates?.[0]?.content?.imageUri || "⚠️ Image not returned.";
    } else {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response.";
    }
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return "❌ Gemini API error occurred.";
  }
}

// Expose globally
window.generateGeminiReply = generateGeminiReply;
