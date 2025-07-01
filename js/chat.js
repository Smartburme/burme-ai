// js/chat.js

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const tagBar = document.getElementById('tagBar');

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

// User send message
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  userInput.value = '';

  // TODO: Call AI API here depending on mode selected

  // Simulate bot reply for demo
  setTimeout(() => {
    appendMessage("AI: မင်္ဂလာပါ၊ သင်၏မေးခွန်းကို လက်ခံရရှိပါသည်။");
  }, 1000);
}

// Image upload handler
function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    appendMessage(e.target.result, 'user', true);

    // TODO: Send image to AI API for processing if needed
    setTimeout(() => {
      appendMessage("AI: ဓာတ်ပုံအား လက်ခံပြီး ဖြစ်ပါသည်။");
    }, 1000);
  };
  reader.readAsDataURL(file);
}

// Optional: Add tags to tagBar (example usage)
function addTag(text) {
  const tag = document.createElement('div');
  tag.classList.add('tag');
  tag.textContent = text;
  tagBar.appendChild(tag);
}

window.sendMessage = sendMessage;     // expose to HTML onclick
window.uploadImage = uploadImage;
window.appendMessage = appendMessage;
window.addTag = addTag;
