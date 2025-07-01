// js/chat.js

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const tagBar = document.getElementById('tagBar');
const modeSelect = document.getElementById('modeSelect');

// Message display handler
function appendMessage(text, sender = 'bot', isImage = false) {
  const messageElem = document.createElement('div');
  messageElem.classList.add('chat-message', sender);

  if (isImage) {
    const img = document.createElement('img');
    img.src = text;
    img.classList.add('generated-image');
    messageElem.appendChild(img);
  } else {
    messageElem.textContent = text;
  }

  chatContainer.appendChild(messageElem);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send message logic
async function sendMessage() {
  const message = userInput.value.trim();
  const mode = modeSelect.value;

  if (!message) return;

  appendMessage(message, 'user');
  userInput.value = '';
  appendMessage("⏳ AI is thinking...", 'bot');

  try {
    const reply = await generateGeminiReply(message, mode);

    // Remove thinking message
    const lastBotMsg = chatContainer.querySelector('.chat-message.bot:last-child');
    if (lastBotMsg && lastBotMsg.textContent.includes("thinking")) lastBotMsg.remove();

    appendMessage(reply, 'bot');
    addTag(`#${mode}`);
  } catch (err) {
    appendMessage("❌ Gemini API error: " + err.message, 'bot');
  }
}

// Image upload logic
function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;
    appendMessage(imageData, 'user', true);
    appendMessage("⏳ Image received. Processing...", 'bot');

    // Placeholder image reply
    setTimeout(() => {
      appendMessage("📷 AI: ဓာတ်ပုံအား လက်ခံပြီး ဖြစ်ပါသည်။", 'bot');
    }, 1000);
  };
  reader.readAsDataURL(file);
}

// Add tag
function addTag(text) {
  const tag = document.createElement('div');
  tag.classList.add('tag');
  tag.textContent = text;
  tagBar.appendChild(tag);
}

// Expose functions
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
window.appendMessage = appendMessage;
window.addTag = addTag;
