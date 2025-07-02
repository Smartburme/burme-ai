let GEMINI_API_KEY = 'AIzaSyC-rFRcdLE5-gd4gm5zM25lahfFMflx3Vc'; // ✅ သင့် Key

// Main Gemini Reply Generator
async function generateGeminiReply(prompt, mode = 'text') {
  // API Endpoint သတ်မှတ်
  let endpoint = '';
  let body = {};

  switch (mode) {
    case 'text':
    case 'code':
    case 'plan':
    case 'project':
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
      body = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      break;

    case 'image':
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/image-generator:generateContent?key=${GEMINI_API_KEY}`;
      body = { prompt: prompt };
      break;

    case 'video':
      return "⚠️ Gemini မသုံးနိုင်သေးတဲ့ Video mode ဖြစ်ပါတယ်။";
    
    default:
      return `❌ မသိတဲ့ mode: "${mode}"`;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Gemini Error', res.status, errorText);
      return `❌ Gemini API Error (${res.status}): ${errorText}`;
    }

    const data = await res.json();
    console.log('✅ Gemini Response:', data);

    // Response ဖော်ပြ
    if (mode === 'image') {
      return data?.candidates?.[0]?.content?.imageUri || "⚠️ Image URL မရရှိပါ";
    } else {
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Response မရရှိပါ";
    }

  } catch (err) {
    console.error('❌ Gemini Network Error:', err);
    return '❌ Gemini Network Error: ' + err.message;
  }
}

// Global Export
window.generateGeminiReply = generateGeminiReply;
