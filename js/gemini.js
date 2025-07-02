let GEMINI_API_KEY = '';

// Load Gemini API Key from localStorage only
function loadGeminiKey() {
  const savedKey = localStorage.getItem('GEMINI_API_KEY');
  if (savedKey && savedKey.trim() !== '') {
    GEMINI_API_KEY = savedKey.trim();
    console.log("✅ GEMINI API Key loaded from localStorage");
    return true;
  } else {
    console.warn("⚠️ GEMINI_API_KEY not found in localStorage.");
    return false;
  }
}

// Core Generate Function
async function generateGeminiReply(prompt, mode = 'text') {
  if (!GEMINI_API_KEY) {
    const loaded = loadGeminiKey();
    if (!loaded) {
      return "❌ Gemini API Key is missing. Please set it in Settings.";
    }
  }

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
