// js/gemini.js

const DRIVE_RAW_URL = "https://drive.google.com/uc?export=download&id=19d7CxPfrCkJtR4_d-pYE4b60Ih0P2o64";
let GEMINI_API_KEY = '';
const FALLBACK_API_KEY = 'YOUR_BACKUP_API_KEY';

// Step 1: Load Gemini API key from Google Drive
async function fetchGeminiKey() {
  try {
    const res = await fetch(DRIVE_RAW_URL);
    const txt = await res.text();
    const match = txt.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
      console.log("🔐 Gemini API Key loaded.");
    } else {
      console.warn("⚠ GEMINI_API_KEY not found, using fallback.");
      GEMINI_API_KEY = FALLBACK_API_KEY;
    }
  } catch (e) {
    console.error("❌ Error loading Gemini API Key:", e);
    GEMINI_API_KEY = FALLBACK_API_KEY;
  }
}

// Step 2: Generate Gemini AI Response (text/image/code)
async function generateReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();
  if (!GEMINI_API_KEY) return displayMessage("❌ Gemini API Key မရှိသေးပါ။", "bot");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  const requestBody = {
    contents: [{ parts: [{ text: message }] }]
  };

  // Show user message
  displayMessage(message, "user");

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ ဖြေချက်မရရှိပါ။";

    displayMessage(reply, "bot");
  } catch (err) {
    console.error("Gemini Error:", err);
    displayMessage("❌ Gemini API ခေါ်ရာတွင် ပြဿနာရှိပါသည်။", "bot");
  }
}

// Step 3: Display message to UI
function displayMessage(text, sender = 'bot') {
  const chatContainer = document.getElementById('chatContainer');
  const msg = document.createElement('div');
  msg.className = `chat-message ${sender}`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.generateReply = generateReply;
