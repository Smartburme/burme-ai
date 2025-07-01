// js/chat.js

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  let currentTab = 'text'; // default tab

  // Tab switch handler
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      chatWindow.innerHTML = ''; // Clear chat on tab switch (optional)
    });
  });

  // Append message to chat window
  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto scroll
  }

  // Form submit handler
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    chatInput.value = '';

    appendMessage('bot', 'Processing...');

    // TODO: Call Gemini API based on currentTab (text/image/code)
    // For demo, just echo message after 1 second
    setTimeout(() => {
      chatWindow.lastChild.textContent = `Response for [${currentTab}]: ${message}`;
    }, 1000);
  });
});
