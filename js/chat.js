// Main chat send logic
async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  addMessage(message, 'user');
  input.value = '';
  input.disabled = true;

  // Detect mode from keyword prefix
  let mode = 'text';
  const lower = message.toLowerCase();
  if (lower.startsWith("image:")) mode = 'image';
  else if (lower.startsWith("code:")) mode = 'code';
  else if (lower.startsWith("plan:")) mode = 'plan';
  else if (lower.startsWith("project:")) mode = 'project';
  else if (lower.startsWith("video:")) mode = 'video';

  try {
    const reply = await generateGeminiReply(message, mode);
    addMessage(reply, 'bot');
  } catch (err) {
    addMessage('❌ Gemini API error', 'bot');
    console.error(err);
  } finally {
    input.disabled = false;
  }
}

// Show message in chat container
function addMessage(text, sender = 'bot') {
  const container = document.getElementById('chatContainer');
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;

  // Check if it's image URL
  if (text.startsWith("http") && text.includes("image")) {
    const img = document.createElement('img');
    img.src = text;
    img.className = 'generated-image';
    img.style.maxWidth = '100%';
    img.style.borderRadius = '10px';
    img.style.marginTop = '10px';
    div.innerText = "🖼 Generated Image:";
    div.appendChild(img);
  } else {
    div.innerText = text;
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Upload single image file
function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const imageData = reader.result;
    addMessage("🖼 Image uploaded. (preview below)", 'user');

    const img = document.createElement('img');
    img.src = imageData;
    img.style.maxWidth = '100%';
    img.style.margin = '10px 0';
    img.style.borderRadius = '10px';

    const container = document.getElementById('chatContainer');
    container.appendChild(img);
    container.scrollTop = container.scrollHeight;
  };
  reader.readAsDataURL(file);
}

// Upload folder logic (example only)
function uploadFolder(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  addMessage(`📁 Folder uploaded with ${files.length} files.`, 'user');
  // You can loop and show each filename if needed
}

// Upload link input
function triggerLinkUpload() {
  const link = prompt("Paste link to analyze or upload:");
  if (link && link.trim()) {
    addMessage(`🔗 Link uploaded: ${link}`, 'user');
    // You can add additional logic to fetch/analyze link content
  }
}

// Export global functions
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
window.uploadFolder = uploadFolder;
window.triggerLinkUpload = triggerLinkUpload;
