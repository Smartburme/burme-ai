// ui.js

// Show loader animation during API call
function showLoader(container) {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerText = '⏳ Thinking...';
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

// Remove loader
function removeLoader(loader) {
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}

// Add chat message (text)
function addMessage(text, sender = 'bot') {
  const container = document.getElementById('chatContainer');
  const message = document.createElement('div');
  message.className = 'chat-message ' + sender;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

// Add chat message (image)
function addImageMessage(url) {
  if (!url) {
    addMessage('⚠️ No image URL provided.', 'bot');
    return;
  }
  const container = document.getElementById('chatContainer');
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Generated Image';
  img.className = 'chat-message bot generated-image';
  img.style.borderRadius = '8px';
  img.style.margin = '10px 5px';
  container.appendChild(img);
  container.scrollTop = container.scrollHeight;
}

// Clear chat history
function clearChat() {
  const container = document.getElementById('chatContainer');
  container.innerHTML = '';
}

// For setting.html: Show/hide API key input & save button status
function updateApiKeyUI() {
  const keyInput = document.getElementById('apiKeyInput');
  const saveBtn = document.getElementById('saveApiKeyBtn');
  if (!keyInput || !saveBtn) return;

  if (keyInput.value.trim() === '') {
    saveBtn.disabled = true;
    saveBtn.style.opacity = '0.5';
  } else {
    saveBtn.disabled = false;
    saveBtn.style.opacity = '1';
  }
}

// Attach input event to API key input field
function setupApiKeyInput() {
  const keyInput = document.getElementById('apiKeyInput');
  if (!keyInput) return;
  keyInput.addEventListener('input', updateApiKeyUI);
  updateApiKeyUI();
}

// Initialize UI
function initUI() {
  setupApiKeyInput();
}

// Export functions globally if needed
window.showLoader = showLoader;
window.removeLoader = removeLoader;
window.addMessage = addMessage;
window.addImageMessage = addImageMessage;
window.clearChat = clearChat;
window.updateApiKeyUI = updateApiKeyUI;
window.setupApiKeyInput = setupApiKeyInput;
window.initUI = initUI;
