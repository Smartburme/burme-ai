// js/ui.js

// Optional UI interaction enhancements

document.addEventListener('DOMContentLoaded', () => { const input = document.getElementById('userInput'); const container = document.getElementById('chatContainer'); const modeSelect = document.getElementById('modeSelect'); const tagBar = document.getElementById('tagBar');

const hints = { text: '💬 Natural questions, instructions, or ideas.', image: '🖼 Describe a visual concept or scene.', coder: '💻 Ask for code snippets or debugging help.', project: '🧠 Describe a full project idea to plan/build.', plan: '🗂 Request a strategy or roadmap.', video: '🎥 Describe a video idea (experimental).' };

modeSelect.addEventListener('change', () => { const hint = hints[modeSelect.value] || ''; const tag = document.createElement('span'); tag.className = 'tag'; tag.innerText = hint; tagBar.innerHTML = ''; tagBar.appendChild(tag); });

input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }); });

