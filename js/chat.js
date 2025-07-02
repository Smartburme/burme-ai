// Add message to chat container
function addMessage(text, sender, loading = false) {
  const container = document.getElementById("chatContainer");
  const div = document.createElement("div");
  div.className = "chat-message " + sender;
  div.textContent = text;
  if (loading) div.dataset.loading = "true";
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Remove temporary loading message
function removeLastBotLoading() {
  const container = document.getElementById("chatContainer");
  const messages = container.querySelectorAll(".chat-message.bot");
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].dataset.loading === "true") {
      container.removeChild(messages[i]);
      break;
    }
  }
}

// Send message and get Gemini response
async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const message = inputField.value.trim();
  if (!message) return;

  addMessage(message, "user");
  inputField.value = "";
  inputField.disabled = true;

  addMessage("⏳ Generating response...", "bot", "loading");

  try {
    const reply = await generateGeminiReply(message, "text");
    console.log("Gemini reply:", reply);
    removeLastBotLoading();
    addMessage(reply, "bot");
  } catch (err) {
    removeLastBotLoading();
    addMessage("❌ Gemini API error", "bot");
    console.error(err);
  } finally {
    inputField.disabled = false;
  }
}

// Upload image file and generate from filename
async function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const prompt = `Generate an image based on: ${file.name}`;
  addMessage("🖼️ " + prompt, "user");

  addMessage("⏳ Generating image...", "bot", "loading");

  try {
    const imageUrl = await generateGeminiReply(prompt, "image");
    console.log("Generated image URL:", imageUrl);
    removeLastBotLoading();
    addImageMessage(imageUrl);
  } catch (err) {
    removeLastBotLoading();
    addMessage("❌ Image generation failed", "bot");
    console.error(err);
  }
}

// Add image to chat container
function addImageMessage(url) {
  const container = document.getElementById("chatContainer");
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Generated Image";
  img.className = "chat-message bot";
  container.appendChild(img);
  container.scrollTop = container.scrollHeight;
}

// Upload folder (Stub logic)
function uploadFolder(event) {
  const files = event.target.files;
  if (files.length > 0) {
    addMessage(`📁 Folder with ${files.length} files uploaded`, "user");
    // You can enhance this logic to process each file if needed
  }
}

// Upload link (Stub logic)
function uploadLink() {
  const link = prompt("Enter a link to upload or analyze:");
  if (link) {
    addMessage(`🔗 Link provided: ${link}`, "user");
    // Add API logic here if needed
  }
}

// Export to window
window.sendMessage = sendMessage;
window.uploadImage = uploadImage;
window.uploadFolder = uploadFolder;
window.uploadLink = uploadLink;
