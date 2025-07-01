// js/gemini.js

let GEMINI_API_KEY = '';

// Google Drive JSON raw key fetch
async function loadAPIKeyFromDrive() {
  const fileId = '18MX_0qITWC4oj90FkI_9VrrVRLZ7kwEo';
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyXXXXX-YOUR-GOOGLE-DRIVE-API-KEY`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    GEMINI_API_KEY = text.trim();
    console.log('[Gemini] API Key Loaded');
  } catch (err) {
    console.error('Failed to load Gemini API Key:', err);
  }
}

// Call Gemini Pro Text Model
async function generateText(prompt) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No response from Gemini.";
}

// Call Gemini Pro Vision (for Image prompt)
async function generateImage(prompt) {
  // Placeholder only – real image generation requires Gemini Vision or another model
  return `🖼️ [Generated Image URL or base64 for prompt: ${prompt}]`;
}

// Call Code Model (text-style for now)
async function generateCode(prompt) {
  return await generateText("Write code for: " + prompt);
}

// Auto-load API key on script load
loadAPIKeyFromDrive();
