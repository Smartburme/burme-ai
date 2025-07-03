// chat.js - Gemini API chat logic

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  // ✅ Admin shortcut
  if (message.toLowerCase() === "admin-0000") {
    window.location.href = "usercontrol.html";
    return;
  }

  const reply = await generateGeminiReply(message, "text");
  addMessage(reply, "bot");
}

// Render message in chat UI
function addMessage(text, sender) {
  const container = document.getElementById("chatContainer");
  const div = document.createElement("div");
  div.className = "chat-message " + sender;
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Optional: Trigger by Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
