// js/gemini.js

let GEMINI_API_KEY = '';

async function fetchGeminiKey() {
  const keyFileId = '18MX_0qITWC4oj90FkI_9VrrVRLZ7kwEo';
  const url = `https://drive.google.com/uc?export=download&id=${keyFileId}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    GEMINI_API_KEY = text.trim();
  } catch (err) {
    console.error("🔐 Gemini API Key Load Error:", err);
  }
}

async function generateGeminiReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await fetchGeminiKey();

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }]
    })
  });

  const data = await response.json();
  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return result || "⚠ Gemini မှ ဖြေချက် မရရှိပါ။";
}
