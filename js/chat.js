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
      chatWindow.innerHTML = '';
    });
  });

  // Append message to chat window
  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Form submit handler
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    chatInput.value = '';
    appendMessage('bot', '🤖 Thinking...');

    let response = '';

    try {
      if (currentTab === 'text') {
        response = await generateText(message);
      } else if (currentTab === 'image') {
        response = await generateImage(message);
      } else if (currentTab === 'code') {
        response = await generateCode(message);
      }
    } catch (err) {
      response = '❌ Error: ' + err.message;
    }

    // Replace last bot message (Thinking...) with real response
    const botMessages = chatWindow.querySelectorAll('.message.bot');
    if (botMessages.length > 0) {
      botMessages[botMessages.length - 1].textContent = response;
    }
  });
});
