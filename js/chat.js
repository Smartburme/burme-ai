// chat.js

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

// User စာပို့ရင် API ကိုခေါ်ပြီး reply ပြန်လည်ပြ
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';
  userInput.disabled = true;

  const loader = showLoader(chatContainer);

  try {
    // mode ကို prompt အရ ယူချင်လို့ ပြင်နိုင်တယ်၊ ယခု text mode ထားထား
    const reply = await generateGeminiReply(text, 'text');
    removeLoader(loader);

    if (isValidUrl(reply)) {
      addImageMessage(reply);
    } else {
      addMessage(reply, 'bot');
    }
  } catch (err) {
    removeLoader(loader);
    addMessage(`❌ Gemini API error: ${err.message}`, 'bot');
  } finally {
    userInput.disabled = false;
    userInput.focus();
  }
}

// chat message add လုပ်ရန်
function addMessage(text, sender = 'bot') {
  const div = document.createElement('div');
  div.className = `chat-message ${sender}`;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// image message add လုပ်ရန်
function addImageMessage(url) {
  if (!url) {
    addMessage('⚠️ No image URL returned.', 'bot');
    return;
  }
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Generated Image';
  img.className = 'chat-message bot generated-image';
  chatContainer.appendChild(img);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// loader ပြရန်
function showLoader(container) {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.textContent = '⏳ Thinking...';
  loader.style.cssText = `
    color: #00ffff;
    font-style: italic;
    margin: 10px;
    font-size: 14px;
    user-select: none;
  `;
  container.appendChild(loader);
  container.scrollTop = container.scrollHeight;
  return loader;
}

// loader ဖျက်ရန်
function removeLoader(loader) {
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}

// Image file upload handler
function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  addMessage(`Uploading image: ${file.name}`, 'user');

  const prompt = `Generate an image based on: ${file.name}`;
  const loader = showLoader(chatContainer);

  generateGeminiReply(prompt, 'image')
    .then((imageUrl) => {
      removeLoader(loader);
      if (isValidUrl(imageUrl)) {
        addImageMessage(imageUrl);
      } else {
        addMessage('⚠️ Failed to generate image.', 'bot');
      }
    })
    .catch((err) => {
      removeLoader(loader);
      addMessage('❌ Image generation error: ' + err.message, 'bot');
    });
}

// Folder upload placeholder handler
function uploadFolder(event) {
  alert("📁 Folder upload not implemented yet.");
  // Folder upload logic ထည့်နိုင်ပါတယ်
}

// Link upload handler (prompt input)
function uploadLink() {
  const link = prompt("Enter link to upload or analyze:");
  if (link) {
    addMessage(`Analyzing link: ${link}`, 'user');
    // Link analysis logic ထည့်ပါ (optional)
  }
}

// URL validity check
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Export globally for HTML inline handlers
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
window.uploadFolder = uploadFolder;
window.uploadLink = uploadLink;
