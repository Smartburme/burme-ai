// Send user message and get Gemini reply (text mode)
async function sendMessage() {
  const inputField = document.getElementById('userInput');
  const userText = inputField.value.trim();
  if (!userText) return;

  // Show user message
  addMessage(userText, 'user');
  inputField.value = '';
  inputField.disabled = true;

  try {
    // Gemini API call (text mode)
    const reply = await generateGeminiReply(userText, 'text');
    addMessage(reply, 'bot');
  } catch (err) {
    addMessage("❌ Gemini API error", 'bot');
  } finally {
    inputField.disabled = false;
  }
}

// Add text message to chat container
function addMessage(text, sender) {
  const container = document.getElementById('chatContainer');
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Handle image file upload event
async function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Example: Use file name as image prompt
  const prompt = `Generate an image based on: ${file.name}`;

  try {
    // Gemini API call for image generation
    const imageUrl = await generateGeminiReply(prompt, 'image');
    addImageMessage(imageUrl);
  } catch (err) {
    addMessage('❌ Image generation error', 'bot');
  }
}

// Add image message to chat container
function addImageMessage(url) {
  if (!url) {
    addMessage('⚠️ No image URL returned', 'bot');
    return;
  }
  const container = document.getElementById('chatContainer');
  const img = document.createElement('img');
  img.src = url;
  img.alt = "Generated Image";
  img.className = 'generated-image chat-message bot';
  container.appendChild(img);
  container.scrollTop = container.scrollHeight;
}

// Export functions globally if needed
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
