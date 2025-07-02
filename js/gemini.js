let GEMINI_API_KEY = '';
const FALLBACK_API_KEY = 'YOUR_BACKUP_API_KEY';

const DRIVE_RAW_URL = "https://drive.google.com/uc?export=download&id=19wHnxOoG0OIS0tKJU79II0rAGQvJ3KLt";

// Load Gemini API Key
async function fetchGeminiKey() {
  try {
    const res = await fetch(DRIVE_RAW_URL);
    const txt = await res.text();
    const match = txt.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
    if (match) {
      GEMINI_API_KEY = match[1].trim();
      console.log("🔐 Gemini API Key Loaded.");
    } else {
      console.warn("❌ Key not found in file. Using fallback.");
      GEMINI_API_KEY = FALLBACK_API_KEY;
    }
  } catch (err) {
    console.error("❌ Error fetching Gemini API Key:", err);
    GEMINI_API_KEY = FALLBACK_API_KEY;
  }
}

// Generate Gemini Reply
async function generateReply(message, mode = "text") {
  if (!GEMINI_API_KEY) await fetchGeminiKey();
  if (!GEMINI_API_KEY) return displayMessage("❌ Gemini API Key မရှိသေးပါ။", "bot");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: message }] }]
  };

  displayMessage(message, "user");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ ဖြေချက်မရရှိပါ။";
    displayMessage(reply, "bot");
  } catch (err) {
    console.error("API Error:", err);
    displayMessage("❌ Gemini API ခေါ်ရာတွင် ပြဿနာရှိသည်။", "bot");
  }
}

// Show message
function displayMessage(text, sender = "bot") {
  const chatContainer = document.getElementById("chatContainer");
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.generateReply = generateReply;
