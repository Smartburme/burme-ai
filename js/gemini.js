// Gemini API Key Source (Google Drive raw txt file)
const DRIVE_RAW_URL = "https://drive.google.com/uc?export=download&id=19d7CxPfrCkJtR4_d-pYE4b60Ih0P2o64";
let GEMINI_API_KEY = '';
const FALLBACK_API_KEY = 'YOUR_FALLBACK_API_KEY_HERE'; // fallback key

// Fetch Gemini API Key from Google Drive txt file
async function fetchGeminiKey() {
  try {
    const response = await fetch(DRIVE_RAW_URL);
    const text = await response.text();

    const match = text.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
      console.log("🔐 Gemini API Key loaded from Google Drive");
    } else {
      console.warn("⚠ GEMINI_API_KEY not found in file, using fallback");
      GEMINI_API_KEY = FALLBACK_API_KEY;
    }
  } catch (err) {
    console.error("❌ Gemini API Key Load Error:", err);
    GEMINI_API_KEY = FALLBACK_API_KEY;
  }
}

// Generate Gemini Reply with mode support
async function generateGeminiReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();
  if (!GEMINI_API_KEY) return "❌ Gemini API Key မရှိသေးပါ။";

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    let requestBody;

    if (mode === 'image') {
      requestBody = {
        prompt: message,
      };
    } else {
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

    if (mode === 'image') {
      return data?.candidates?.[0]?.content?.imageUri || "⚠ Image not generated.";
    } else {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ Gemini မှ ဖြေချက် မရရှိပါ။";
    }
  } catch (error) {
    console.error("⚠ Gemini API Call Error:", error);
    return "❌ Gemini API ခေါ်ရာတွင် ပြဿနာရှိပါသည်။";
  }
}

// Export globally
window.generateGeminiReply = generateGeminiReply;
