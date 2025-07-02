// js/gemini.js

let GEMINI_API_KEY = '';

// Load Gemini API Key from local Documents directory (e.g. /storage/emulated/0/Documents/GEMINI_API_KEY.txt) async function loadGeminiKeyFromFileSystem() { try { const handle = await window.showOpenFilePicker({ types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }] }); const file = await handle[0].getFile(); const text = await file.text(); GEMINI_API_KEY = text.trim(); alert("🔐 Gemini API Key loaded from Documents/GEMINI_API_KEY.txt"); } catch (err) { console.error("Failed to load Gemini key:", err); alert("❌ Gemini API Key မထည့်နိုင်ပါ။"); } }

async function generateGeminiReply(message, mode = 'text') { if (!GEMINI_API_KEY) { await loadGeminiKeyFromFileSystem(); if (!GEMINI_API_KEY) return "❌ Gemini API Key မရှိသေးပါ။"; }

let model = 'gemini-pro'; if (mode === 'image') model = 'image'; if (mode === 'video') model = 'video';

const endpoint = https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY};

const requestBody = { contents: [{ parts: [{ text: message }] }] };

try { const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) });

if (!response.ok) throw new Error("Gemini API Error");
const data = await response.json();

if (mode === 'image') {
  return data?.candidates?.[0]?.content?.imageUri || "⚠ Image not generated.";
} else {
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ Gemini မှ ဖြေချက် မရရှိပါ။";
}

} catch (error) { console.error("Gemini API Error:", error); return "❌ Gemini API Error"; } }

window.generateGeminiReply = generateGeminiReply; window.loadGeminiKeyFromFileSystem = loadGeminiKeyFromFileSystem;

