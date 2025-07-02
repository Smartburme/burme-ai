// Chat container reference
const chatContainer = document.getElementById('chatContainer');
const inputField = document.getElementById('userInput');

// ✅ Send user message and get Gemini reply (text mode)
async function sendMessage() {
  const userText = inputField.value.trim();
  if (!userText) return;

  // Show user message in chat
  addMessage(userText, 'user');
  inputField.value = '';
  inputField.disabled = true;

  // Add loading message
  const loadingId = addLoadingMessage('bot');

  try {
    // Call Gemini API for text generation
    const reply = await generateGeminiReply(userText, 'text');
    updateMessageById(loadingId, reply);
  } catch (err) {
    updateMessageById(loadingId, "❌ Gemini API error: " + err.message);
  } finally {
    inputField.disabled = false;
  }
}

// ✅ Upload and generate image from file
async function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = file.name.replace(/\.[^/.]+$/, ""); // remove extension
  const prompt = `Generate an image based on: ${fileName}`;

  // Add image upload preview as user message
  const reader = new FileReader();
  reader.onload = function (e) {
    addImageMessage(e.target.result, 'user');
  };
  reader.readAsDataURL(file);

  // Add loading message
  const loadingId = addLoadingMessage('bot');

  try {
    const imageUrl = await generateGeminiReply(prompt, 'image');
    if (imageUrl.startsWith('http')) {
      updateMessageImageById(loadingId, imageUrl);
    } else {
      updateMessageById(loadingId, "⚠️ Image not generated.");
    }
  } catch (err) {
    updateMessageById(loadingId, '❌ Image generation error: ' + err.message);
  }
}

// ✅ Add a text message to chat
function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;
  div.innerText = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return div; // return element if needed
}

// ✅ Add image message to chat
function addImageMessage(url, sender = 'bot') {
  const img = document.createElement('img');
  img.src = url;
  img.alt = "Generated Image";
  img.className = 'generated-image chat-message ' + sender;
  chatContainer.appendChild(img);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return img;
}

// ✅ Add temporary loading message (spinner style)
function addLoadingMessage(sender = 'bot') {
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;
  div.innerText = "⏳ Thinking...";
  const id = 'msg-' + Date.now();
  div.dataset.id = id;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return id;
}

// ✅ Update loading message to final text
function updateMessageById(id, newText) {
  const target = [...chatContainer.children].find(el => el.dataset?.id === id);
  if (target) target.innerText = newText;
}

// ✅ Replace loading with image
function updateMessageImageById(id, imageUrl) {
  const old = [...chatContainer.children].find(el => el.dataset?.id === id);
  if (old) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Generated Image";
    img.className = 'generated-image chat-message bot';
    old.replaceWith(img);
  }
}

// ✅ Expose to window for HTML inline calls
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
