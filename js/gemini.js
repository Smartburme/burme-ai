// gemini.js

let GEMINI_API_KEY = '';

// Load Gemini API key from localStorage
function loadGeminiKey() {
  const key = localStorage.getItem('GEMINI_API_KEY');
  if (key && key.trim() !== '') {
    GEMINI_API_KEY = key.trim();
    console.log('✅ Gemini API Key loaded from localStorage');
    return true;
  } else {
    console.warn('⚠️ Gemini API Key not found in localStorage.');
    return false;
  }
}

// Save Gemini API key to localStorage
function saveGeminiKey(key) {
  if (key && key.trim() !== '') {
    localStorage.setItem('GEMINI_API_KEY', key.trim());
    GEMINI_API_KEY = key.trim();
    console.log('✅ Gemini API Key saved to localStorage');
    return true;
  }
  return false;
}

// Main Gemini API call function
async function generateGeminiReply(prompt, mode = 'text') {
  if (!GEMINI_API_KEY) {
    const loaded = loadGeminiKey();
    if (!loaded) {
      return "❌ Gemini API Key missing. Please set it in Settings.";
    }
  }

  let endpoint = '';
  let requestBody = {};

  switch (mode) {
    case 'text':
    case 'code':
    case 'plan':
    case 'project':
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
      requestBody = {
        prompt: {
          text: prompt
        }
      };
      break;

    case 'image':
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/image-generator:generateContent?key=${GEMINI_API_KEY}`;
      requestBody = { prompt: prompt };
      break;

    case 'video':
      return "⚠️ Gemini API does not support video generation currently.";

    default:
      return `❌ Unsupported mode: ${mode}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Gemini API error ${response.status}:`, errorText);
      return `❌ Gemini API error (${response.status}): ${errorText}`;
    }

    const data = await response.json();
    console.log('✅ Gemini API response:', data);

    if (mode === 'image') {
      return data?.candidates?.[0]?.content?.imageUri || "⚠️ No image returned.";
    } else {
      return data?.candidates?.[0]?.content?.text || "⚠️ No text returned.";
    }
  } catch (error) {
    console.error('❌ Gemini API error:', error);
    return "❌ Gemini API error: " + error.message;
  }
}

// Export functions for global usage
window.loadGeminiKey = loadGeminiKey;
window.saveGeminiKey = saveGeminiKey;
window.generateGeminiReply = generateGeminiReply;
