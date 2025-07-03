// js/gemini.js

async function generateGeminiReply(promptText, mode = 'text') {
  try {
    const response = await fetch('/functions/gemini.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText })
    });

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No reply from Gemini.";
    return content;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "⚠️ Error fetching Gemini reply.";
  }
}
