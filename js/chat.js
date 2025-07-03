// chat.js - Improved Version

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

// Message Types
const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  ERROR: 'error',
  LOADING: 'loading'
};

// Message Senders
const SENDERS = {
  USER: 'user',
  BOT: 'bot'
};

// Load environment variables (for Node.js/Webpack)
const GEMINI_API_KEY = typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : window.GEMINI_API_KEY;

// Validate API Key
if (!GEMINI_API_KEY) {
  console.error('❌ Gemini API Key not configured');
  addMessage('Service configuration error. Please try again later.', SENDERS.BOT, MESSAGE_TYPES.ERROR);
}

/**
 * Send message to Gemini API and handle response
 */
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text || !GEMINI_API_KEY) return;

  // Add user message
  addMessage(text, SENDERS.USER);
  userInput.value = '';
  userInput.disabled = true;

  // Show loading indicator
  const loaderId = `loader-${Date.now()}`;
  addMessage('Generating response...', SENDERS.BOT, MESSAGE_TYPES.LOADING, loaderId);

  try {
    // Determine mode based on input
    const mode = detectMessageMode(text);
    const reply = await generateGeminiReply(text, mode);

    // Remove loader and add response
    removeMessage(loaderId);
    
    if (mode === MESSAGE_TYPES.IMAGE || isValidUrl(reply)) {
      addMessage(reply, SENDERS.BOT, MESSAGE_TYPES.IMAGE);
    } else {
      addMessage(reply, SENDERS.BOT);
    }
  } catch (err) {
    removeMessage(loaderId);
    addMessage(`Service unavailable. Please try again later.`, SENDERS.BOT, MESSAGE_TYPES.ERROR);
    console.error('API Error:', err);
  } finally {
    userInput.disabled = false;
    userInput.focus();
  }
}

/**
 * Detect message type based on content
 */
function detectMessageMode(text) {
  if (text.startsWith('/image')) return MESSAGE_TYPES.IMAGE;
  if (text.startsWith('/code')) return 'code';
  return MESSAGE_TYPES.TEXT;
}

/**
 * Add message to chat
 */
function addMessage(content, sender = SENDERS.BOT, type = MESSAGE_TYPES.TEXT, id = '') {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${sender} ${type}`;
  
  if (type === MESSAGE_TYPES.IMAGE && isValidUrl(content)) {
    const img = document.createElement('img');
    img.src = content;
    img.alt = 'Generated content';
    img.loading = 'lazy';
    messageElement.appendChild(img);
  } else if (type === MESSAGE_TYPES.LOADING) {
    messageElement.id = id;
    messageElement.innerHTML = `
      <div class="loader"></div>
      <span>Generating response...</span>
    `;
  } else {
    messageElement.textContent = content;
  }

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Remove message by ID
 */
function removeMessage(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

/**
 * Handle image upload
 */
async function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    addMessage('Please upload a valid image (JPEG, PNG, WEBP)', SENDERS.BOT, MESSAGE_TYPES.ERROR);
    return;
  }

  addMessage(`Uploading: ${file.name}`, SENDERS.USER);
  const loaderId = `loader-${Date.now()}`;
  addMessage('Generating image...', SENDERS.BOT, MESSAGE_TYPES.LOADING, loaderId);

  try {
    // In a real implementation, you would upload to your server first
    const prompt = `Generate an enhanced version of: ${file.name}`;
    const imageUrl = await generateGeminiReply(prompt, MESSAGE_TYPES.IMAGE);
    
    removeMessage(loaderId);
    if (isValidUrl(imageUrl)) {
      addMessage(imageUrl, SENDERS.BOT, MESSAGE_TYPES.IMAGE);
    } else {
      addMessage('Failed to generate image', SENDERS.BOT, MESSAGE_TYPES.ERROR);
    }
  } catch (err) {
    removeMessage(loaderId);
    addMessage('Image generation failed', SENDERS.BOT, MESSAGE_TYPES.ERROR);
    console.error('Image Error:', err);
  }
}

/**
 * Validate URL
 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Export for HTML handlers
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
window.uploadFolder = () => addMessage('Folder upload not available yet', SENDERS.BOT);
window.uploadLink = () => {
  const link = prompt("Enter URL to analyze:");
  if (link) {
    addMessage(`Analyzing: ${link}`, SENDERS.USER);
    // Add analysis logic here
  }
};
