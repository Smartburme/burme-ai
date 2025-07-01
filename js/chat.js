async function sendMessage() {
  const inputField = document.getElementById('userInput');
  const userText = inputField.value.trim();
  if (!userText) return;

  // UI - user message
  addMessage(userText, 'user');
  inputField.value = '';
  inputField.disabled = true;

  try {
    const reply = await generateGeminiReply(userText, 'text'); // default mode = 'text'
    addMessage(reply, 'bot');
  } catch (err) {
    addMessage("❌ Gemini API error", 'bot');
  } finally {
    inputField.disabled = false;
  }
}

// Add message to chat container
function addMessage(text, sender) {
  const container = document.getElementById('chatContainer');
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
