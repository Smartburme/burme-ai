let GEMINI_API_KEY = '';

async function loadGeminiKeyFromFile() {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      startIn: 'documents',
      types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      multiple: false
    });
    const file = await fileHandle.getFile();
    const text = await file.text();
    GEMINI_API_KEY = text.trim();
    console.log("✅ Gemini API Key loaded from file");
  } catch (e) {
    console.warn("⚠️ Failed to load Gemini API key:", e);
  }
}

async function generateGeminiReply(message, mode = 'text') {
  if (!GEMINI_API_KEY) await loadGeminiKeyFromFile();
  if (!GEMINI_API_KEY) return "❌ Gemini API key မရှိပါ။";

  const model = (mode === 'image' || mode === 'video') ? mode : 'gemini-pro';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    contents: [{ parts: [{ text: message }] }]
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();

    if (mode === 'image') {
      return data?.candidates?.[0]?.content?.imageUri || "⚠ Image not returned.";
    } else if (mode === 'video') {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ Video info missing.";
    } else {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ No text response.";
    }
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return "❌ Gemini API error.";
  }
}

window.generateGeminiReply = generateGeminiReply;
