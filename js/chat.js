// chat.js

// Chat container element
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

// Send user message to Gemini API and show response
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';
  userInput.disabled = true;

  // Show loader
  const loader = showLoader(chatContainer);

  try {
    // Detect mode based on simple heuristics (could improve)
    // Here just assume text mode for simplicity
    const mode = 'text';

    const reply = await generateGeminiReply(text, mode);
    removeLoader(loader);

    if (isValidUrl(reply)) {
      addImageMessage(reply); // If reply is a URL (image)
    } else {
      addMessage(reply, 'bot');
    }

  } catch (err) {
    removeLoader(loader);
    addMessage("❌ Gemini API error: " + err.message, 'bot');
  } finally {
    userInput.disabled = false;
    userInput.focus();
  }
}

// Add text message to chat container
function addMessage(text, sender = 'bot') {
  const div = document.createElement('div');
  div.className = `chat-message ${sender}`;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Add image message to chat container
function addImageMessage(url) {
  if (!url) {
    addMessage('⚠️ No image URL.', 'bot');
    return;
  }
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Generated Image';
  img.className = 'chat-message bot generated-image';
  chatContainer.appendChild(img);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show loader text during API call
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

// Remove loader element
function removeLoader(loader) {
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}

// Upload image file handler
function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  addMessage(`Uploading image: ${file.name}`, 'user');

  // You can implement your upload logic here or generate prompt
  // For demo, generate prompt from file name
  const prompt = `Generate an image based on: ${file.name}`;

  // Show loader
  const loader = showLoader(chatContainer);

  generateGeminiReply(prompt, 'image')
    .then((imageUrl) => {
      removeLoader(loader);
      if (imageUrl && isValidUrl(imageUrl)) {
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

// Upload folder handler (just show alert for demo)
function uploadFolder(event) {
  alert("Folder upload is not implemented yet.");
  // You can extend this function to handle folder contents if needed
}

// Upload link handler (prompt user for link and process)
function uploadLink() {
  const link = prompt("Enter link to upload or analyze:");
  if (link) {
    addMessage(`Analyzing link: ${link}`, 'user');
    // Implement your link handling logic here, for example:
    // generateGeminiReply(`Analyze this link: ${link}`, 'text').then(...)
  }
}

// Utility to validate URLs (basic check)
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Export functions globally for inline HTML use
window.sendMessage = sendMessage;
window.addMessage = addMessage;
window.addImageMessage = addImageMessage;
window.uploadImage = uploadImage;
window.uploadFolder = uploadFolder;
window.uploadLink = uploadLink;
