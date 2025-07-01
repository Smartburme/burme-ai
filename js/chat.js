// Gemini API call function
async function generateGeminiReply(message, mode) {
  try {
    const response = await fetch('http://localhost:3000/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode })
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "⚠ Gemini returned no reply.";
  } catch (error) {
    console.error('Fetch Gemini API error:', error);
    throw error;
  }
}
