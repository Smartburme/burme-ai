// js/chat.js

// Send user message and get Gemini reply async function sendMessage() { const input = document.getElementById('userInput'); const text = input.value.trim(); if (!text) return;

addMessage(text, 'user'); input.value = ''; input.disabled = true; addMessage('⏳...', 'bot');

try { const reply = await generateGeminiReply(text, 'text'); removeLoading(); addMessage(reply, 'bot'); } catch (e) { removeLoading(); addMessage('❌ Gemini API error', 'bot'); } finally { input.disabled = false; } }

function addMessage(text, sender) { const container = document.getElementById('chatContainer'); const div = document.createElement('div'); div.className = 'chat-message ' + sender; div.innerText = text; container.appendChild(div); container.scrollTop = container.scrollHeight; }

function removeLoading() { const container = document.getElementById('chatContainer'); const last = container.lastChild; if (last && last.innerText === '⏳...') { container.removeChild(last); } }

function triggerUpload() { document.getElementById('imageUpload').click(); }

function uploadImage(event) { const file = event.target.files[0]; if (!file) return; const prompt = Generate an image based on: ${file.name}; generateGeminiReply(prompt, 'image').then(url => addImageMessage(url)); }

function uploadFolder(event) { const files = event.target.files; if (!files.length) return; addMessage(📁 Uploaded folder with ${files.length} file(s)., 'user'); }

function uploadLink() { const url = prompt('Paste a link:'); if (url) { addMessage(🔗 Link provided: ${url}, 'user'); } }

function addImageMessage(url) { if (!url) return addMessage('⚠️ No image returned', 'bot'); const container = document.getElementById('chatContainer'); const img = document.createElement('img'); img.src = url; img.className = 'chat-message bot'; container.appendChild(img); container.scrollTop = container.scrollHeight; }

function runSearch() { const query = document.getElementById('searchInput').value.trim(); if (!query) return; const choice = prompt("Search on: 1=Google, 2=YouTube, 3=Pinterest, 4=HTML site"); let url = ''; switch (choice) { case '1': url = https://www.google.com/search?q=${encodeURIComponent(query)}; break; case '2': url = https://www.youtube.com/results?search_query=${encodeURIComponent(query)}; break; case '3': url = https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}; break; case '4': url = ${query.startsWith('http') ? query : 'https://' + query}; break; default: alert("Invalid"); return; } window.open(url, '_blank'); }

window.sendMessage = sendMessage; window.uploadImage = uploadImage; window.uploadFolder = uploadFolder; window.uploadLink = uploadLink; window.runSearch = runSearch;

    
