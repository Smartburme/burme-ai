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
  // Ensure API key is loaded
  if (!GEMINI_API_KEY) {
    const loaded = loadGeminiKey();
    if (!loaded) {
      return "❌ Gemini API Key is missing. Please upload it in settings.";
    }
  }

  // Determine API endpoint and request body
  let endpoint = "";
  let requestBody = {};

  switch (mode) {
    case 'text':
    case 'code':
    case 'plan':
    case 'project':
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
      requestBody = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      break;

    case 'image':
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/image-generator:generateContent?key=${GEMINI_API_KEY}`;
      requestBody = { prompt: prompt };
      break;

    case 'video':
      return "⚠️ Gemini does not support video generation. Please use a third-party API.";

    default:
      return `❌ Unsupported mode: "${mode}"`;
  }

  // Fetch from Gemini API
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Gemini API HTTP ${response.status}:`, errorText);
      return `❌ API error (${response.status}): ${errorText}`;
    }

    const data = await response.json();
    console.log("✅ Gemini API Response:", data);

    // Extract result
    if (mode === 'image') {
      return data?.candidates?.[0]?.content?.imageUri || "⚠️ No image returned.";
    } else {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No text returned.";
    }
  } catch (err) {
    console.error("❌ Gemini API error occurred:", err);
    return "❌ Gemini API error: " + err.message;
  }
}

// Expose to global
window.generateGeminiReply = generateGeminiReply;
