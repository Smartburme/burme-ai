<script src="js/gemini.js"></script>
<script>
  const chatContainer = document.getElementById('chatContainer');
  const inputField = document.getElementById('userInput');
  const modeSelect = document.getElementById('modeSelect');
  const hintGroup = document.getElementById('hintGroup');

  inputField.addEventListener('input', () => {
    hintGroup.style.display = inputField.value.trim() ? 'none' : 'flex';
  });

  function triggerUpload() {
    document.getElementById('imageUpload').click();
  }

  async function sendMessage() {
    const text = inputField.value.trim();
    const mode = modeSelect.value;
    if (!text) return;

    addMessage(text, 'user');
    inputField.value = '';
    inputField.disabled = true;

    const loadingId = addLoadingMessage('bot');

    try {
      const result = await generateGeminiReply(text, mode);

      if (mode === 'image' && result.startsWith('http')) {
        updateMessageImageById(loadingId, result);
      } else {
        updateMessageById(loadingId, result);
      }
    } catch (err) {
      updateMessageById(loadingId, '❌ Error: ' + err.message);
    } finally {
      inputField.disabled = false;
    }
  }

  function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      addImageMessage(e.target.result, 'user');
    };
    reader.readAsDataURL(file);

    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const prompt = `Generate an image based on: ${fileName}`;
    inputField.value = prompt;
    modeSelect.value = 'image';
    sendMessage();
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'chat-message ' + sender;
    div.innerText = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return div;
  }

  function addImageMessage(url, sender = 'bot') {
    const img = document.createElement('img');
    img.src = url;
    img.alt = "Generated Image";
    img.className = 'generated-image chat-message ' + sender;
    chatContainer.appendChild(img);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return img;
  }

  function addLoadingMessage(sender = 'bot') {
    const div = document.createElement('div');
    div.className = 'chat-message ' + sender;
    div.innerText = "⏳ Generating...";
    const id = 'msg-' + Date.now();
    div.dataset.id = id;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return id;
  }

  function updateMessageById(id, newText) {
    const msg = [...chatContainer.children].find(el => el.dataset?.id === id);
    if (msg) msg.innerText = newText;
  }

  function updateMessageImageById(id, url) {
    const msg = [...chatContainer.children].find(el => el.dataset?.id === id);
    if (msg) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = "Generated Image";
      img.className = 'generated-image chat-message bot';
      msg.replaceWith(img);
    }
  }

  window.sendMessage = sendMessage;
  window.uploadImage = uploadImage;
  window.triggerUpload = triggerUpload;
</script>
