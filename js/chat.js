// chat.js - Chat logic for Burme Ai
// Requires: gemini.js, ui.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  // Admin shortcut
  if (message.toLowerCase() === "admin-0000") {
    window.location.href = "usercontrol.html";
    return;
  }

  const mode = getSelectedMode(); // text / image / code / video
  const reply = await generateGeminiReply(message, mode);

  if (mode === "image" || mode === "video") {
    addMedia(reply, mode);
  } else {
    addMessage(reply, "bot");
  }
}

function addMessage(text, sender = "bot") {
  const container = document.getElementById("chatContainer");
  const div = document.createElement("div");
  div.className = `chat-message ${sender}`;
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function addMedia(url, type = "image") {
  const container = document.getElementById("chatContainer");
  const div = document.createElement("div");
  div.className = "chat-message bot";

  if (type === "image") {
    div.innerHTML = `<img src="${url}" alt="Generated Image" style="max-width:100%; border-radius:10px;">`;
  } else if (type === "video") {
    div.innerHTML = `<video controls style="max-width:100%; border-radius:10px;"><source src="${url}" type="video/mp4">Your browser does not support video.</video>`;
  } else {
    div.innerText = url;
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
